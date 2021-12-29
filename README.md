<h1 align="center">Pull Request Action 🚀</h1>

---

<p align="center">
  <a href="/wow-actions/auto-comment/blob/master/LICENSE"><img alt="MIT License" src="https://img.shields.io/github/license/ankur12-1610/pull-request-action?style=flat-square"></a>
  <a href="https://www.typescriptlang.org" rel="nofollow"><img alt="Language" src="https://img.shields.io/badge/language-TypeScript-blue.svg?style=flat-square"></a>
  <a href="https://github.com/ankur12-1610/pull-request-action/pulls"><img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square" ></a>
  <a href="https://github.com/marketplace/actions/pr-activity-action" rel="nofollow"><img alt="website" src="https://img.shields.io/static/v1?label=&labelColor=505050&message=Marketplace&color=0076D6&style=flat-square&logo=google-chrome&logoColor=0076D6" ></a>  <a href="https://github.com/ankur12-1610/pull-request-action/actions?query=workflow%3Abuild-test"><img alt="build-test status" src="https://github.com/actions/setup-node/workflows/build-test/badge.svg"></a>
</p>

This action provides the following functionaliy for the Github Actions users:

- Auto comments on opening a new PR.
- Auto reacts to the same PR.
- Auto assigns the PR to it's author.
- Tags the author of the PR.
- All of the elements can me configured easily ;)

---

## :arrow_up: Usage:
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
      - uses: ankur12-1610/pull-request-action@V1.1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          COMMENT_TEXT: 'thanks for submitting a pull request! We will try to review it as soon as we can :)'  #enter your custom comment in the content variable
          PR_REACTION: 'rocket' #enter your reaction here
          TAG_AUTHOR: true #enter true if you want to tag the author of the pull request
          ASSIGN_TO_AUTHOR: true #enter true if you want to assign the pull request to the author of the pull request
```
The comment and the reaction to the PR can be customized according to the user.

####  💬 COMMENT_TEXT:
The `COMMENT_TEXT` variable can take any string so feel free to enter any comment in this section.
```yaml
          COMMENT_TEXT: {{ your comment }}
```

#### 🚀 PR_REACTION:
The `PR_REACTION` variable can also be customized.
```yaml
          PR_REACTION: {{ your reaction }}
```
The available reactions are:

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

#### 🏷️ TAG_AUTHOR:
The `TAG_AUTHOR` has either `true` or `false` boolean fields. Assigning `true` will tag the author of the PR in the comment.
```yaml
          TAG_AUTHOR: {{ true or false }}
```

#### 🏁 ASSIGN_TO_AUTHOR:
The `ASSIGN_TO_AUTHOR` has either `true` or `false` boolean fields. Assigning `true` will assign the PR to the author of the PR.
```yaml
          ASSIGN_TO_AUTHOR: {{ true or false }}
```

---

## 🍠 Example:
Take a look at the [Demo PR](https://github.com/ankur12-1610/pull-request-action/pull/10).
<p>Screenshot:</p>

![demo](https://user-images.githubusercontent.com/76884959/147635312-88be8a7d-9c9d-4129-8dd3-858397b7faaa.png)

---

## 🤝 Contributing:
Contributions are welcome:) :hearts:! Please share any features, and add unit tests! Use the pull request and issue to contribute. Your contribution will make this project better ;)

---

##  License 🔖:

The scripts and documentation in this project are released under the [MIT License](LICENSE)

---

## Inspired From:

> [:speech_balloon: Auto Comment](https://github.com/wow-actions/auto-comment)

### If you found this project helpul please give this repo a **star** ⭐ from your ♥.
