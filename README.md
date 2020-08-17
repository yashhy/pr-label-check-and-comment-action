# PR label check and comment

Checks for required PR label, adds comment and fails PR checks if none of the required labels are provided

## What it does?
After a PR is `opened`, `labeled`, `unlabeled` or `synchronize`, below comment is added if no required labels are found in a PR

Example:

![Github bot commenting to add required labels](https://user-images.githubusercontent.com/4756393/90272952-ce32c980-de7b-11ea-9d9b-7008e2af9a54.png)

Example PRs:
 - https://github.com/yashhy/pr-label-comment-test/pull/1 - Fail
 - https://github.com/yashhy/pr-label-comment-test/pull/2 - Success

## Inputs:
 - GITHUB_TOKEN : The `GITHUB_TOKEN` secret. You can use the default `${{secret.GITHUB_TOKEN}}`
 - required_labels : List of required labels for your PRs separated by comma "`,`" 
 
 Example: 🕷 bug, 🏆 feature, 📝 docs

 > Yes, emojis are supported 💪🏻

## Example Usage:

Create a file `.github/workflows/pr-label-check-and-comment-action.yaml` with below contents :

```yaml
name: Check PR required labels and comment

on:
  pull_request:
    types: [opened, labeled, unlabeled, synchronize]

jobs:
  check-pr-label-and-comment:
    runs-on: ubuntu-latest
    steps:
      - uses: yashhy/pr-label-check-and-comment-action@master
        with:
          required_labels: '🐛bug, 🎖user-story' <-- add your required labels here
          GITHUB_TOKEN: '${{secrets.GITHUB_TOKEN}}'

```

## Build & Release:

```nodejs
  npm i

  npm i -g @vercel/ncc

  ncc build index.js
```

1. This op file in `dist/index.js`
2. Push all the files
3. Create a release from GitHub