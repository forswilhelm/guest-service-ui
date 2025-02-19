import Layout from "@/layout";
import { RouteObject } from "react-router-dom";
import Home from "./home";
import Example from "./example";
import GuestService from "./guestservice";

export const routes: RouteObject[] = [
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/example",
				element: <Example />,
			},
			{
				path: "/guest-service",
				element: <GuestService />,
			}
		],
	},
];
