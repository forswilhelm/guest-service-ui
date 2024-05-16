enum Environment {
	prod = "prod",
	dev = "dev",
	stage = "stage",
}

interface Config {
	environment: Environment;
	menuBaseUrl: string;
	apiBaseUrl: string;
}

function getEnvironment(name?: string): Environment {
	switch (name) {
		case "prod":
			return Environment.prod;
		case "dev":
			return Environment.dev;
		case "stage":
			return Environment.stage;
		default:
			throw new Error(`Unknown environment name: ${name}`);
	}
}

const config: Config = {
	environment: getEnvironment(import.meta.env.VITE_ENV_NAME),
	menuBaseUrl: import.meta.env.VITE_MENU_URL,
	apiBaseUrl: import.meta.env.VITE_API_URL,
};

export default config;
