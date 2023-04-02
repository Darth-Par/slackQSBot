import { describe, expect, test } from '@jest/globals';

import { sendToChannel } from '../src/slack/channels';
import { HttpTestClient } from '../src/httpClient/httpClient';
import { SlackConfig, SlackPostResponse } from '../src/customTypes/customTypes';

describe('sendToChannels test suite', () => {
  const channelId = 'someFakeId';
  const message = 'hello world';
  const config: SlackConfig = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: 'Bearer someFakeToken',
    },
  };

  const baseUrl = 'https://fake.com';
  const postMessagePath = '/api/chat.postMessage';

  test('expect post success', async () => {
    const httpTestClient = new HttpTestClient();
    const testPostResponse: SlackPostResponse = {
      status: 200,
      statusText: 'success',
    };

    httpTestClient.setSlackPostResponse(testPostResponse);

    const slackPostResponse = await sendToChannel(
      channelId,
      JSON.stringify(message),
      config,
      baseUrl,
      postMessagePath,
      httpTestClient,
    );

    expect(slackPostResponse).toEqual(testPostResponse);
  });
});
