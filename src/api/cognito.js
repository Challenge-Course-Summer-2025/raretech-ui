import { Amplify } from "aws-amplify";
import {
	signIn,
	fetchAuthSession,
	confirmSignIn,
	signOut,
} from "aws-amplify/auth";

// Amplifyの設定
Amplify.configure({
	Auth: {
		Cognito: {
			region: import.meta.env.VITE_AWS_REGION,
			userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
			userPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID,
		},
	},
});

/**
 * 現在のセッションをクリアする
 * @returns {Promise<void>}
 */
export const clearCurrentSession = async () => {
	try {
		await signOut();
		// セッションストレージもクリア
		sessionStorage.removeItem("accessToken");
		sessionStorage.removeItem("idToken");
		sessionStorage.removeItem("refreshToken");
	} catch (error) {
		console.error("Clear session error:", error);
		// エラーが発生してもセッションストレージはクリア
		sessionStorage.removeItem("accessToken");
		sessionStorage.removeItem("idToken");
		sessionStorage.removeItem("refreshToken");
	}
};

/**
 * ログイン処理
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>}
 */
export const loginUser = async (email, password) => {
	try {
		// 既存のセッションがある場合はクリア
		await clearCurrentSession();

		const result = await signIn({
			username: email,
			password: password,
		});

		console.log("Sign in result:", result); // デバッグ用

		// ログイン成功の場合、トークンを取得
		if (result.isSignedIn) {
			const session = await fetchAuthSession();

			return {
				success: true,
				accessToken: session.tokens?.accessToken?.toString(),
				idToken: session.tokens?.idToken?.toString(),
				refreshToken: session.tokens?.refreshToken?.toString(),
				user: result.user,
			};
		}

		// 追加の認証が必要になったとき（パスワード変更）
		if (
			result.nextStep?.signInStep ===
			"CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
		) {
			return {
				success: false,
				requiresNewPassword: true,
				nextStep: result.nextStep,
				// Amplify v6では、signInの結果をそのまま保持する必要がある
				signInResult: result,
				// 必要な属性情報も保持
				requiredAttributes: result.nextStep?.missingAttributes || [],
			};
		}

		// MFA認証が必要な場合
		if (
			result.nextStep?.signInStep === "CONFIRM_SIGN_IN_WITH_SMS_CODE" ||
			result.nextStep?.signInStep === "CONFIRM_SIGN_IN_WITH_TOTP_CODE"
		) {
			return {
				success: false,
				requiresMFA: true,
				nextStep: result.nextStep,
				signInResult: result,
			};
		}

		// その他の認証ステップ
		console.log("Unexpected sign in step:", result.nextStep?.signInStep);
		return {
			success: false,
			error: `予期せぬ認証ステップが要求されました: ${result.nextStep?.signInStep || "Unknown"}`,
			nextStep: result.nextStep,
			signInResult: result,
		};
	} catch (error) {
		console.error("Login error:", error);

		// UserAlreadyAuthenticatedExceptionの場合は特別な処理
		if (error.name === "UserAlreadyAuthenticatedException") {
			try {
				// 既存のセッションをクリアして再試行
				await clearCurrentSession();

				// 少し待ってから再試行
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const retryResult = await signIn({
					username: email,
					password: password,
				});

				if (retryResult.isSignedIn) {
					const session = await fetchAuthSession();
					return {
						success: true,
						accessToken: session.tokens?.accessToken?.toString(),
						idToken: session.tokens?.idToken?.toString(),
						refreshToken: session.tokens?.refreshToken?.toString(),
						user: retryResult.user,
					};
				}

				return {
					success: false,
					error: "ログインに失敗しました。再度お試しください。",
				};
			} catch (retryError) {
				console.error("Retry login error:", retryError);
				return {
					success: false,
					error:
						"セッションの問題が発生しました。ページを再読み込みしてお試しください。",
				};
			}
		}

		// エラーを日本語メッセージに変換
		return {
			success: false,
			error: getJapaneseErrorMessage(error),
		};
	}
};

/**
 * 初回ログイン時のパスワード変更処理
 * @param {string} newPassword
 * @param {Object} userAttributes
 * @returns {Promise<Object>}
 */
export const completeNewPassword = async (newPassword, userAttributes = {}) => {
	try {
		// confirmSignInの呼び出し
		const confirmSignInParams = {
			challengeResponse: newPassword,
		};

		// 必要な属性がある場合は追加
		if (userAttributes && Object.keys(userAttributes).length > 0) {
			confirmSignInParams.options = {
				userAttributes: userAttributes,
			};
		}

		const result = await confirmSignIn(confirmSignInParams);

		if (result.isSignedIn) {
			const session = await fetchAuthSession();
			return {
				success: true,
				accessToken: session.tokens?.accessToken?.toString(),
				idToken: session.tokens?.idToken?.toString(),
				refreshToken: session.tokens?.refreshToken?.toString(),
				user: result.user,
				isNewPasswordComplete: true, // パスワード変更完了フラグ
			};
		}

		// まだ他のステップが必要な場合
		if (result.nextStep) {
			return {
				success: false,
				error: `追加の認証ステップが必要です: ${result.nextStep.signInStep}`,
				nextStep: result.nextStep,
				signInResult: result,
			};
		}

		return {
			success: false,
			error: "パスワード変更に失敗しました。",
		};
	} catch (error) {
		console.error("Password change error:", error);

		// 特定のエラーに対する詳細な処理
		if (
			error.name === "InvalidParameterException" &&
			error.message.includes("name is missing")
		) {
			return {
				success: false,
				error: "ユーザー名の設定が必要です。管理者にお問い合わせください。",
				requiresUserAttributes: true,
				missingAttribute: "name",
			};
		}

		return {
			success: false,
			error: getJapaneseErrorMessage(error),
		};
	}
};

