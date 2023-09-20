import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Note that StrictMode in dev will cause the API to fire twice
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
