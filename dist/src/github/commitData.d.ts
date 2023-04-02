import { PushEvent } from '@octokit/webhooks-definitions/schema';
import { CommitData } from '../customTypes/customTypes';
export declare const getCommitData: (eventName: string, payload: PushEvent) => Promise<CommitData | undefined>;
