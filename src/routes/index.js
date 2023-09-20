import Repos from "../pages/repos";
import {
	Outlet,
	RouterProvider,
	Router,
	Route,
	RootRoute
} from "@tanstack/react-router";

const rootRoute = new RootRoute({
	component: Root
});

function Root() {
	return (
		<>
			<Outlet />
		</>
	);
}

// We only have the one route here, so we don't really need this at all,
// but you wanted it designed to expand
const repoRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "/",
	component: Repos
});

const routeTree = rootRoute.addChildren([repoRoute]);

const router = new Router({ routeTree });

export default function Routes() {
	return <RouterProvider router={router} />;
}
