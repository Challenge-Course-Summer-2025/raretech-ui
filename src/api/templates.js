import { authenticatedFetch } from "./auth";

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// テンプレート一覧取得
export const fetchTemplates = async () => {
	try {
		const response = await authenticatedFetch(`${API_BASE_URL}/api/templates`);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Failed to fetch templates:", error);
		throw error;
	}
};

// テンプレート作成
export const createTemplate = async (templateData) => {
	try {
		const response = await authenticatedFetch(`${API_BASE_URL}/api/templates`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(templateData),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Failed to create template:", error);
		throw error;
	}
};

// テンプレート更新
export const updateTemplate = async (templateId, templateData) => {
	try {
		const response = await authenticatedFetch(
			`${API_BASE_URL}/api/templates/${templateId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(templateData),
			},
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Failed to update template:", error);
		throw error;
	}
};

// テンプレート削除
export const deleteTemplate = async (templateId) => {
	try {
		const response = await authenticatedFetch(
			`${API_BASE_URL}/api/templates/${templateId}`,
			{
				method: "DELETE",
			},
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Failed to delete template:", error);
		throw error;
	}
};
