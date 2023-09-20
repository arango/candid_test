import React from "react";
import Grid from "@mui/material/Unstable_Grid2";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import { thunks, selectors } from "../../Store";
import CommitModal from "./components/CommitModal";
import RepoCard from "./components/RepoCard";
import RepoCardSkeleton from "./components/RepoCard/skeleton";
import { Typography } from "@mui/material";

export default function Repos() {
	const dispatch = useDispatch();
	const repos = useSelector(selectors.repos.selectRepos);
	const error = useSelector(selectors.repos.selectError);
	// Flag for showing/hiding the commit modal
	const [commits, setCommits] = React.useState(null);
	// Flag for showing/hiding the error snackbar
	const [showError, setShowError] = React.useState(false);

	const showCommits = React.useCallback((e) => {
		const id = e.currentTarget.getAttribute("data-id");
		setCommits(id);
	}, []);

	const hideCommits = React.useCallback(() => {
		setCommits(null);
	}, []);

	const hideError = React.useCallback(() => {
		setShowError(false);
	}, []);

	React.useEffect(() => {
		// If there are no repos, fetch them
		if (!repos || repos.length === 0) {
			dispatch(thunks.repos.fetchRepos());
		}
	}, [repos, dispatch]);

	React.useEffect(() => {
		// Update the title if there is no modal open
		if (!commits) {
			// I considered adding Helmet to manage titles, but that
			// felt like massive overkill, even given the amount of
			// other overkill
			document.title = "Top Github Repos";
		}
	}, [commits]);

	React.useEffect(() => {
		if (error) {
			setShowError(true);
		} else {
			hideError();
		}
	}, [error, hideError]);

	return (
		<Paper
			sx={{
				padding: 4
			}}>
			<Typography variant="h5" sx={{ marginBottom: 4 }}>
				Top 100 Github Repos
			</Typography>
			<Grid
				container
				spacing={4}
				columns={{ xs: 4, sm: 8, md: 12, lg: 16, xl: 20 }}>
				{!repos || !repos.length
					? [...Array(30)].map((obj, idx) => {
							return <RepoCardSkeleton key={idx} />;
					  })
					: repos.map((repo) => {
							return (
								<RepoCard
									repo={repo}
									key={repo.id}
									showCommits={showCommits}
								/>
							);
					  })}
			</Grid>
			<CommitModal id={commits} closeModal={hideCommits} />
			<Snackbar
				open={showError}
				autoHideDuration={6000}
				onClose={hideError}>
				<Alert
					onClose={hideError}
					severity="error"
					sx={{ width: "100%" }}>
					{error && error.message}
				</Alert>
			</Snackbar>
		</Paper>
	);
}
