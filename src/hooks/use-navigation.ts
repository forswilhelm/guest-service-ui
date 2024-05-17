import { NavigationMenuProps, NavigationItemProps } from "@/models/menu";
import { MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const isExternalLink = (href: string) => {
	return href.startsWith("http");
};

export const useNavigation = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const getTopNavigationItems = (): NavigationItemProps[] => {
		return [
			{
				text: "Någon Användare",
				href: "#",
				icon: "User",
			},
		];
	};

	const getNavigationItems = (): NavigationItemProps[] => [
		{
			text: "Home",
			href: "/",
			icon: "Module-Dashboard",
			isActiveUrlPattern: "/(?!.)",
		},
		{
			text: "Example",
			href: "/example",
			icon: "Remove",
		},
	];

	const getSharedResources = (): NavigationItemProps[] => {
		return [
			{
				text: "Access Management",
				href: "https://rms.dev.caspeco.net/access/",
				icon: "Key",
			},
			{
				text: "Customer Connect",
				href: "https://rms.dev.caspeco.net/customerconnect/",
				icon: "Module-Employees",
			},
			{
				text: "PRIM",
				href: "https://rms.dev.caspeco.net/prim/",
				icon: "Module-Articles",
			},
		];
	};

	const getBottomNavigationItems = (): NavigationItemProps[] => [
		{
			text: "Inställningar",
			icon: "Module-Settings",
			open: true,
			subItems: [
				{
					text: "Logga ut",
					id: "logout",
				},
			],
		},
	];

	const navigation: NavigationMenuProps = {
		top: getTopNavigationItems(),
		bottom: getBottomNavigationItems(),
		items: getNavigationItems(),
		sharedResources: getSharedResources(),
		currentLocation: location.pathname,
	};

	const handleNavigation = (e: MouseEvent<HTMLElement>) => {
		if (!(e.target instanceof Element)) return;
		const clickable = e.target.closest("a") || e.target.closest("button");
		const href = clickable?.getAttribute("href");
		const id = clickable?.getAttribute("id");

		if (id) {
			e.preventDefault();
			e.stopPropagation();

			switch (id) {
				case "logout":
					console.log("TODO: Implement log out here");
					return;
			}
		}

		if (!href) {
			return;
		}

		if (!isExternalLink(href) && href.startsWith("/")) {
			e.stopPropagation();
			e.preventDefault();
			navigate(href);
		}
	};

	navigation.top = JSON.stringify(navigation.top);
	navigation.items = JSON.stringify(navigation.items);
	navigation.sharedResources = JSON.stringify(navigation.sharedResources);
	navigation.bottom = JSON.stringify(navigation.bottom);

	return { navigation, handleNavigation };
};
