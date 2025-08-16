import { authenticatedFetch } from "./auth";

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const fetchMetricsData = async () => {
	try {
		const response = await authenticatedFetch(`${API_BASE_URL}/api/metrics`);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Failed to fetch metrics data:", error);
		throw error;
	}
};
