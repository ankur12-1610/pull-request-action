require('dotenv').config()
const core = require('@actions/core')
const github = require('@actions/github')
import axios from 'axios'

async function run() {
    try {
    const { context } = require('@actions/github')
    const GIPHY_TOKEN = core.getInput('GIPHY_TOKEN') || process.env.TENOR_TOKEN 
    const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')
    const COMMENT_TEXT = core.getInput('COMMENT_TEXT')
    const searchTerm = core.getInput('searchTerm') || 'thank you';
    const PR_REACTION = core.getInput('PR_REACTION')
    const TAG_AUTHOR = core.getInput('TAG_AUTHOR')
    const ASSIGN_TO_AUTHOR = core.getInput('ASSIGN_TO_AUTHOR')
    
    if ( typeof GIPHY_TOKEN !== 'string' ) {
      throw new Error('Invalid TENOR_TOKEN: did you forget to set it in your action config?');
    }
  
    if ( typeof GITHUB_TOKEN !== 'string' ) {
      throw new Error('Invalid GITHUB_TOKEN: did you forget to set it in your action config?');
    }

    //gif
    if (GIPHY_TOKEN){
    const response = await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_TOKEN}&tag=thanks&rating=g/`)
    const gif = `![welcome_gif](${response.data.url})`;
    console.log(gif)
    }

    const octokit = github.getOctokit(GITHUB_TOKEN) 
    const { pull_request } = context.payload
    const payload = context.payload.pull_request
    const author = payload.user.login 
    const tag_text = (TAG_AUTHOR ? `@` + author + ` ` : null) 
    const assignee = (ASSIGN_TO_AUTHOR ? author : null)

    await octokit.rest.issues.createComment({
      ...context.repo,
      issue_number: pull_request.number,
      body: tag_text + COMMENT_TEXT + gif,
      id: payload.number.toString()
    })

    await octokit.rest.issues.addAssignees({
      ...context.repo,
      issue_number: pull_request.number,
      assignees: assignee
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