import { PushEvent } from '@octokit/webhooks-definitions/schema';

import { CommitData } from '../customTypes/customTypes';

export const getCommitData = async (
  eventName: string,
  payload: PushEvent,
): Promise<CommitData | undefined> => {
  if (eventName == 'push') {
    const repositoryName = payload.repository.name;
    if (payload.head_commit) {
      return {
        name: repositoryName,
        id: payload.head_commit.id,
        url: payload.head_commit.url,
      };
    }
  }
  return undefined;
};
