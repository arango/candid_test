import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRepos, fetchCommits } from "../../common/api";

// Keeping track of the repos array, as well as current API status and most recent error message
// The repos are kept as an array sorted in the order I get back from the API.

const initialState = {
	repos: [],
	status: "IDLE",
	error: null
};

const _fetchRepos = createAsyncThunk("fetchRepos", async () => {
	return fetchRepos();
});

const _fetchCommits = createAsyncThunk(
	"fetchCommits",
	async ({ owner, repo }) => {
		// I went back and forth on whether to take this as a prop or bake it in, but decided this was cleaner
		const yesterday = new Date(
			new Date() - 24 * 60 * 60 * 1000
		).toISOString();
		return fetchCommits({ owner: owner, repo: repo, since: yesterday });
	}
);

export const slice = createSlice({
	name: "repos",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(_fetchRepos.pending, (state) => {
				state.status = "LOADING";
			})
			.addCase(_fetchRepos.fulfilled, (state, action) => {
				state.status = "IDLE";
				state.repos = action.payload.items;
			})
			.addCase(_fetchRepos.rejected, (state, action) => {
				state.status = "IDLE";
				state.error = {
					id: action.meta.requestId,
					message: action.error.message
				};
			})
			.addCase(_fetchCommits.pending, (state) => {
				state.status = "LOADING";
			})
			.addCase(_fetchCommits.fulfilled, (state, action) => {
				state.status = "IDLE";
				const repo_idx = state.repos.findIndex((r) => {
					return (
						r.owner.login === action.meta.arg.owner &&
						r.name === action.meta.arg.repo
					);
				});
				state.repos[repo_idx].commits = action.payload;
			})
			.addCase(_fetchCommits.rejected, (state, action) => {
				state.status = "IDLE";
				state.error = {
					id: action.meta.requestId,
					message: action.error.message
				};
			});
	}
});

export const thunks = {
	fetchRepos: _fetchRepos,
	fetchCommits: _fetchCommits
};

export const selectors = {
	selectRepos: (state) => state.repos.repos,
	selectError: (state) => state.repos.error,
	selectCommits: (state, id) => {
		if (!id) {
			return null;
		}
		const iId = parseInt(id);
		if (state.repos && state.repos.repos && iId) {
			return state.repos.repos.find((repo) => {
				return repo.id === iId;
			});
		} else {
			return null;
		}
	}
};
