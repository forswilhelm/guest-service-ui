import { ThemeSpaceVariable } from "@caspeco/casper-ui-library.base-ui.theme";
import { Providers } from "./providers";
import { Outlet } from "react-router-dom";
import NavigationMenu from "@/components/navigation-menu";
import { Flex } from "@caspeco/casper-ui-library.components.flex";
import { Box } from "@caspeco/casper-ui-library.components.box";

export default function RootLayout() {
	return (
		<Providers>
			<Flex height="100%">
				<NavigationMenu />
				<Box as="main" padding={ThemeSpaceVariable.Large} overflow="auto">
					<Outlet />
				</Box>
			</Flex>
		</Providers>
	);
}
