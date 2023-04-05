import { AxiosRequestConfig } from 'axios';
import { GetChannelsResponse, ResponseData, SlackConfig, SlackPostResponse } from '../customTypes/customTypes';
interface IHttpClient {
    get(url: string, config: SlackConfig): Promise<GetChannelsResponse>;
    post(url: string, message: string, config: SlackConfig): Promise<SlackPostResponse>;
}
declare class HttpTestClient implements IHttpClient {
    status: number;
    statusText: string;
    data: ResponseData;
    url: string;
    config: AxiosRequestConfig;
    message: string;
    setGetChannelsResponse(response: GetChannelsResponse): void;
    setSlackPostResponse(response: SlackPostResponse): void;
    get(url: string, config: SlackConfig): Promise<GetChannelsResponse>;
    post(url: string, message: string, config: SlackConfig): Promise<SlackPostResponse>;
}
declare class HttpClient implements IHttpClient {
    get(url: string, config: SlackConfig): Promise<GetChannelsResponse>;
    post(url: string, message: string, config: SlackConfig): Promise<SlackPostResponse>;
}
export { HttpClient, HttpTestClient, IHttpClient };
