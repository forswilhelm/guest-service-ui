import { Api } from "@/GuestApiTypes";

let api: Api<unknown>;
export const getGuestApi = () => {
	if (api) {
		return api;
	}

	api = new Api({
		baseUrl: "http://localhost:8083",
		baseApiParams: {
			headers: {
				system: "erics-test-system",
			},
			format: "json",
		},
	});
	return api;
};
