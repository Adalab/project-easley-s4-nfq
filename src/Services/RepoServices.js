const ENPOINT = 'https://api.bitbucket.org/2.0/repositories/atlassian/atlassian-aws-deployment/pullrequests/'

const fetchRepos = () => fetch(ENPOINT).then(response => response.json());

export {fetchRepos};