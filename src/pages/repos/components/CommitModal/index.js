import React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import { useSelector, useDispatch } from "react-redux";
import { thunks, selectors } from "../../../../Store";
import CommitItem from "./CommitItem";

export default function CommitModal(props) {
	const dispatch = useDispatch();

	const repo = useSelector((state) =>
		selectors.repos.selectCommits(state, props.id)
	);

	React.useEffect(() => {
		if (repo) {
			document.title = `Info for ${repo.name}`;
			if (!repo.commits) {
				// If there is no commit data in the repo, get it from the API
				dispatch(
					thunks.repos.fetchCommits({
						owner: repo.owner.login,
						repo: repo.name
					})
				);
			}
		}
	}, [repo, dispatch]);

	return (
		<Modal
			open={repo !== null}
			onClose={props.closeModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description">
			<>
				{repo && (
					<Box
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							width: 400,
							bgcolor: "background.paper",
							border: "2px solid #000",
							boxShadow: 24,
							p: 4
						}}>
						<Typography
							id="modal-modal-title"
							variant="h6"
							key="title"
							component="h2">
							Recent Commits: {repo.name}
						</Typography>
						{repo.commits ? (
							repo.commits.length ? (
								<Stack
									spacing={2}
									sx={{
										maxHeight: "50vh",
										overflowY: "auto"
									}}
									divider={
										<Divider
											orientation="horizontal"
											flexItem
										/>
									}>
									{repo.commits.map((commit) => {
										return (
											<CommitItem
												commit={commit}
												key={commit.sha}
											/>
										);
									})}
								</Stack>
							) : (
								<Typography key="desc" variant="body1">
									No commits in the last 24 hours
								</Typography>
							)
						) : (
							<Skeleton variant="text" width="100%" />
						)}
					</Box>
				)}
			</>
		</Modal>
	);
}
