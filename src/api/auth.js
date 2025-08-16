const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// 認証付きのfetchリクエスト
export const authenticatedFetch = async (url, options = {}) => {
	// まずCognitoのIDトークンを確認
	let token =
		sessionStorage.getItem("accessToken") || sessionStorage.getItem("idToken");

	if (!token) {
		// Cognitoセッションから取得を試行
		try {
			const { getCurrentSession } = await import("./cognito");
			const session = await getCurrentSession();
			if (session && session.idToken) {
				token = session.idToken;
			} else if (session && session.accessToken) {
				token = session.accessToken;
			}
		} catch (error) {
			console.error("Failed to get Cognito session:", error);
		}
	}

	if (!token) {
		throw new Error("認証が必要です。ログインしてください。");
	}

	const headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
		...options.headers,
	};

	console.log("Making authenticated request to:", url);
	console.log("Using token:", token.substring(0, 20) + "...");

	try {
		const response = await fetch(url, {
			...options,
			headers,
		});

		console.log("Response status:", response.status);
		console.log("Response headers:", Object.fromEntries(response.headers));

		if (response.status === 401) {
			// トークンが無効な場合はクリア
			sessionStorage.removeItem("accessToken");
			sessionStorage.removeItem("idToken");
			sessionStorage.removeItem("refreshToken");
			throw new Error("認証が必要です。ログインしてください。");
		}

		const contentLength = response.headers.get("content-length");
		if (contentLength === "0" || contentLength === null) {
			console.warn("Empty response received");
			throw new Error("サーバーから空のレスポンスが返されました");
		}

		return response;
	} catch (error) {
		console.error("Authenticated fetch error:", error);

		// ネットワークエラーまたはサーバーエラーの場合
		if (error.name === "TypeError" && error.message.includes("fetch")) {
			throw new Error(
				"サーバーに接続できませんでした。APIサーバーが起動していることを確認してください。",
			);
		}

		throw error;
	}
};

export const login = async (email, password) => {
	const formData = new FormData();
	formData.append("username", email);
	formData.append("password", password);
	const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
		method: "POST",
		body: formData,
	});
	if (!response.ok) {
		if (response.status === 401) {
			throw new Error("メールアドレスまたはパスワードが間違っています");
		}
		throw new Error("ログインに失敗しました");
	}
	const data = await response.json();
	sessionStorage.setItem("accessToken", data.accessToken);
	return data;
};
