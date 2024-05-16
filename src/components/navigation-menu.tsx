import { useNavigation } from "@/hooks/use-navigation";
import { useEffect } from "react";
import config from "@/config";

export default function NavigationMenu() {
	const { handleNavigation, navigation } = useNavigation();

	useEffect(() => {
		if (document.getElementById("caspeco-webcomponents")) return;

		const script = document.createElement("script");
		script.id = "caspeco-webcomponents";
		script.src = `${config.menuBaseUrl}/v1/index.js`;
		script.type = "module";
		document.head.appendChild(script);
	}, []);

	return (
		<caspeco-navigation-menu
			onClick={handleNavigation}
			{...navigation}
			showMenuToggle={true}
		></caspeco-navigation-menu>
	);
}
