import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import RareTECH from "../assets/raretech.png";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e?.preventDefault();

		const formErrors = validateForm();
		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			return;
		}

		setIsLoading(true);
		setErrors({}); // エラーをクリアさせる
		try {
			// TODO: FastAPIと連携させる
			await new Promise((resolve) => setTimeout(resolve, 1000));
			navigate("/");
		} catch (_error) {
			setErrors({ submit: "ログインに失敗しました" });
		} finally {
			setIsLoading(false);
		}
	};

	const validateForm = () => {
		const inputErrors = {};
		if (!email?.trim()) {
			inputErrors.email = "メールアドレスを入力してください";
		} else if (!email.includes("@") || email.length < 5) {
			inputErrors.email = "正しいメールアドレスを入力してください";
		}
		if (!password?.trim()) {
			inputErrors.password = "パスワードを入力してください";
		} else if (password.length < 8) {
			inputErrors.password = "8文字以上を入力してください";
		}

		return inputErrors;
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
			<div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
				<div className="text-center mb-8">
					<img
						src={RareTECH}
						alt="RareTECHLog"
						className="mx-auto mb-4 w-20 h-auto"
					/>
					<h1 className="text-2xl font-bold text-gray-900 mb-1">RareTECH</h1>
					<p className="text-gray-600 text-sm">管理者ログイン</p>
				</div>

				{/* フォーム全体のエラー */}
				{errors.submit && (
					<div className="mb-4 p-3 bg-pink-50 border border-pink-200 rounded-md">
						<p className="text-pink-800 text-sm">{errors.submit}</p>
					</div>
				)}

				{/* ユーザーID */}
				<div className="space-y-4">
					<div>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className={clsx(
								"w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
								errors.email ? "border-pink-800" : "border-gray-300",
							)}
							placeholder="admin@raretech.com"
							disabled={isLoading}
						/>
						{errors.email && (
							<p className="text-pink-800 text-sm mt-1">{errors.email}</p>
						)}
					</div>

					{/* パスワード処理 */}
					<div>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className={clsx(
									"w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
									errors.password ? "border-pink-800" : "border-gray-300",
								)}
								placeholder="パスワードを入力"
								disabled={isLoading}
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
								disabled={isLoading}
							>
								{showPassword ? (
									<EyeOff className="h-4 w-4" />
								) : (
									<Eye className="h-4 w-4" />
								)}
							</button>
						</div>
						{errors.password && (
							<p className="text-pink-800 text-sm mt-1">{errors.password}</p>
						)}
					</div>

					<button
						type="button"
						onClick={handleSubmit}
						disabled={isLoading}
						className={clsx(
							"w-full py-2 px-4 rounded-md font-medium transition-colors duration-200",
							"focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
							isLoading
								? "bg-gray-400 text-white cursor-not-allowed"
								: "bg-blue-600 text-white hover:bg-blue-700",
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

					{/* ここにパスワード忘れた時ようのリンク作成予定(追加機能) */}
				</div>
			</div>
		</div>
	);
}
