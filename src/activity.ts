const core = require('@actions/core')
const github = require('@actions/github')
const camelCase = require('camelcase')
import axios, { AxiosInstance, AxiosResponse } from 'axios'

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export async function run() {
  try {
    const { context } = require('@actions/github')

    //taking input from the core
    const GIPHY_TOKEN = core.getInput('GIPHY_TOKEN')
    const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')
    const COMMENT_TEXT = core.getInput('COMMENT_TEXT')
    const PR_REACTION = core.getInput('PR_REACTION')
    const TAG_AUTHOR = core.getInput('TAG_AUTHOR')
    const ASSIGN_TO_AUTHOR = core.getInput('ASSIGN_TO_AUTHOR')
    const GIPHY_TOPIC = camelCase(core.getInput('GIPHY_TOPIC'))
    const FIRST_TIMERS_MESSAGE = core.getInput('FIRST_TIMERS_MESSAGE')

    if (typeof GITHUB_TOKEN !== 'string') {
      throw new Error(
        'Invalid GITHUB_TOKEN: did you forget to set it in your action config?',
      )
    }

    //fetch GIF from GIPHY
    const response: AxiosResponse = await axios.get(
      `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_TOKEN}&tag=${GIPHY_TOPIC}`,
    )
    const gifUrl: string = response.data.data.images.fixed_height_small.url

    const gif = `\n\n![thanks](${gifUrl})`
    const octokit = github.getOctokit(GITHUB_TOKEN)
    const { pull_request } = context.payload
    const payload = context.payload.pull_request
    const author = payload.user.login
    const creator = context.payload.sender.login
    const tag_text = TAG_AUTHOR ? `@` + author + ` ` : null
    const assignee = ASSIGN_TO_AUTHOR ? author : null

    //comment on PR
    await octokit.rest.issues.createComment({
      ...context.repo,
      issue_number: pull_request.number,
      body: tag_text + COMMENT_TEXT + gif,
      id: payload.number.toString(),
    })

    //assign PR to its author
    await octokit.rest.issues.addAssignees({
      ...context.repo,
      issue_number: pull_request.number,
      assignees: assignee,
    })

    //add reaction to PR
    await octokit.rest.reactions.createForIssue({
      ...context.repo,
      repo: context.repo.repo,
      issue_number: pull_request.number,
      content: PR_REACTION,
      owner: context.repo.owner,
    })

    //for first timers
    const pulls = await octokit.rest.pulls.list({
      ...context.repo,
      state: 'all',
      sort: 'created',
      direction: 'desc',
    })
    console.log('Checking...')
    if (pulls.data.length === 1) {
      console.log('First pull request!')
      await octokit.rest.issues.createComment({
        ...context.repo,
        issue_number: pull_request.number,
        body: FIRST_TIMERS_MESSAGE,
        id: payload.number.toString(),
      })
    } else {
      console.log('Not first pull request')
    }
  } catch (e) {
    core.error(e)
    core.setFailed((e as Error).message)
  }
}
