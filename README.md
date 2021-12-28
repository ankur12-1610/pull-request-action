<h1 align="center">Pull Request Action 🚀</h1>
<p align="center">
  <a href="/wow-actions/auto-comment/blob/master/LICENSE"><img alt="MIT License" src="https://img.shields.io/github/license/ankur12-1610/pull-request-action?style=flat-square"></a>
  <a href="https://www.typescriptlang.org" rel="nofollow"><img alt="Language" src="https://img.shields.io/badge/language-TypeScript-blue.svg?style=flat-square"></a>
  <a href="https://github.com/ankur12-1610/pull-request-action/pulls"><img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square" ></a>
  <a href="https://github.com/marketplace/actions/auto-comment" rel="nofollow"><img alt="website" src="https://img.shields.io/static/v1?label=&labelColor=505050&message=Marketplace&color=0076D6&style=flat-square&logo=google-chrome&logoColor=0076D6" ></a>
  <a href="https://github.com/wow-actions/auto-comment/actions/workflows/release.yml"><img alt="build" src="https://img.shields.io/github/workflow/status/wow-actions/auto-comment/Release/master?logo=github&style=flat-square" ></a>
</p>

This action provides the following functionaliy for the Github Actions users:

- Auto comment on opening a new PR.
- Auto react to the same PR.
- Auto assign the PR to it's creator.
- All of the elements can me configured easily ;)

# Usage :arrow_up::
Create a `.github/workflows/pr-activity.yml` file in the repository of your choice, then add following code to it:
```yaml
name: 'Pull Request Action 🚀'

on: 
  pull_request:
    types: [opened]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: ankur12-1610/pull-request-action
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          content: 'thanks for submitting a pull request! We will try to review it as soon as we can :)'  #enter your custom comment in the content variable
          reaction: 'rocket' #enter your reaction here
          tag_creator: 'true' #enter true if you want to tag the creator of the pull request
```
