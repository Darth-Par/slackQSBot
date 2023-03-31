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

export { Channel, CommitData, GetChannelsResponse, SlackConfig };
