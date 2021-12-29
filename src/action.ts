require('dotenv').config()
const core = require('@actions/core')
const github = require('@actions/github')
const fetch = require('node-fetch')

async function run() {
    try {
    const { context } = require('@actions/github')
    const TENOR_TOKEN = core.getInput('TENOR_TOKEN') || process.env.TENOR_TOKEN
    const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')
    const COMMENT_TEXT = core.getInput('COMMENT_TEXT')
    const searchTerm = core.getInput('searchTerm') || 'thank you';
    const PR_REACTION = core.getInput('PR_REACTION')
    const TAG_AUTHOR = core.getInput('TAG_AUTHOR')
    const ASSIGN_TO_AUTHOR = core.getInput('ASSIGN_TO_AUTHOR')
    
    if ( typeof TENOR_TOKEN !== 'string' ) {
      throw new Error('Invalid TENOR_TOKEN: did you forget to set it in your action config?');
    }
  
    if ( typeof GITHUB_TOKEN !== 'string' ) {
      throw new Error('Invalid GITHUB_TOKEN: did you forget to set it in your action config?');
    }

    //gif
    const randomPos = Math.round(Math.random() * 1000)
    const url = `https://api.tenor.com/v1/search?q=thank%20you&pos=${randomPos}&limit=1&media_filter=minimal&contentfilter=high&key=${TENOR_TOKEN}`
    console.log(`${url}`)
    const response = await fetch(url)
    const { results } = await response.json()
    const gifUrl = results[0].media[0].tinygif.url
    console.log(`${gifUrl}`)

    const octokit = github.getOctokit(GITHUB_TOKEN) 
    const { pull_request } = context.payload
    const payload = context.payload.pull_request
    const author = payload.user.login 
    const tag_text = (TAG_AUTHOR ? `@` + author + ` ` : null) 
    const assignee = (ASSIGN_TO_AUTHOR ? author : null)

    await octokit.rest.issues.createComment({
      ...context.repo,
      issue_number: pull_request.number,
      body: tag_text + COMMENT_TEXT + `\n\n<img src="${gifUrl}" alt="${searchTerm}"/>`,
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