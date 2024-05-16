import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import rg4js from "raygun4js";
import config from "./config.ts";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);

// Setup Raygun
rg4js("apiKey", "TODO_REPLACE_ME");
rg4js("enableCrashReporting", true);
rg4js("withTags", [String(config.environment)]);
rg4js("options", {
	excludedHostnames: ["localhost"],
	ignoreAjaxError: true,
	ignore3rdPartyErrors: true,
});
