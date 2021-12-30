require('dotenv').config()
const core = require('@actions/core')
const github = require('@actions/github')
const camelCase = require('camelcase')
import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { report } from 'process'

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

async function run() {
    try {
    const { context } = require('@actions/github')
    const GIPHY_TOKEN = core.getInput('GIPHY_TOKEN')
    const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')
    const COMMENT_TEXT = core.getInput('COMMENT_TEXT')
    const PR_REACTION = core.getInput('PR_REACTION')
    const TAG_AUTHOR = core.getInput('TAG_AUTHOR')
    const ASSIGN_TO_AUTHOR = core.getInput('ASSIGN_TO_AUTHOR')
    const GIPHY_TOPIC = camelCase(core.getInput('GIPHY_TOPIC'))
    
  
    if ( typeof GITHUB_TOKEN !== 'string' ) {
      throw new Error('Invalid GITHUB_TOKEN: did you forget to set it in your action config?');
    }
    
    //fetch GIF from GIPHY
    const response: AxiosResponse =  await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_TOKEN}&tag=${GIPHY_TOPIC}`)
    const gifUrl: string = response.data.data.images.fixed_height_small.url


    const sender = context.payload.sender.login
    const gif = `\n\n![thanks](${gifUrl})`
    const octokit = github.getOctokit(GITHUB_TOKEN) 
    const { pull_request } = context.payload
    const payload = context.payload.pull_request
    const author = payload.user.login 
    const tag_text = (TAG_AUTHOR ? `@` + author + ` ` : null) 
    const assignee = (ASSIGN_TO_AUTHOR ? author : null)
    
    //comment on PR
    await octokit.rest.issues.createComment({
      ...context.repo,
      issue_number: pull_request.number,
      body: tag_text + COMMENT_TEXT + gif,
      id: payload.number.toString()
    })
    
    //assign PR to its author
    await octokit.rest.issues.addAssignees({
      ...context.repo,
      issue_number: pull_request.number,
      assignees: assignee
    })
    
    //add reaction to PR
    await octokit.rest.reactions.createForIssue({
      ...context.repo,
      repo: context.repo.repo,
      issue_number: pull_request.number,
      content: PR_REACTION,
      owner: context.repo.owner
    })

    //first contributor to PR gets a welcome message
    const firstContribution = await octokit.rest.pulls.list({
      ...context.repo,
      repo: context.repo.repo,
      owner: context.repo.owner,
      state: ['open','closed'],
      sender: sender,
      sort: 'created',
      direction: 'asc',
      per_page: 1
    })
    console.log(firstContribution.data.length)
    if (firstContribution.data.length === 1) {
      await octokit.rest.issues.createComment({
        ...context.repo,
        issue_number: pull_request.number,
        body: `:tada: This is the first time you contributed to this repo. Thanks for the first contribution!`
      })
    }
      

  } catch (e) {
    core.error(e)
    core.setFailed((e as Error).message)
  }
}

run()