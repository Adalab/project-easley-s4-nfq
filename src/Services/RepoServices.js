const ENPOINT = `https://bitbucket.org/atlassian/atlassian-aws-deployment/pull-requests/?state=OPEN`

const fetchRepos = () => fetch(ENPOINT).then(response => response.json());

export { fetchRepos};