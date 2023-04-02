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
type ResponseData = {
    ok: boolean;
    channels: Channel[];
};
type GetChannelsResponse = {
    status: number;
    statusText: string;
    data: ResponseData;
};
type SlackPostResponse = Omit<GetChannelsResponse, 'data'>;
type CommitData = {
    name: string;
    id: string;
    url: string;
};
export { Channel, CommitData, GetChannelsResponse, ResponseData, SlackConfig, SlackPostResponse, };
