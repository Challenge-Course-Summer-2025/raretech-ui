import { authenticatedFetch } from "./auth";

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const fetchDashboardData = async () => {
	try {
		console.log(
			"Fetching dashboard data from:",
			`${API_BASE_URL}/api/dashboard`,
		);

		const response = await authenticatedFetch(`${API_BASE_URL}/api/dashboard`, {
			method: "GET",
			signal: AbortSignal.timeout(30000),
		});

		console.log("Dashboard response status:", response.status);

		if (!response.ok) {
			const errorText = await response.text().catch(() => "Unknown error");
			console.error("Dashboard API error:", {
				status: response.status,
				statusText: response.statusText,
				errorText: errorText,
			});

			if (response.status === 404) {
				throw new Error(
					"ダッシュボードエンドポイントが見つかりません。APIサーバーの設定を確認してください。",
				);
			} else if (response.status >= 500) {
				throw new Error(
					"サーバーエラーが発生しました。しばらく時間をおいてお試しください。",
				);
			} else {
				throw new Error(
					`HTTP error! status: ${response.status} - ${errorText}`,
				);
			}
		}

		// Content-Typeをチェック
		const contentType = response.headers.get("content-type");
		if (!contentType || !contentType.includes("application/json")) {
			console.warn("Unexpected content type:", contentType);
			const text = await response.text();
			console.log("Response text:", text);
			throw new Error("サーバーから予期しない形式のレスポンスが返されました");
		}

		const data = await response.json();
		console.log("Dashboard data received:", data);
		return data;
	} catch (error) {
		console.error("Failed to fetch dashboard data:", error);

		if (error.name === "AbortError") {
			throw new Error(
				"リクエストがタイムアウトしました。ネットワーク接続を確認してください。",
			);
		} else if (
			error.message.includes("Failed to fetch") ||
			error.message.includes("ERR_NETWORK")
		) {
			throw new Error(
				"ネットワークエラーです。APIサーバー（http://localhost:8000）が起動していることを確認してください。",
			);
		} else if (error.message.includes("ERR_EMPTY_RESPONSE")) {
			throw new Error(
				"APIサーバーから応答がありません。サーバーの状態を確認してください。",
			);
		}

		throw error;
	}
};

// デバッグ用(APIサーバーの健康状態をチェック)
export const checkAPIHealth = async () => {
	try {
		console.log("Checking API health...");
		const response = await fetch(`${API_BASE_URL}/health`, {
			method: "GET",
			signal: AbortSignal.timeout(5000),
		});

		console.log("Health check response:", {
			status: response.status,
			ok: response.ok,
			headers: Object.fromEntries(response.headers),
		});

		return response.ok;
	} catch (error) {
		console.error("API health check failed:", error);
		return false;
	}
};
