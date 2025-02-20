import Layout from "@/layout";
import { RouteObject } from "react-router-dom";
import Home from "./home";
import GuestService from "./guestservice";

export const routes: RouteObject[] = [
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/guest-service",
				element: <GuestService />,
			}
		],
	},
];
