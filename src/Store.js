import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as Repos from "./pages/repos/store";

// A little silly, given that we only have one slice, but room to grow
// I also like passing along the thunks and selectors into this, so nothing
// has to include the page-specific slice stuff

const rootReducer = combineReducers({
	repos: Repos.slice.reducer
});

// Including preloadedState here for future testing
export const setupStore = (preloadedState) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState
	});
};

export const thunks = {
	repos: Repos.thunks
};

export const selectors = {
	repos: Repos.selectors
};
