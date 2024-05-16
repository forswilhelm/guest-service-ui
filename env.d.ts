/// <reference types="vite/client" />

import { NavigationMenuProps } from "@/models/menu";

declare global {
	namespace JSX {
		interface IntrinsicElements {
			"caspeco-navigation-menu": NavigationMenuProps & React.DOMAttributes<HTMLElement>;
		}
	}
}
