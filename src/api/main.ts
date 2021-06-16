import {User} from "@/types/user";
import {getRepos, getUser} from "@/api/api";

async function main(): Promise<string> {
  const name = "ajlee2006";
  const user = await getUser(name);
  const repos = await getRepos(name);
  const starredRepos = repos.filter(repo => {
    return repo.stargazers_count > 0;
  });
  const repoNames = repos.map(repo => repo.name).join(", ");
  return `${user.login} has ${user.followers} followers, ${starredRepos.length} starred repos and ${repos.length} repos: ${repoNames}`;
}

export default {
  main
};
