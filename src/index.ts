// import nodeFetch from 'node-fetch';
import axios from 'axios';

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

const data: SlackMessageBody = { text: 'Hello from GitHub' };

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
  const slackResponse = await sendToSlack(slackUrl, data);
  console.log(slackResponse);
})();
