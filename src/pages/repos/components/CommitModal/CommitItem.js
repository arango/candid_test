import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function CommitItem({ commit }) {
	const dt =
		commit.commit && commit.commit.committer
			? new Date(commit.commit.committer.date)
			: null;
	return (
		<Stack spacing={0}>
			<Typography variant="body1" key="author">
				{commit.author && commit.author.login}
			</Typography>

			{dt && (
				<Typography
					key="date"
					variant="body2"
					sx={{ fontStyle: "italic" }}>
					{`${dt.toLocaleDateString(
						"en-us"
					)} ${dt.toLocaleTimeString("en-us")}`}
				</Typography>
			)}

			{commit.commit && (
				<Typography variant="body2" key="msg">
					{`${commit.commit.message}`}
				</Typography>
			)}
		</Stack>
	);
}
