import * as core from '@actions/core';
import * as github from '@actions/github';
const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')

export async function ftimers() {
  try {
    const prMessage: string = core.getInput('pr-message');
    if (!prMessage) {
      throw new Error(
        'Action must have at least one of issue-message or pr-message set'
      );
    }
    // Get client and context
    const octokit = github.getOctokit(GITHUB_TOKEN) 
    const { context } = require('@actions/github')

    if (context.payload.action !== 'opened') {
      console.log('No issue or PR was opened, skipping');
      return;
    }

    // Do nothing if its not a pr or issue
    const isIssue: boolean = !!context.payload.issue;
    if (!isIssue && !context.payload.pull_request) {
      console.log(
        'The event that triggered this action was not a pull request or issue, skipping.'
      );
      return;
    }

    // Do nothing if its not their first contribution
    console.log('Checking if its the users first contribution');
    if (!context.payload.sender) {
      throw new Error('Internal error, no sender provided by GitHub');
    }
    const sender: string = context.payload.sender!.login;
    const issue: {owner: string; repo: string; number: number} = context.issue;
    let firstContribution: boolean = false;
    if (!isIssue) {
      firstContribution = await isFirstPull(
        octokit,
        issue.owner,
        issue.repo,
        sender,
        issue.number
      );
    }
    if (!firstContribution) {
      console.log('Not the users first contribution');
      return;
    }

    // Do nothing if no message set for this type of contribution
    const message: string  = prMessage;
    if (!message) {
      console.log('No message provided for this type of contribution');
      return;
    }

    const issueType: string = isIssue ? 'issue' : 'pull request';
    // Add a comment to the appropriate place
    console.log(`Adding message: ${message} to ${issueType} ${issue.number}`);
    if (!isIssue) {
      await octokit.rest.pulls.createReview({
        owner: issue.owner,
        repo: issue.repo,
        pull_number: issue.number,
        body: message,
        event: 'COMMENT'
      });
    }
  } catch (error) {
    core.setFailed((error as Error).message);
    return;
  }
}

// No way to filter pulls by creator
async function isFirstPull(
  octokit = github.getOctokit(GITHUB_TOKEN),
  owner: string,
  repo: string,
  sender: string,
  curPullNumber: number,
  page: number = 1
): Promise<boolean> {
  // Provide console output if we loop for a while.
  console.log('Checking...');
  const {status, data: pulls} = await octokit.rest.pulls.list({
    owner: owner,
    repo: repo,
    per_page: 100,
    page: page,
    state: 'all'
  });

  if (status !== 200) {
    throw new Error(`Received unexpected API status code ${status}`);
  }

  if (pulls.length === 0) {
    return true;
  }

  for (const pull of pulls) {
    const login = pull.user?.login
    if (login === sender && pull.number < curPullNumber) {
      return false;
    }
  }

  return await isFirstPull(
    octokit,
    owner,
    repo,
    sender,
    curPullNumber,
    page + 1
  );
}
