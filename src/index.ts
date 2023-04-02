import axios from 'axios';
import * as core from '@actions/core';
import * as github from '@actions/github';
import { PushEvent } from '@octokit/webhooks-definitions/schema';

import { HttpClient } from './httpClient/httpClient';
import { Channel, SlackConfig } from './customTypes/customTypes';
import { getCommitData } from './github/commitData';
import { getChannels } from './slack/channels';

const ghEventName = github.context.eventName;
const ghPayload = github.context.payload as PushEvent;
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

const getChannel = async (
  slackChannels: Channel[],
  slackChannelName: string,
): Promise<Channel> => {
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
  const commitData = await getCommitData(ghEventName, ghPayload);
  if (commitData) {
    const messageBody = `RepositoryName: ${commitData.name}\nStatus: ${inputMessage}\nCommitId: ${commitData.id}\nCommitUrl: ${commitData.url}`;
    const httpClient = new HttpClient();
    const getChannelsResponse = await getChannels(
      `${baseUrl}${conversationsListPath}`,
      slackGeneralConfig,
      httpClient,
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

export { getChannels, getCommitData };
