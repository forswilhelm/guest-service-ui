import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "@/routes/routes";

const router = createBrowserRouter(routes, {
	basename: "/TODO_REPLACE_ME",
});

export default function App() {
	return <RouterProvider router={router} />;
}
