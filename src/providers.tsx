import { ThemeProvider } from "@caspeco/casper-ui-library.base-ui.theme";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
	return <ThemeProvider>{children}</ThemeProvider>;
}
