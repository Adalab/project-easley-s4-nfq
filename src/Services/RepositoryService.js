let repositoryName = 'aui';

let repositoryId = '';

const prEndpoint = `https://api.bitbucket.org/2.0/repositories/atlassian/${repositoryName}/pullrequests/${repositoryId}`

const getPullRequestInfo = () => fetch(prEndpoint)
  .then(response => response.json());

export { getPullRequestInfo, prEndpoint };
