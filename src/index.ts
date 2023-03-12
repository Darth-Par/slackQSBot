import axios from 'axios';
import * as core from '@actions/core';
import * as github from '@actions/github';
import { PushEvent } from '@octokit/webhooks-definitions/schema';

type SlackMessageBody = {
  text: string;
};

const slackUrl = core.getInput('slackWebHook');
const inputMessage = core.getInput('message');

const getCommitData = async () => {
  if (github.context.eventName == 'push') {
    const pushPayload = github.context.payload as PushEvent;
    const repositoryName = pushPayload.repository.name;
    const commitId = pushPayload.head_commit?.id;
    const commitUrl = pushPayload.head_commit?.url;

    return {
      name: repositoryName,
      id: commitId,
      url: commitUrl,
    };
  }
  return undefined;
};

const sendToSlack = async (url: string, messageBody: SlackMessageBody) => {
  try {
    const response = await axios.post(url, JSON.stringify(messageBody), {
      headers: { 'Content-Type': 'application/json' },
    });
    core.setOutput('response', JSON.stringify(response.statusText));
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`Payload: ${payload}`);
  } catch (error) {
    const slackError = JSON.stringify(error);
    core.setFailed(slackError);
  }
};

(async () => {
  const commitData = await getCommitData();
  if (commitData) {
    const messageBody = `RepositoryName: ${commitData.name}\nStatus: ${inputMessage}\nCommitId: ${commitData.id}\nCommitUrl: ${commitData.url}`;
    await sendToSlack(slackUrl, { text: messageBody });
  }
  core.setFailed('Unable to get github data');
})();
