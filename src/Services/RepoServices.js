let endPoint = (repoName) => `https://api.bitbucket.org/2.0/repositories/atlassian/${repoName}/pullrequests/`

const fetchRepos = (repoName) => fetch(endPoint(repoName)).then(response => response.json());

export {fetchRepos};
