import axios from 'axios';
import actionsCore = require('@actions/core');

type SlackMessageBody = {
  text: string;
};

type SlackErrorResponse = {
  response: {
    status: number;
    statusText: string;
  };
};

const slackUrl =
  'https://hooks.slack.com/services/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';
const inputMessage = actionsCore.getInput('message');
const data: SlackMessageBody = { text: inputMessage };

const sendToSlack = async (url: string, messageBody: SlackMessageBody) => {
  try {
    const response = await axios.post(url, JSON.stringify(messageBody), {
      headers: { 'Content-Type': 'application/json' },
    });
    return { statusCode: response.status, statusMessage: response.statusText };
  } catch (error) {
    const slackError = error as SlackErrorResponse;
    return {
      statusCode: slackError.response.status,
      statusMessage: slackError.response.statusText,
    };
  }
};

(async () => {
  await sendToSlack(slackUrl, data);
})();
