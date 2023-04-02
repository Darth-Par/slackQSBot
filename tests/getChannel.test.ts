import { describe, expect, test } from '@jest/globals';

import { getChannel } from '../src/slack/channels';

describe('getChannel test suite', () => {
  const channelName = 'general';
  const channels = [
    {
      id: 'software-000',
      name: 'software',
    },
    {
      id: 'alerts-002',
      name: 'alerts',
    },
    {
      id: 'general-001',
      name: 'general',
    },
  ];

  test('expect to find a channel', async () => {
    const channel = await getChannel(channels, channelName);
    expect(channel).toBeTruthy();
    expect(channel.name).toEqual(channelName);
  });

  test('expect error to be thrown when no channel found', async () => {
    channels.pop();
    await expect(getChannel(channels, channelName)).rejects.toThrow(Error);
  });

  test('expect error to be thrown when many channels found', async () => {
    channels.push({ id: 'general-002', name: 'general' });
    channels.push({ id: 'general-003', name: 'general' });
    await expect(getChannel(channels, channelName)).rejects.toThrow(Error);
  });
});
