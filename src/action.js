require('dotenv').config()
const core = require('@actions/core')
const github = require('@actions/github')

async function run() {
  try {
    const { context } = require('@actions/github')
    const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')
    const comment = core.getInput('content')
    const reaction = core.getInput('reaction')
    const tag_creator = core.getInput('tag_creator')

    if ( typeof GITHUB_TOKEN !== 'string' ) {
      throw new Error('Invalid GITHUB_TOKEN: did you forget to set it in your action config?');
    }

    const octokit = github.getOctokit(GITHUB_TOKEN) //const
    const { pull_request } = context.payload
    const payload = context.payload.pull_request
    const author = payload.user.login
    
    const tag_text = (tag_creator ? `@` + author + ` ` : null) 

    await octokit.rest.issues.createComment({
      ...context.repo,
      issue_number: pull_request.number,
      body: tag_text + comment,
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
      content: reaction,
      owner: context.repo.owner
    })
  } catch (e) {
    core.error(e)
    core.setFailed(e.message)
  }
}
run()
