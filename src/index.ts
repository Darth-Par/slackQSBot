import axios from 'axios';
import actionsCore = require('@actions/core');

type SlackMessageBody = {
  text: string;
};

// type SlackErrorResponse = {
//   response: {
//     status: number;
//     statusText: string;
//   };
// };

const slackUrl = actionsCore.getInput('slackWebHook');
const inputMessage = actionsCore.getInput('message');
const data: SlackMessageBody = { text: inputMessage };

const sendToSlack = async (url: string, messageBody: SlackMessageBody) => {
  try {
    const response = await axios.post(url, JSON.stringify(messageBody), {
      headers: { 'Content-Type': 'application/json' },
    });
    actionsCore.setOutput('response', JSON.stringify(response));
    return { statusCode: response.status, statusMessage: response.statusText };
  } catch (error) {
    const slackError = JSON.stringify(error);
    actionsCore.setOutput('response', slackError);
    actionsCore.setFailed(slackError);
    return {
      statusCode: 500,
      statusMessage: slackError,
    };
  }
};

(async () => {
  await sendToSlack(slackUrl, data);
})();
