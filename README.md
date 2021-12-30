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

## 📝 Prerequisites:
You'll need to create a "Repository Secret" of name `GIPHY_TOKEN` and its value should be the API key of [giphy](https://giphy.com/). Here is the [article](https://support.giphy.com/hc/en-us/articles/360020283431-Request-A-GIPHY-API-Key) on how to set up the giphy API KEY.

![giphy-tk](https://user-images.githubusercontent.com/76884959/147668001-4856c7f5-fe79-4ae8-a01d-fb9f1edef88f.png)


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
      - uses: ankur12-1610/pull-request-action@main
        with:
          GIPHY_TOKEN: ${{ secrets.GIPHY_TOKEN }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          COMMENT_TEXT: 'thanks for submitting a pull request! We will try to review it as soon as we can :)'  #enter your custom comment in the content variable
          PR_REACTION: 'rocket' #enter your reaction here
          GIPHY_TOPIC: 'Thanks a lot' #enter your giphy topic here
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

### If user wants to add GIF to the comment:
### 🪙 GIPHY_TOKEN:
Without `GIPHY_TOKEN` secret, the workflow cannot fetch gifs.

### 📍 GIPHY_TOPIC:
The `GIPHTY_TOPIC` variable can take any input, so whether you want a "thankyou" gif or "welcome" all of them is possible ;) so feel free to exploit it.

---

##  Example 🍠:
Take a look at the Demo PRs:
- [Demo PR v1.1](https://github.com/ankur12-1610/pull-request-action/pull/40)
  >Code:
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
        - uses: ankur12-1610/pull-request-action@v1.1
          with:
            GIPHY_TOKEN: ${{ secrets.GIPHY_TOKEN }}
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
            COMMENT_TEXT: 'thanks for submitting a pull request! We will try to review it as soon as we can :)'  #enter your custom comment in the content variable
            PR_REACTION: 'rocket' #enter your reaction here
            GIPHY_TOPIC: 'Thanks a lot' #enter your giphy topic here
            TAG_AUTHOR: true #enter true if you want to tag the author of the pull request
            ASSIGN_TO_AUTHOR: true #enter true if you want to assign the pull request to the author of the pull request
   
  ```
  
- [Demo PR v1.0](https://github.com/ankur12-1610/pull-request-action/pull/10)
  >Code:
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
        - uses: ankur12-1610/pull-request-action@v1.0
          with:
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
            COMMENT_TEXT: 'thanks for submitting a pull request! We will try to review it as soon as we can :)'  #enter your custom comment in the content variable
            PR_REACTION: 'rocket' #enter your reaction here
            TAG_AUTHOR: true #enter true if you want to tag the author of the pull request
            ASSIGN_TO_AUTHOR: true #enter true if you want to assign the pull request to the author of the pull request
   
  ```

# Inspired From

> [:speech_balloon: Auto Comment](https://github.com/wow-actions/auto-comment)


##  License 🔖:

The scripts and documentation in this project are released under the [MIT License](LICENSE)

---

### This project needs a **star** ⭐ from your .
