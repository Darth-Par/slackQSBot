import axios, { AxiosRequestConfig } from 'axios';

import {
  GetChannelsResponse,
  ResponseData,
  SlackConfig,
  SlackPostResponse,
} from '../customTypes/customTypes';

interface IHttpClient {
  get(url: string, config: SlackConfig): Promise<GetChannelsResponse>;
  post(
    url: string,
    message: string,
    config: SlackConfig,
  ): Promise<SlackPostResponse>;
}

class HttpTestClient implements IHttpClient {
  status: number;

  statusText: string;

  data: ResponseData;

  url: string;

  config: AxiosRequestConfig;

  message: string;

  setGetChannelsResponse(response: GetChannelsResponse) {
    this.status = response.status;
    this.statusText = response.statusText;
    this.data = response.data;
  }

  setSlackPostResponse(response: SlackPostResponse) {
    this.status = response.status;
    this.statusText = response.statusText;
  }

  async get(url: string, config: SlackConfig): Promise<GetChannelsResponse> {
    this.url = url;
    this.config = config;

    return {
      status: this.status,
      statusText: this.statusText,
      data: this.data,
    };
  }

  async post(
    url: string,
    message: string,
    config: SlackConfig,
  ): Promise<SlackPostResponse> {
    this.url = url;
    this.message = message;
    this.config = config;

    return {
      status: this.status,
      statusText: this.statusText,
    };
  }
}

// TODO: Add error handling
class HttpClient implements IHttpClient {
  async get(url: string, config: SlackConfig) {
    return axios.get<unknown, GetChannelsResponse>(url, config);
  }

  async post(url: string, message: string, config: SlackConfig) {
    return axios.post<unknown, SlackPostResponse>(url, message, config);
  }
}

export { HttpClient, HttpTestClient, IHttpClient };
