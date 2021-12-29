require('dotenv').config()
const core = require('@actions/core')
const github = require('@actions/github')

async function run() {
    try {
    const { context } = require('@actions/github')
    const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')
    const COMMENT_TEXT = core.getInput('COMMENT_TEXT')
    const PR_REACTION = core.getInput('PR_REACTION')
    const TAG_AUTHOR = core.getInput('TAG_AUTHOR')
    
    if ( typeof GITHUB_TOKEN !== 'string' ) {
      throw new Error('Invalid GITHUB_TOKEN: did you forget to set it in your action config?');
    }
    
    const octokit = github.getOctokit(GITHUB_TOKEN) 
    const { pull_request } = context.payload
    const payload = context.payload.pull_request
    const author = payload.user.login 
    const tag_text = (TAG_AUTHOR ? `@` + author + ` ` : null) 

    await octokit.rest.issues.createComment({
      ...context.repo,
      issue_number: pull_request.number,
      body: tag_text + COMMENT_TEXT,
      id: payload.number.toString()
    })

    await octokit.rest.issues.addAssignees({
      ...context.repo,
      issue_number: pull_request.number,
      assignees: author
    })

    await octokit.rest.reactions.createForIssue({
      ...context.repo,
      repo: context.repo.repo,
      issue_number: pull_request.number,
      content: PR_REACTION,
      owner: context.repo.owner
    })
  } catch (e) {
    core.error(e)
    core.setFailed((e as Error).message)
  }
}



run()
