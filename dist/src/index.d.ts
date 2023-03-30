import { PushEvent } from '@octokit/webhooks-definitions/schema';
import { IHttpClient } from './httpClient/httpClient';
type SlackConfig = {
    headers: {
        'Content-Type': string;
        Authorization: string;
    };
};
type Channel = {
    id: string;
    name: string;
};
type GetChannelsResponse = {
    status: number;
    statusText: string;
    data: {
        ok: boolean;
        channels: Channel[];
    };
};
type CommitData = {
    name: string;
    id: string;
    url: string;
};
declare const getCommitData: (eventName: string, payload: PushEvent) => Promise<CommitData | undefined>;
declare const getChannels: (url: string, config: SlackConfig, httpClient: IHttpClient) => Promise<GetChannelsResponse>;
export { Channel, GetChannelsResponse, getChannels, getCommitData, SlackConfig, };
