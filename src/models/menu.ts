type MaybeJson<T> = T | string;

type IconPreset =
	| "Absence"
	| "Accessability" // (sic), taken from CasperUI 2.0
	| "AddAbsence"
	| "Apple"
	| "Apps"
	| "At"
	| "Baby"
	| "Back"
	| "Bank"
	| "BankID"
	| "Bell"
	| "Camera"
	| "Cancel"
	| "Card"
	| "Cart"
	| "Caspeco"
	| "Chart"
	| "ChartLine"
	| "ChartMixed"
	| "ChartPie"
	| "ChartScatter"
	| "Checkbox"
	| "Child"
	| "Circle-Info"
	| "Circle-Parking"
	| "Circle-User"
	| "Clear"
	| "Close"
	| "Closed"
	| "Color"
	| "Columns"
	| "Comment"
	| "Copy"
	| "Date"
	| "Decrease"
	| "Delete"
	| "Delivery"
	| "Discount"
	| "DistributeEvenly"
	| "Down"
	| "EatIn"
	| "Edit"
	| "Email"
	| "Error"
	| "Export"
	| "Facebook"
	| "File"
	| "Filter"
	| "Forward"
	| "Google"
	| "GripMore"
	| "Hash"
	| "Hide"
	| "Image"
	| "Import"
	| "Increase"
	| "Indeterminate"
	| "Info"
	| "Key"
	| "Language"
	| "LinkBroken"
	| "LinkExternal"
	| "ListOL"
	| "ListUL"
	| "Loading"
	| "Lock"
	| "LogIn"
	| "LogOut"
	| "Map"
	| "Members"
	| "Menu"
	| "Message"
	| "Minimize"
	| "Module-AiForecast"
	| "Module-App"
	| "Module-Articles"
	| "Module-Benchmark"
	| "Module-Booking"
	| "Module-Campaigns"
	| "Module-Cashier"
	| "Module-Communication"
	| "Module-Dashboard"
	| "Module-Document"
	| "Module-Employees"
	| "Module-History"
	| "Module-Insights"
	| "Module-Kds"
	| "Module-Members"
	| "Module-Menus"
	| "Module-MyCity"
	| "Module-NotificationCenter"
	| "Module-OnlineOrder"
	| "Module-Pos"
	| "Module-Result"
	| "Module-Salary"
	| "Module-Schedule"
	| "Module-Settings"
	| "Module-SettingsAlt"
	| "Module-Support"
	| "Module-Survey"
	| "Module-TableMap"
	| "Module-Time"
	| "Module-Tip"
	| "Module-Tools"
	| "Module-TopList"
	| "Module-Web"
	| "Module-WebCharts"
	| "MoreHorizontal"
	| "MoreVertical"
	| "Nfc"
	| "Open"
	| "OpenModal"
	| "Parking"
	| "Payment-Card"
	| "Payment-Cash"
	| "Payment-Generic"
	| "Payment-Giftcard"
	| "Payment-Hotel"
	| "Payment-Invoice"
	| "Pin"
	| "PinMap"
	| "Print"
	| "Privacy"
	| "QrCode"
	| "Radio"
	| "Receipt"
	| "Refund"
	| "Remove"
	| "Search"
	| "Select"
	| "Send"
	| "Share"
	| "Show"
	| "Shuffle"
	| "Sliders"
	| "SlightlySad"
	| "SortAsc"
	| "SortDesc"
	| "Split"
	| "Success"
	| "Sweat"
	| "Table"
	| "TableMap"
	| "TakeAway"
	| "Talk"
	| "Thumbtack"
	| "Time"
	| "Timeline"
	| "Tip"
	| "Translate"
	| "TrendDown"
	| "TrendUp"
	| "Undo"
	| "Unlock"
	| "Up"
	| "User"
	| "UserGroup"
	| "Users"
	| "UserWait"
	| "Volume"
	| "VolumeHigh"
	| "VolumeLow"
	| "VolumeOff"
	| "Warning"
	| "Wifi"
	| "WifiOff";

export interface NavigationMenuProps {
	currentLocation: string;
	top: MaybeJson<NavigationItemProps[]>;
	items: MaybeJson<NavigationItemProps[]>;
	sharedResources: MaybeJson<NavigationItemProps[]>;
	bottom: MaybeJson<NavigationItemProps[]>;
	systemSelector?: MaybeJson<unknown>;
	showMenuToggle?: MaybeJson<boolean>;
}

export interface NavigationItemProps {
	id?: string;
	text: string;
	icon?: IconPreset;
	href?: string;
	subItems?: NavigationItemProps[];
	open?: boolean;
	isActiveUrlPattern?: string;
	notifications?: number;
}
