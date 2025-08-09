import { Auth } from "aws-amplify";

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL ||
	"https://9bhgi68n14.execute-api.ap-northeast-1.amazonaws.com/Prod";

// 認証付きのfetchリクエスト
export const authenticatedFetch = async (url, options = {}) => {
	const token = localStorage.getItem("access_token");

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
		localStorage.removeItem("access_token");
		throw new Error("認証が必要です。ログインしてください。");
	}

	return response;
};

// ログイン
export const login = async (email, password) => {
	try {
		const user = await Auth.signIn(email, password);
		const session = await Auth.currentSession();
		const idToken = session.getIdToken().getJwtToken();
		localStorage.setItem("access_token", idToken);
		return user;
	} catch (error) {
		if (error.code === "NotAuthorizedException") {
			throw new Error("メールアドレスまたはパスワードが間違っています");
		}
		throw new Error("ログインに失敗しました");
	}
};
