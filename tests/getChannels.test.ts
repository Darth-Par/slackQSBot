import { describe, expect, test } from '@jest/globals';

import { getChannels } from '../src/slack/channels';
import { HttpTestClient } from '../src/httpClient/httpClient';

describe('getChannels test suite', () => {
  const slackTestConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer someFakeToken',
    },
  };

  test('expect success return', async () => {
    const httpTestClient = new HttpTestClient();
    const testResponse = {
      status: 200,
      statusText: 'success',
      data: {
        ok: true,
        channels: [
          {
            id: 'generalChannel0002',
            name: 'general',
          },
        ],
      },
    };

    httpTestClient.setGetChannelsResponse(testResponse);

    const getChannelsResponse = await getChannels(
      'https://fake.com/',
      slackTestConfig,
      httpTestClient,
    );
    const channelName = testResponse.data.channels[0].name;

    expect(getChannelsResponse.status).toEqual(200);
    expect(getChannelsResponse.data?.channels[0].name).toEqual(channelName);
  });
});
