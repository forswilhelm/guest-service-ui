import { ThemeProvider } from "@caspeco/casper-ui-library.base-ui.theme";
import { ReactNode } from "react";
import { SWRConfig } from "swr";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<SWRConfig value={{ revalidateOnFocus: false }}>
			<ThemeProvider>{children}</ThemeProvider>
		</SWRConfig>
	);
}
