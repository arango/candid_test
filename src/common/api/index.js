import axios from "axios";

// Select the 100 repos with the most stars

export const fetchRepos = () => {
	return new Promise((resolve, reject) => {
		axios.get(
			"https://api.github.com/search/repositories?q=stars:%3E=50000&sort=stars&order=desc&per_page=100&page=1",
			{
				headers: {
					"X-GitHub-Api-Version": "2022-11-28"
				}
			}
		)
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

// Get all commits within a fixed period of time

export const fetchCommits = ({ owner, repo, since }) => {
	return new Promise((resolve, reject) => {
		axios.get(
			`https://api.github.com/repos/${owner}/${repo}/commits?since=${since}`,
			{
				headers: {
					"X-GitHub-Api-Version": "2022-11-28"
				}
			}
		)
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