/**
 * 必要な属性を含む新しいパスワード設定処理
 * @param {string} newPassword
 * @param {string} name
 * @returns {Promise<Object>}
 */
export const completeNewPasswordWithName = async (newPassword, name) => {
	const userAttributes = {};

	if (name && name.trim()) {
		userAttributes.name = name.trim();
	}

	return await completeNewPassword(newPassword, userAttributes);
};

/**
 * MFA認証コード確認処理
 * @param {string} code
 * @returns {Promise<Object>}
 */
export const confirmMFACode = async (code) => {
	try {
		const result = await confirmSignIn({
			challengeResponse: code,
		});

		if (result.isSignedIn) {
			const session = await fetchAuthSession();
			return {
				success: true,
				accessToken: session.tokens?.accessToken?.toString(),
				idToken: session.tokens?.idToken?.toString(),
				refreshToken: session.tokens?.refreshToken?.toString(),
				user: result.user,
			};
		}

		return {
			success: false,
			error: "MFA認証に失敗しました。",
			nextStep: result.nextStep,
		};
	} catch (error) {
		console.error("MFA confirmation error:", error);
		return {
			success: false,
			error: getJapaneseErrorMessage(error),
		};
	}
};

/**
 * ログアウト処理
 * @returns {Promise<Object>}
 */
export const logoutUser = async () => {
	try {
		await signOut();
		// セッションストレージもクリア
		sessionStorage.removeItem("accessToken");
		sessionStorage.removeItem("idToken");
		sessionStorage.removeItem("refreshToken");
		return {
			success: true,
		};
	} catch (error) {
		console.error("Logout error:", error);
		// エラーが発生してもセッションストレージはクリア
		sessionStorage.removeItem("accessToken");
		sessionStorage.removeItem("idToken");
		sessionStorage.removeItem("refreshToken");
		return {
			success: false,
			error: getJapaneseErrorMessage(error),
		};
	}
};

/**
 * 現在の認証状態を確認
 * @returns {Promise<boolean>}
 */
export const isAuthenticated = async () => {
	try {
		const session = await fetchAuthSession();
		return session.tokens?.accessToken != null;
	} catch (error) {
		console.error("Auth check error:", error);
		return false;
	}
};

/**
 * 現在のセッション情報を取得
 * @returns {Promise<Object|null>}
 */
export const getCurrentSession = async () => {
	try {
		const session = await fetchAuthSession();

		if (session.tokens?.accessToken) {
			return {
				accessToken: session.tokens.accessToken.toString(),
				idToken: session.tokens.idToken?.toString(),
				refreshToken: session.tokens.refreshToken?.toString(),
				isValid: true,
			};
		}

		return null;
	} catch (error) {
		console.error("Session error:", error);
		return null;
	}
};

/**
 * 現在のユーザー情報を取得
 * @returns {Promise<Object|null>}
 */
export const getCurrentUser = async () => {
	try {
		const session = await fetchAuthSession();

		if (session.tokens?.idToken) {
			// IDトークンからユーザー情報を取得
			const payload = JSON.parse(
				atob(session.tokens.idToken.toString().split(".")[1]),
			);
			return {
				sub: payload.sub,
				email: payload.email,
				email_verified: payload.email_verified,
				name: payload.name,
				// その他の属性も必要に応じて追加する
			};
		}

		return null;
	} catch (error) {
		console.error("Get current user error:", error);
		return null;
	}
};

/**
 * Cognitoエラーを日本語メッセージに変換
 * @param {Error} error
 * @returns {string}
 */
const getJapaneseErrorMessage = (error) => {
	const errorCode = error.name || error.code;

	console.error("Error details:", {
		name: error.name,
		code: error.code,
		message: error.message,
		error: error,
	}); // デバッグ用

	switch (errorCode) {
		case "UserNotFoundException":
		case "NotAuthorizedException":
			return "メールアドレスまたはパスワードが正しくありません。";

		case "UserNotConfirmedException":
			return "アカウントが確認されていません。管理者にお問い合わせください。";

		case "TooManyRequestsException":
			return "ログイン試行回数が上限を超えました。しばらく時間をおいてからお試しください。";

		case "InvalidParameterException":
			if (error.message && error.message.includes("name is missing")) {
				return "ユーザー名の設定が必要です。管理者にお問い合わせください。";
			}
			return "入力内容に不正な値が含まれています。";

		case "NetworkError":
			return "ネットワークエラーが発生しました。インターネット接続を確認してください。";

		case "InvalidPasswordException":
			return "パスワードの形式が正しくありません。要件を確認してください。";

		case "LimitExceededException":
			return "リクエスト制限に達しました。しばらく時間をおいてからお試しください。";

		case "CodeMismatchException":
			return "認証コードが正しくありません。";

		case "ExpiredCodeException":
			return "認証コードの有効期限が切れています。";

		case "TooManyFailedAttemptsException":
			return "認証の試行回数が上限を超えました。しばらく時間をおいてからお試しください。";

		case "UserAlreadyAuthenticatedException":
			return "すでにログインしているユーザーがいます。ページを再読み込みしてお試しください。";

		default:
			return (
				error.message ||
				"ログインに失敗しました。しばらく時間をおいてからお試しください。"
			);
	}
};
