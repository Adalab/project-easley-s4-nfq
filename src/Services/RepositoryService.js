let repositoryName = 'aui';

let repositoryId = '';

const apiCall = `https://api.bitbucket.org/2.0/repositories/atlassian/${repositoryName}/pullrequests/${repositoryId}`

const getPullRequestInfo = () => fetch(apiCall)
  .then(response => response.json());

export { getPullRequestInfo };
