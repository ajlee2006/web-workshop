import {getIp, getRepos, getUser} from "@/api/api";

async function main(): Promise<string> {
  const name = "ajlee2006";
  const ipAddress = "128.199.150.242";
  const user = await getUser(name);
  const repos = await getRepos(name);
  const starredRepos = repos.filter(repo => {
    return repo.stargazers_count > 0;
  });
  const repoNames = repos.map(repo => repo.name).join(", ");
  const ip = await getIp(ipAddress);
  return `${user.login} has ${user.followers} followers, ${starredRepos.length} starred repos and ${repos.length} repos: ${repoNames}. ${ip.query} is ${ip.as}, and is in ${ip.city}, ${ip.country} (${ip.lat}, ${ip.lon}).`;
}

export default {
  main
};
