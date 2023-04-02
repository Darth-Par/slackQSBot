import * as core from '@actions/core';
import * as github from '@actions/github';
import { PushEvent } from '@octokit/webhooks-definitions/schema';

import { HttpClient } from './httpClient/httpClient';
import { SlackConfig } from './customTypes/customTypes';
import { getCommitData } from './github/commitData';
import { getChannel, getChannels, sendToChannel } from './slack/channels';

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
      baseUrl,
      postMessagePath,
      httpClient,
    );
    console.log('response', JSON.stringify(sendToChannelResponse));
  } else {
    core.setFailed('Unable to get github data');
  }
})();
