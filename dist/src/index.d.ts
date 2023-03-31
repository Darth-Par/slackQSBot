import { PushEvent } from '@octokit/webhooks-definitions/schema';
import { IHttpClient } from './httpClient/httpClient';
import { Channel, CommitData, GetChannelsResponse, SlackConfig } from './customTypes/customTypes';
declare const getCommitData: (eventName: string, payload: PushEvent) => Promise<CommitData | undefined>;
declare const getChannels: (url: string, config: SlackConfig, httpClient: IHttpClient) => Promise<GetChannelsResponse>;
export { Channel, GetChannelsResponse, getChannels, getCommitData, SlackConfig, };
