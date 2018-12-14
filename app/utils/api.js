const id = 'YOUR_CLIENT_ID';
const secret = 'YOUR_SECRET_ID';
const params = `?client_id=${id}&client_secret=${secret}`;

const getProfile = async (username) => (
  await fetch(`https://api.github.com/users/${username}${params}`)
    .then(res => res.json())
);

const getRepos = username => (
  fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
    .then(res => res.json())
);

let getStarCount = (repos) => (
  repos.reduce((count, { stargazers_count }) => count + stargazers_count, 0)
);

let calculateScore = ({ followers }, repos) => (followers * 3) + getStarCount(repos);

let handleError = error => console.warn(error) || null;

let getUserData = async (player) => {
  const [ profile, repos ] = await Promise.all([
    getProfile(player),
    getRepos(player)
  ])
  return ({ profile, score: calculateScore(profile, repos) })
};

let sortPlayers = players => players.sort((a,b) => b.score - a.score);

export default {
  async battle(players) {
    const results = await Promise.all(players.map(getUserData))
      .catch(handleError);
    return results === null
      ? results
      : sortPlayers(results)    
  },
  async fetchPopularRepos(language) {
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

    const response = await fetch(encodedURI)
      .catch(handleError);
    const repos = await response.json();
    return repos.items;
  },
};