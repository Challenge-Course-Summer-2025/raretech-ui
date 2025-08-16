import { authenticatedFetch } from "./auth";

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const fetchXPostHistoryData = async (page = 1, limit = 10) => {
	try {
		const params = new URLSearchParams({
			page: page.toString(),
			limit: limit.toString(),
		});

		const response = await authenticatedFetch(
			`${API_BASE_URL}/api/posts?${params}`,
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Failed to fetch XPost history data:", error);
		throw error;
	}
};
