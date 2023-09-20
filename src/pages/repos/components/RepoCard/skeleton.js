import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Unstable_Grid2";

export default function RepoCardSkeleton() {
	return (
		<Grid item="true" xs={4}>
			<Card
				sx={{
					height: 160
				}}
				elevation={3}>
				<Skeleton variant="rounded" width="100%" height={160} />
			</Card>
		</Grid>
	);
}
