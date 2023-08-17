# Overview

A custom github action that acts as a slack messenger.

This github action can be added to an existing github actions workflow in order to send pertinent details regarding job and step processing to a specific channel within your slack organization.

## How to use this github action

To use this github action it would have to be added as a step in a job in a github actions workflow. Please see the workflow snippet for a target repository below:

```yaml
name: general-ci-workflow
run-name: General Ci Actions
on: [push]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18.x'
          cache: 'npm'
      - run: cd cdkProfileInfra && npm ci
      - run: cd cdkProfileInfra && npx eslint -c .eslintrc.js .
      - name: Send message to slack
        uses: Darth-Par/slackQSBot@v1.0.32
        id: slackMessaging
        with:
          slackToken: ${{ secrets.SLACK_TOKEN }}
          baseUrl: ${{ vars.BASE_URL }}
          conversationsListPath: ${{ vars.CONVERSATIONS_LIST_PATH }}
          postMessagePath: ${{ vars.POST_MESSAGE_PATH }}
          channelName: ${{ vars.CHANNEL_NAME }}
          message: 'Linting Stage -> ${{ job.status }}'
      - name: Get output
        run: echo "${{ steps.slackMessaging.outputs.response }}"
```

Line 26 marks the entry point of this github action in the example workflow above.

### GitHub Actions Properties

There are a number of properties that need to have values provided for this github action to perform it's taks. The following is a summary of those properites:

- The 'name' and 'id' properties are up to the discretion of the user but should be carry a meaningful value.
- The 'uses' property is where a user declares the reference details for this github action in the following form 'repositoryOwner/repositoryName@tag'. The repository owner and name portions of the reference needs to remain as shown in this example but the tag can be changed to any published version of this github action.
- The 'with.x' properties are all references to secrets, variables and job details necessary for this github action to process and send data to slack.
  - The 'with.slackToken' property references a github action secret that should be created in the same repository as the above workflow. Check out this [documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) to see how to create such a secret.
  - The 'with.baseUrl' property references a github action variable that should contain the base url for messaging slack which should be *https://slack.com* but reviewing slack documentation is a good idea. Check out this [documentation](https://docs.github.com/en/actions/learn-github-actions/variables#creating-configuration-variables-for-a-repository) to see how to create a repository github actions variable.
  - The 'with.conversationsListPath' property references a github action variable that should contain the slack path for listing conversations.
  - The 'with.postMessagePath' property references a github action variable that should contain the slack path for posting a message to a channel.
  - The 'with.channelName' property references a github action variable that should contain the name of the slack channel to post messages to.
  - The 'with.message' property contains a custom message as well as a workflow variable reference to the job's status. In this case the 'lint' job's status is retrieved.

That's it! Essentially, as long as you're able to provide a slack token, and the necessary variables you'll quickly be able to make use of this github action in any github actions workflow to send custom messages to a specific slack channel.
