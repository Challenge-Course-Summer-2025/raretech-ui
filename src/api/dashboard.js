import { authenticatedFetch } from "./auth";

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL ||
	"https://3k0nx7bmae.execute-api.ap-northeast-1.amazonaws.com/Prod";

export const fetchDashboardData = async () => {
	try {
		const response = await authenticatedFetch(
			`${API_BASE_URL}/api/dashboard/dashboard`,
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Failed to fetch dashboard data:", error);
		throw error;
	}
};
