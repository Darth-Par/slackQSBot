import axios from 'axios';
import * as core from '@actions/core';
import * as github from '@actions/github';

type SlackMessageBody = {
  text: string;
};

const slackUrl = core.getInput('slackWebHook');
const inputMessage = core.getInput('message');
const data: SlackMessageBody = { text: inputMessage };

const sendToSlack = async (url: string, messageBody: SlackMessageBody) => {
  try {
    const response = await axios.post(url, JSON.stringify(messageBody), {
      headers: { 'Content-Type': 'application/json' },
    });
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
    core.setOutput('response', JSON.stringify(response.statusText));
  } catch (error) {
    const slackError = JSON.stringify(error);
    core.setFailed(slackError);
  }
};

(async () => {
  await sendToSlack(slackUrl, data);
})();
