const ENPOINT = `https://api.bitbucket.org/2.0/repositories/atlassian/atlassian-aws-deployment/pullrequests/279`

const fetchRepos = () => fetch(ENPOINT).then(response => response.json());

export { fetchRepos};