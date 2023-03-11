// import nodeFetch from 'node-fetch';
import https = require('https');

const data = JSON.stringify({ text: 'Hello from GitHub' });
// const data = 'Hello from GitHub';
const slackWebHook =
  'https://hooks.slack.com/services/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';

// nodeFetch(slackWebHook, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(data),
// })
//   .then((response) => response.json())
//   .then((result) => console.log(result))
//   .catch((error) => {
//     console.error('Error: ', error);
//   });

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

const req = https.request(slackWebHook, options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`MESSAGE: ${res.statusMessage}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();
