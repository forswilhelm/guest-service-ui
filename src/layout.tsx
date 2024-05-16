import { ThemeSpaceVariable } from "@caspeco/casper-ui-library.base-ui.theme";
import { Providers } from "./providers";
import { Outlet } from "react-router-dom";
import NavigationMenu from "@/components/navigation-menu";

export default function RootLayout() {
	return (
		<Providers>
			<div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
				<NavigationMenu />
				<main style={{ padding: ThemeSpaceVariable.Large, overflow: "auto" }}>
					<Outlet />
				</main>
			</div>
		</Providers>
	);
}
