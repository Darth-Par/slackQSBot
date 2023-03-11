// import nodeFetch from 'node-fetch';
import https = require('https');

const data = JSON.stringify({ text: 'Hello from GitHub' });
const options = {
  hostname: 'hooks.slack.com',
  port: '443',
  path: '/services/TE5Q5HXUZ/B04TEH0V5V3/GaxPd2DtQUrmQ8tduK48FpQO',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

const req = https.request(options, (res) => {
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
