import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import StarIcon from "@mui/icons-material/Star";

export default function RepoCard({ repo, showCommits }) {
	return (
		<Grid item="true" xs={4}>
			<Card sx={{}} elevation={3}>
				<CardContent>
					<Typography
						gutterBottom
						variant="h5"
						component="div"
						data-testid="repo-name">
						{repo.name}
					</Typography>
					<Typography variant="body2">
						<a
							href={repo.svn_url}
							target="_blank"
							rel="noreferrer">
							{repo.svn_url}
						</a>
					</Typography>
					<Stack direction="row" alignItems="center" spacing={1}>
						<StarIcon />
						<Typography
							variant="body2"
							data-testid="repo-star-count"
							color="text.secondary">
							{repo.stargazers_count.toLocaleString()}
						</Typography>
					</Stack>
				</CardContent>
				<CardActions>
					<Button
						size="small"
						onClick={showCommits}
						data-testid="repo-commits-button"
						data-id={repo.id}>
						Recent Commits
					</Button>
				</CardActions>
			</Card>
		</Grid>
	);
}
