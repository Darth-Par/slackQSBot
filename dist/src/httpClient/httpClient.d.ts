import { AxiosRequestConfig } from 'axios';
import { Channel, SlackConfig, GetChannelsResponse } from '..';
interface IHttpClient {
    get(url: string, config: SlackConfig): Promise<GetChannelsResponse>;
}
declare class HttpTestClient implements IHttpClient {
    status: number;
    statusText: string;
    data: {
        ok: boolean;
        channels: Channel[];
    };
    url: string;
    config: AxiosRequestConfig;
    setResponse(response: GetChannelsResponse): void;
    get(url: string, config: SlackConfig): Promise<GetChannelsResponse>;
}
declare class HttpClient implements IHttpClient {
    get<GetChannelsResponse>(url: string, config: SlackConfig): Promise<GetChannelsResponse>;
}
export { HttpClient, HttpTestClient, IHttpClient };
