import { AxiosRequestConfig, AxiosResponse, AxiosStatic } from 'axios';
import { describe, expect, test } from '@jest/globals';

import { Channel, GetChannelsResponse, getChannels } from '../src';

interface IHttpClient {
  get(url: string, config: AxiosRequestConfig): Promise<GetChannelsResponse>;
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

  async get(
    url: string,
    config: AxiosRequestConfig,
  ): Promise<GetChannelsResponse> {
    this.url = url;
    this.config = config;

    return {
      status: this.status,
      statusText: this.statusText,
      data: this.data,
    };
  }
}
