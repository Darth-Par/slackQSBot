import { describe, expect, test } from '@jest/globals';
import { PushEvent } from '@octokit/webhooks-definitions/schema';

import { getCommitData } from '../src/github/commitData';

describe('getCommitData test suite', () => {
  test('expect standard success return', async () => {
    const ghEventName = 'push';
    const ghPayload = {
      head_commit: {
        id: 'qerel3902345',
        url: 'https://gh.com/someFakeThing',
      },
      repository: {
        name: 'ghActionsRepo',
      },
    } as PushEvent;

    const commitData = await getCommitData(ghEventName, ghPayload);
    expect(commitData?.name).toBe('ghActionsRepo');
  });

  test('expect undefined return', async () => {
    const ghEventName = 'PR';
    const ghPayload = {
      head_commit: {
        id: 'qerel3902345',
        url: 'https://gh.com/someFakeThing',
      },
      repository: {
        name: 'ghActionsRepo',
      },
    } as PushEvent;

    const commitData = await getCommitData(ghEventName, ghPayload);
    expect(commitData).toBe(undefined);
  });
});
