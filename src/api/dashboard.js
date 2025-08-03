const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

export const fetchDashboardData = async () => {
	try {
		const response = await fetch(`${API_BASE_URL}/api/dashboard/`);

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
