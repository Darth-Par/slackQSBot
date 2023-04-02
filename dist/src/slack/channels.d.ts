import { IHttpClient } from '../httpClient/httpClient';
import { Channel, GetChannelsResponse, SlackConfig } from '../customTypes/customTypes';
declare const getChannels: (url: string, config: SlackConfig, httpClient: IHttpClient) => Promise<GetChannelsResponse>;
declare const getChannel: (slackChannels: Channel[], slackChannelName: string) => Promise<Channel>;
declare const sendToChannel: (channelId: string, message: string, config: SlackConfig, baseUrl: string, postMessagePath: string, httpClient: IHttpClient) => Promise<{
    status: number;
    statusText: string;
}>;
export { getChannel, getChannels, sendToChannel };
