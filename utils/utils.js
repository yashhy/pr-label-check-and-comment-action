const delve = require('delve')
const { Octokit } = require('@octokit/core');
const github = require('@actions/github');
const core = require('@actions/core');

const auth = core.getInput('GITHUB_TOKEN');
const { request } = new Octokit({ auth });

const __getRequestInfo = context => {
  const PR = delve(context, 'payload.pull_request', '');

  return {
    issueNumber: delve(PR, 'number', ''),
    repo: delve(context, 'payload.repository.name', ''),
    owner: delve(context, 'payload.repository.owner.login', ''),
    prUser: delve(context, 'payload.pull_request.user.login', '')
  }
}

const getListOfLabels = () => {
  const prLabels = delve(github.context, 'payload.pull_request.labels', [])

  return prLabels;
}

const doesPrHasLabels = (requiredLabels, listOfLabelsInPR) => {
  return requiredLabels.split(',').filter(label => {
    return listOfLabelsInPR.map(label => label.name.trim()).includes(label.trim())
  });
}

const commentPr = async body => {
  const {
    issueNumber,
    repo,
    owner,
    prUser
  } = __getRequestInfo(github.context);

  let response,
    error,
    isError = false;
  const bodyWithUserName = body.replace('{USER}', prUser);

  try {
    response = await request(`POST /repos/${owner}/${repo}/issues/${issueNumber}/comments`, {
      body: bodyWithUserName,
    })
  } catch (e) {
    isError = true;
    error = e;
  }

  return {
    response,
    error,
    isError
  }
}

module.exports = {
  commentPr,
  getListOfLabels,
  doesPrHasLabels
}