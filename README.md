<h1 align="center">Pull Request Action 🚀</h1>

---

<p align="center">
  <a href="/wow-actions/auto-comment/blob/master/LICENSE"><img alt="MIT License" src="https://img.shields.io/github/license/ankur12-1610/pull-request-action?style=flat-square"></a>
  <a href="https://www.typescriptlang.org" rel="nofollow"><img alt="Language" src="https://img.shields.io/badge/language-TypeScript-blue.svg?style=flat-square"></a>
  <a href="https://github.com/ankur12-1610/pull-request-action/pulls"><img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square" ></a>
  <a href="https://github.com/marketplace/actions/pull-request-action" rel="nofollow"><img alt="website" src="https://img.shields.io/static/v1?label=&labelColor=505050&message=Marketplace&color=0076D6&style=flat-square&logo=google-chrome&logoColor=0076D6" ></a>
  <a href="https://github.com/ankur12-1610/pull-request-action/workflows/release.yml"><img alt="build" src="https://img.shields.io/github/workflow/status/wow-actions/auto-comment/Release/master?logo=github&style=flat-square" ></a>
</p>

This action provides the following functionaliy for the Github Actions users:

- Auto comment on opening a new PR.
- Auto react to the same PR.
- Auto assign the PR to it's creator.
- All of the elements can me configured easily ;)

---

## Usage :arrow_up::
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
      - uses: ankur12-1610/pull-request-action@main
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          COMMENT_TEXT: 'thanks for submitting a pull request! We will try to review it as soon as we can :)'  #enter your custom comment in the content variable
          PR_REACTION: 'rocket' #enter your reaction here
          TAG_AUTHOR: true #enter true if you want to tag the author of the pull request
          ASSIGN_TO_AUTHOR: true #enter true if you want to assign the pull request to the author of the pull request
```
The comment and the reaction to the PR can be customized according to the user.

###  💬 COMMENT_TEXT:
The `COMMENT_TEXT` variable can take any string so feel free to enter any comment in this section.

### 🚀 PR_REACTION:
The `PR_REACTION` variable can also be customized. The available reactions are:

| content    | emoji |
| ---------- | :-----: |
| `+1`       | 👍    |
| `-1`       | 👎    |
| `laugh`    | 😄    |
| `confused` | 😕    |
| `rocket`   | 🚀    |
| `eyes`     | 👀    |
| `heart`    | ❤️    |
| `hooray`   | 🎉    |

### 🏷️ TAG_AUTHOR:
The `TAG_AUTHOR` has either `true` or `false` boolean fields. Assigning `true` will tag the author of the PR in the comment.

### 🏁 ASSIGN_TO_AUTHOR:
The `ASSIGN_TO_AUTHOR` has either `true` or `false` boolean fields. Assigning `true` will assign the PR to the author of the PR.

---

##  Example 🍠:
Take a look at the [Demo PR](https://github.com/ankur12-1610/pull-request-action/pull/10).

---

##  License 🔖:

The scripts and documentation in this project are released under the [MIT License](LICENSE)
