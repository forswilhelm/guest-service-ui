import { ThemeColorVariable, ThemeSpaceVariable } from "@caspeco/casper-ui-library.base-ui.theme";
import { Alert } from "@caspeco/casper-ui-library.components.alert";
import { Heading } from "@caspeco/casper-ui-library.components.heading";
import { List, ListItem } from "@caspeco/casper-ui-library.components.list";
import { Text } from "@caspeco/casper-ui-library.components.text";

export default function Home() {
	return (
		<>
			<Heading as="h1">Home page</Heading>
			<Text color={ThemeColorVariable.OnBackgroundSubdued}>You made it!</Text>
			<Alert type="info" marginTop={ThemeSpaceVariable.Medium}>
				Join the "RMS - Frontend" channel on Mattermost if you haven't already!
			</Alert>
			<Text marginTop={ThemeSpaceVariable.Medium} fontWeight="bold">
				Next steps
			</Text>
			<List paddingLeft={ThemeSpaceVariable.Medium}>
				<ListItem>1. Search for "TODO" in the source code and fix all occurrences</ListItem>
				<ListItem>
					2. Generate TypeScript types from your backend's Swagger file (see other RMS projects)
				</ListItem>
				<ListItem>3. Implement auth using the generated API client and SWR</ListItem>
			</List>
		</>
	);
}
