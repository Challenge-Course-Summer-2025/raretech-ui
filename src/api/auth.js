const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL ||
	"https://3k0nx7bmae.execute-api.ap-northeast-1.amazonaws.com/Prod";

// 認証付きのfetchリクエスト
export const authenticatedFetch = async (url, options = {}) => {
	const token = localStorage.getItem("id_token"); // ←ここをid_tokenに変更

	if (!token) {
		throw new Error("認証が必要です。ログインしてください。");
	}

	const headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
		...options.headers,
	};

	const response = await fetch(url, {
		...options,
		headers,
	});

	if (response.status === 401) {
		localStorage.removeItem("id_token"); // ここもid_tokenに
		throw new Error("認証が必要です。ログインしてください。");
	}

	return response;
};

// ログイン
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
	localStorage.setItem("access_token", data.access_token);

	return data;
};
