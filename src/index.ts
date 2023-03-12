import axios from 'axios';
import * as actionsCore from '@actions/core';

type SlackMessageBody = {
  text: string;
};

const slackUrl = actionsCore.getInput('slackWebHook');
const inputMessage = actionsCore.getInput('message');
const data: SlackMessageBody = { text: inputMessage };

const sendToSlack = async (url: string, messageBody: SlackMessageBody) => {
  try {
    const response = await axios.post(url, JSON.stringify(messageBody), {
      headers: { 'Content-Type': 'application/json' },
    });
    actionsCore.setOutput('response', JSON.stringify(response));
    return 0;
  } catch (error) {
    const slackError = JSON.stringify(error);
    actionsCore.setFailed(slackError);
    return 1;
  }
};

(async () => {
  await sendToSlack(slackUrl, data);
})();
