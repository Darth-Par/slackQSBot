import { IHttpClient } from '../httpClient/httpClient';
import {
  Channel,
  GetChannelsResponse,
  SlackConfig,
} from '../customTypes/customTypes';

const getChannels = async (
  url: string,
  config: SlackConfig,
  httpClient: IHttpClient,
): Promise<GetChannelsResponse> => {
  const response = await httpClient.get(url, config);
  return {
    status: response.status,
    statusText: response.statusText,
    data: response.data,
  };
};

const getChannel = async (
  slackChannels: Channel[],
  slackChannelName: string,
): Promise<Channel> => {
  const channelArray = slackChannels.filter(
    (channel) => channel.name === slackChannelName,
  );
  if (channelArray.length < 1) {
    throw new Error(`${slackChannelName} not found`);
  }

  if (channelArray.length > 1) {
    throw new Error(`Oddly there are multiple rooms named ${slackChannelName}`);
  }
  return channelArray[0];
};

const sendToChannel = async (
  channelId: string,
  message: string,
  config: SlackConfig,
  baseUrl: string,
  postMessagePath: string,
  httpClient: IHttpClient,
) => {
  const messageBody = {
    channel: channelId,
    text: message,
  };

  const response = await httpClient.post(
    `${baseUrl}${postMessagePath}`,
    JSON.stringify(messageBody),
    config,
  );

  return {
    status: response.status,
    statusText: response.statusText,
  };
};

export { getChannel, getChannels, sendToChannel };
