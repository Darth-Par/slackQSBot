const github = jest.createMockFromModule('@actions/github');

function setContext() {
  return (github.context = {
    eventName: 'push',
    payload: {
      head_commit: {
        id: 'commitId_001',
        url: 'https://github.com/someFakeThing',
      },
      repository: {
        name: 'gHActionsRepo',
      },
    },
  });
}

github.setContext = setContext;

module.exports = github;
