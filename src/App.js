import React from "react";
import Routes from "./routes";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { setupStore } from "./Store";

function App() {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? "dark" : "light"
				},
				typography: {}
			}),
		[prefersDarkMode]
	);

	const store = setupStore();

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Routes />
			</ThemeProvider>
		</Provider>
	);
}

export default App;
