import axios from 'axios';
import * as core from '@actions/core';
import * as github from '@actions/github';
import { PushEvent } from '@octokit/webhooks-definitions/schema';

type SlackConfig = {
  headers: {
    'Content-Type': string;
    Authorization: string;
  };
};

type Channel = {
  id: string;
  name: string;
};

type GetChannelsResponse = {
  status: number;
  statusText: string;
  data: {
    ok: boolean;
    channels: Channel[];
  };
};

type CommitData = {
  name: string;
  id: string;
  url: string;
};

const slackToken = core.getInput('slackToken');
const inputMessage = core.getInput('message');
const channelName = core.getInput('channelName');
const baseUrl = core.getInput('baseUrl');
const conversationsListPath = core.getInput('conversationsListPath');
const postMessagePath = core.getInput('postMessagePath');
const slackGeneralConfig: SlackConfig = {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: `Bearer ${slackToken}`,
  },
};
console.log(baseUrl);
const getCommitData = async (): Promise<CommitData | undefined> => {
  if (github.context.eventName == 'push') {
    const pushPayload = github.context.payload as PushEvent;
    const repositoryName = pushPayload.repository.name;
    if (pushPayload.head_commit) {
      return {
        name: repositoryName,
        id: pushPayload.head_commit.id,
        url: pushPayload.head_commit.url,
      };
    }
  }
  return undefined;
};

const getChannels = async (
  url: string,
  config: SlackConfig,
): Promise<GetChannelsResponse> => {
  const response = await axios.get(url, config);
  return {
    status: response.status,
    statusText: response.statusText,
    data: response.data,
  };
};

const getChannel = async (
  slackChannels: Channel[],
  slackChannelName: string,
) => {
  const generalRoom = slackChannels.filter(
    (channel) => channel.name === slackChannelName,
  );
  if (generalRoom.length < 1) {
    throw new Error(`${slackChannelName} not found`);
  }

  if (generalRoom.length > 1) {
    throw new Error(`Oddly there are multiple rooms named ${slackChannelName}`);
  }
  return generalRoom[0];
};

const sendToChannel = async (
  channelId: string,
  message: string,
  config: SlackConfig,
) => {
  const messageBody = {
    channel: channelId,
    text: message,
  };

  const response = await axios.post(
    `${baseUrl}${postMessagePath}`,
    JSON.stringify(messageBody),
    config,
  );

  return {
    status: response.status,
    statusText: response.statusText,
  };
};

(async () => {
  const commitData = await getCommitData();
  if (commitData) {
    const messageBody = `RepositoryName: ${commitData.name}\nStatus: ${inputMessage}\nCommitId: ${commitData.id}\nCommitUrl: ${commitData.url}`;
    const getChannelsResponse = await getChannels(
      `${baseUrl}${conversationsListPath}`,
      slackGeneralConfig,
    );
    const generalRoom = await getChannel(
      getChannelsResponse.data.channels,
      channelName,
    );
    const sendToChannelResponse = await sendToChannel(
      generalRoom.id,
      messageBody,
      slackGeneralConfig,
    );
    console.log('response', JSON.stringify(sendToChannelResponse));
  } else {
    core.setFailed('Unable to get github data');
  }
})();
