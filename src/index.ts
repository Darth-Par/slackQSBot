import axios from 'axios';
import actionsCore = require('@actions/core');

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
  } catch (error) {
    const slackError = JSON.stringify(error);
    actionsCore.setFailed(slackError);
  }
};

(async () => {
  await sendToSlack(slackUrl, data);
})();
