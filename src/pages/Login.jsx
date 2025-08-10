import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import RareTECH from "../assets/raretech.png";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import {
	loginUser,
	completeNewPassword,
	completeNewPasswordWithName,
	confirmMFACode,
	clearCurrentSession,
} from "../api/cognito";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [userName, setUserName] = useState("");
	const [mfaCode, setMfaCode] = useState("");
	const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
	const [showMFAForm, setShowMFAForm] = useState(false);
	const [requiresUserName, setRequiresUserName] = useState(false);
	const [mfaType, setMfaType] = useState(""); // SMS or TOTP
	const [signInResult, setSignInResult] = useState(null);

	const navigate = useNavigate();

	// コンポーネントマウント時のセッションクリアを削除,認証成功後にセッションをクリアしないようにする
	useEffect(() => {
		console.log("LoginPage component mounted");
	}, []);

	// 認証成功時のリダイレクト処理を関数として分離
	const handleAuthSuccess = (result) => {
		console.log("Authentication successful, handling redirect...", result);

		// トークンをセッションストレージに保存
		if (result.accessToken) {
			sessionStorage.setItem("accessToken", result.accessToken);
			console.log("Access token saved to sessionStorage");
		}
		if (result.idToken) {
			sessionStorage.setItem("idToken", result.idToken);
			console.log("ID token saved to sessionStorage");
		}
		if (result.refreshToken) {
			sessionStorage.setItem("refreshToken", result.refreshToken);
			console.log("Refresh token saved to sessionStorage");
		}

		// リダイレクト処理
		console.log("Navigating to dashboard...");
		try {
			navigate("/", { replace: true });
			console.log("Navigation completed");
		} catch (navError) {
			console.error("Navigation error:", navError);
			window.location.href = "/";
		}
	};

	const handleLoginSubmit = async (e) => {
		e?.preventDefault();

		const formErrors = validateForm();
		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			return;
		}

		setIsLoading(true);
		setErrors({});

		try {
			console.log("Starting login process...");
			// Cognitoでログイン
			const result = await loginUser(email, password);
			console.log("Login result:", result);

			if (result.success) {
				console.log("Login successful, processing redirect...");
				handleAuthSuccess(result);
			} else if (result.requiresNewPassword) {
				console.log("New password required");
				// 初回ログインでパスワード変更が必要な場合
				setErrors({
					submit: "初回ログインです。新しいパスワードを設定してください。",
				});
				setSignInResult(result.signInResult);

				// 必要な属性があるかチェック
				if (
					result.requiredAttributes &&
					result.requiredAttributes.includes("name")
				) {
					setRequiresUserName(true);
				}

				setShowNewPasswordForm(true);
			} else if (result.requiresMFA) {
				console.log("MFA required");
				// MFA認証が必要な場合
				const mfaStep = result.nextStep.signInStep;
				if (mfaStep === "CONFIRM_SIGN_IN_WITH_SMS_CODE") {
					setMfaType("SMS");
					setErrors({
						submit: "SMSに送信された認証コードを入力してください。",
					});
				} else if (mfaStep === "CONFIRM_SIGN_IN_WITH_TOTP_CODE") {
					setMfaType("TOTP");
					setErrors({
						submit: "認証アプリの認証コードを入力してください。",
					});
				}
				setSignInResult(result.signInResult);
				setShowMFAForm(true);
			} else {
				console.log("Login failed:", result.error);
				setErrors({
					submit:
						result.error ||
						"ログインに失敗しました。管理者にお問い合わせください。",
				});
			}
		} catch (error) {
			console.error("Login submit error:", error);
			setErrors({
				submit: error.message || "予期しないエラーが発生しました。",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleNewPasswordSubmit = async (e) => {
		e?.preventDefault();

		setIsLoading(true);
		setErrors({});

		// パスワード確認
		if (newPassword !== confirmPassword) {
			setErrors({ submit: "新しいパスワードが一致しません。" });
			setIsLoading(false);
			return;
		}

		// パスワード強度チェック
		const passwordErrors = validateNewPassword(newPassword);
		if (passwordErrors.length > 0) {
			setErrors({ submit: passwordErrors.join(" ") });
			setIsLoading(false);
			return;
		}

		// ユーザー名が必要な場合のチェック
		if (requiresUserName && !userName.trim()) {
			setErrors({ submit: "ユーザー名を入力してください。" });
			setIsLoading(false);
			return;
		}

		try {
			console.log("Starting new password completion...");
			let result;

			// ユーザー名が必要な場合は専用の関数を使用
			if (requiresUserName) {
				result = await completeNewPasswordWithName(newPassword, userName);
			} else {
				result = await completeNewPassword(newPassword);
			}

			console.log("New password completion result:", result);

			if (result.success) {
				console.log("New password set successfully, processing redirect...");
				handleAuthSuccess(result);
			} else if (result.requiresUserAttributes) {
				// ユーザー属性が必要な場合
				setRequiresUserName(true);
				setErrors({ submit: result.error || "ユーザー名の設定が必要です。" });
			} else {
				setErrors({ submit: result.error || "パスワード変更に失敗しました。" });
			}
		} catch (error) {
			console.error("New password submit error:", error);
			setErrors({
				submit: error.message || "パスワード変更中にエラーが発生しました。",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleMFASubmit = async (e) => {
		e?.preventDefault();

		setIsLoading(true);
		setErrors({});

		if (!mfaCode.trim()) {
			setErrors({ submit: "認証コードを入力してください。" });
			setIsLoading(false);
			return;
		}

		try {
			console.log("Starting MFA confirmation...");
			const result = await confirmMFACode(mfaCode);
			console.log("MFA confirmation result:", result);

			if (result.success) {
				console.log("MFA successful, processing redirect...");
				handleAuthSuccess(result);
			} else {
				setErrors({
					submit: result.error || "認証コードの確認に失敗しました。",
				});
			}
		} catch (error) {
			console.error("MFA submit error:", error);
			setErrors({ submit: error.message || "認証中にエラーが発生しました。" });
		} finally {
			setIsLoading(false);
		}
	};

	const validateForm = () => {
		const inputErrors = {};

		// メールアドレスの検証
		if (!email?.trim()) {
			inputErrors.email = "メールアドレスを入力してください";
		} else if (!email.includes("@") || email.length < 5) {
			inputErrors.email = "正しいメールアドレスを入力してください";
		}

		// パスワードの検証
		if (!password?.trim()) {
			inputErrors.password = "パスワードを入力してください";
		} else if (password.length < 8) {
			inputErrors.password = "パスワードは8文字以上で入力してください";
		}

		return inputErrors;
	};

	const validateNewPassword = (password) => {
		const errors = [];

		if (password.length < 8) {
			errors.push("パスワードは8文字以上である必要があります。");
		}

		if (!/[A-Z]/.test(password)) {
			errors.push("大文字を含む必要があります。");
		}

		if (!/[a-z]/.test(password)) {
			errors.push("小文字を含む必要があります。");
		}

		if (!/[0-9]/.test(password)) {
			errors.push("数字を含む必要があります。");
		}

		if (!/[^A-Za-z0-9]/.test(password)) {
			errors.push("特殊文字を含む必要があります。");
		}

		return errors;
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			if (showNewPasswordForm) {
				handleNewPasswordSubmit(e);
			} else if (showMFAForm) {
				handleMFASubmit(e);
			} else {
				handleLoginSubmit(e);
			}
		}
	};

	const resetToLogin = async () => {
		setIsLoading(true);

		try {
			console.log("Resetting to login form...");
			// セッションをクリア
			await clearCurrentSession();

			// 状態をリセット
			setShowNewPasswordForm(false);
			setShowMFAForm(false);
			setRequiresUserName(false);
			setNewPassword("");
			setConfirmPassword("");
			setUserName("");
			setMfaCode("");
			setSignInResult(null);
			setErrors({});
			console.log("Reset completed");
		} catch (error) {
			console.error("Reset to login error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handlePageRefresh = async () => {
		setIsLoading(true);
		try {
			console.log("Refreshing page...");
			await clearCurrentSession();
			window.location.reload();
		} catch (error) {
			console.error("Page refresh error:", error);
			window.location.reload();
		}
	};

	const handleManualRedirect = () => {
		console.log("Manual redirect triggered");
		try {
			navigate("/", { replace: true });
		} catch (error) {
			console.error("Manual navigation error:", error);
			window.location.href = "/";
		}
	};

	// MFA認証フォームのレンダリング
	const renderMFAForm = () => (
		<form onSubmit={handleMFASubmit} className="space-y-4">
			<div>
				<label
					htmlFor="mfa-code"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					認証コード
				</label>
				<input
					id="mfa-code"
					type="text"
					value={mfaCode}
					onChange={(e) => setMfaCode(e.target.value)}
					onKeyPress={handleKeyPress}
					className="w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors border-gray-300"
					placeholder={
						mfaType === "SMS" ? "SMSコードを入力" : "認証アプリのコードを入力"
					}
					disabled={isLoading}
					maxLength={6}
				/>
			</div>
			<button
				type="submit"
				disabled={isLoading}
				className={clsx(
					"w-full py-3 px-4 rounded-md font-medium transition-all duration-200",
					"focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
					isLoading
						? "bg-gray-400 text-white cursor-not-allowed"
						: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
				)}
			>
				{isLoading ? (
					<div className="flex items-center justify-center">
						<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
						認証中...
					</div>
				) : (
					"認証"
				)}
			</button>
			<button
				type="button"
				onClick={resetToLogin}
				className="w-full py-2 px-4 text-sm text-gray-600 hover:text-gray-800 transition-colors"
				disabled={isLoading}
			>
				ログイン画面に戻る
			</button>
		</form>
	);

	// パスワード変更フォームのレンダリング
	const renderNewPasswordForm = () => (
		<form onSubmit={handleNewPasswordSubmit} className="space-y-4">
			{/* ユーザー名フィールド（必要な場合のみ表示） */}
			{requiresUserName && (
				<div>
					<label
						htmlFor="user-name"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						ユーザー名 <span className="text-red-500">*</span>
					</label>
					<input
						id="user-name"
						type="text"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
						className="w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors border-gray-300"
						placeholder="ユーザー名を入力"
						disabled={isLoading}
					/>
					<p className="text-xs text-gray-500 mt-1">
						初回ログイン時にユーザー名の設定が必要です
					</p>
				</div>
			)}

			<div>
				<label
					htmlFor="new-password"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					新しいパスワード
				</label>
				<input
					id="new-password"
					type="password"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
					className="w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors border-gray-300"
					placeholder="新しいパスワードを入力"
					disabled={isLoading}
				/>
				<p className="text-xs text-gray-500 mt-1">
					8文字以上、大文字・小文字・数字・特殊文字を含む
				</p>
			</div>
			<div>
				<label
					htmlFor="confirm-password"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					新しいパスワード（確認）
				</label>
				<input
					id="confirm-password"
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					onKeyPress={handleKeyPress}
					className="w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors border-gray-300"
					placeholder="もう一度入力"
					disabled={isLoading}
				/>
			</div>
			<button
				type="submit"
				disabled={isLoading}
				className={clsx(
					"w-full py-3 px-4 rounded-md font-medium transition-all duration-200",
					"focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
					isLoading
						? "bg-gray-400 text-white cursor-not-allowed"
						: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
				)}
			>
				{isLoading ? (
					<div className="flex items-center justify-center">
						<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
						設定中...
					</div>
				) : (
					"パスワードを更新"
				)}
			</button>
			<button
				type="button"
				onClick={resetToLogin}
				className="w-full py-2 px-4 text-sm text-gray-600 hover:text-gray-800 transition-colors"
				disabled={isLoading}
			>
				ログイン画面に戻る
			</button>
		</form>
	);

	// 通常のログインフォーム
	const renderLoginForm = () => (
		<form onSubmit={handleLoginSubmit} className="space-y-4">
			{/* メールアドレス */}
			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					メールアドレス
				</label>
				<input
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					onKeyPress={handleKeyPress}
					className={clsx(
						"w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors",
						errors.email
							? "border-red-500 bg-red-50"
							: "border-gray-300 hover:border-gray-400",
					)}
					placeholder="admin@raretech.com"
					disabled={isLoading}
					autoComplete="email"
				/>
				{errors.email && (
					<p className="text-red-600 text-sm mt-1">{errors.email}</p>
				)}
			</div>
			{/* パスワード */}
			<div>
				<label
					htmlFor="password"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					パスワード
				</label>
				<div className="relative">
					<input
						id="password"
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						onKeyPress={handleKeyPress}
						className={clsx(
							"w-full px-3 py-3 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors",
							errors.password
								? "border-red-500 bg-red-50"
								: "border-gray-300 hover:border-gray-400",
						)}
						placeholder="パスワードを入力"
						disabled={isLoading}
						autoComplete="current-password"
					/>
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
						disabled={isLoading}
						tabIndex={-1}
					>
						{showPassword ? (
							<EyeOff className="h-4 w-4" />
						) : (
							<Eye className="h-4 w-4" />
						)}
					</button>
				</div>
				{errors.password && (
					<p className="text-red-600 text-sm mt-1">{errors.password}</p>
				)}
			</div>
			{/* ログインボタン */}
			<button
				type="submit"
				disabled={isLoading}
				className={clsx(
					"w-full py-3 px-4 rounded-md font-medium transition-all duration-200",
					"focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
					isLoading
						? "bg-gray-400 text-white cursor-not-allowed"
						: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
				)}
			>
				{isLoading ? (
					<div className="flex items-center justify-center">
						<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
						ログイン中...
					</div>
				) : (
					"ログイン"
				)}
			</button>

			{/* セッションエラー時のページ再読み込みボタン */}
			{errors.submit && errors.submit.includes("セッション") && (
				<button
					type="button"
					onClick={handlePageRefresh}
					className="w-full py-2 px-4 text-sm text-blue-600 hover:text-blue-800 transition-colors border border-blue-300 rounded-md"
					disabled={isLoading}
				>
					ページを再読み込み
				</button>
			)}
		</form>
	);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
			<div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
				<div className="text-center mb-8">
					<img
						src={RareTECH}
						alt="RareTECH Logo"
						className="mx-auto mb-4 w-20 h-auto"
					/>
					<h1 className="text-2xl font-bold text-gray-900 mb-1">RareTECH</h1>
					<p className="text-gray-600 text-sm">
						{showNewPasswordForm
							? "パスワード設定"
							: showMFAForm
								? "二段階認証"
								: "管理者ログイン"}
					</p>
				</div>
				{/* フォーム全体のエラー */}
				{errors.submit && (
					<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
						<p className="text-red-800 text-sm">{errors.submit}</p>
					</div>
				)}
				{showMFAForm
					? renderMFAForm()
					: showNewPasswordForm
						? renderNewPasswordForm()
						: renderLoginForm()}
			</div>
		</div>
	);
}
