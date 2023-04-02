import { IHttpClient } from '../httpClient/httpClient';
import { GetChannelsResponse, SlackConfig } from '../customTypes/customTypes';

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

export { getChannels };
