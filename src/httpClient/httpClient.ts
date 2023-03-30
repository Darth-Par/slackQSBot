import axios, { AxiosRequestConfig } from 'axios';

import { Channel, SlackConfig, GetChannelsResponse } from '..';

interface IHttpClient {
  get(url: string, config: SlackConfig): Promise<GetChannelsResponse>;
}

class HttpTestClient implements IHttpClient {
  status: number;

  statusText: string;

  data: {
    ok: boolean;
    channels: Channel[];
  };

  url: string;

  config: AxiosRequestConfig;

  setResponse(response: GetChannelsResponse) {
    this.status = response.status;
    this.statusText = response.statusText;
    this.data = response.data;
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
}

class HttpClient implements IHttpClient {
  async get<GetChannelsResponse>(url: string, config: SlackConfig) {
    const response = (await axios.get(url, config)) as GetChannelsResponse;
    return response;
  }
}

export { HttpClient, HttpTestClient, IHttpClient };
