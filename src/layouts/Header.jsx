import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/cognito";
import RareTech from "../assets/raretech.png";

const Header = () => {
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const navigate = useNavigate();

	const handleLogout = async () => {
		setIsLoggingOut(true);
		try {
			const result = await logoutUser();
			if (result.success) {
				navigate("/login");
			} else {
				console.error("Logout failed:", result.error);
				// エラーが発生してもログイン画面に遷移
				navigate("/login");
			}
		} catch (error) {
			console.error("Logout error:", error);
			// エラーが発生してもログイン画面に遷移
			navigate("/login");
		} finally {
			setIsLoggingOut(false);
		}
	};

	return (
		<header className="bg-blue-800 text-white p-4 shadow-md">
			<div className="container mx-auto flex justify-between items-center">
				{/* ロゴとタイトル部分 */}
				<a href="/">
					<div className="flex items-center space-x-3 mask-radial-at-center">
						<div>
							<img src={RareTech} alt="RareTECHLogo" className="h-10 w-auto" />
						</div>
						<div>
							<h1 className="text-2xl font-bold">RareTECH</h1>
						</div>
					</div>
				</a>

				{/* ログアウトボタン */}
				<button
					type="button"
					onClick={handleLogout}
					disabled={isLoggingOut}
					className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center space-x-2"
				>
					{isLoggingOut ? (
						<>
							<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
							<span>ログアウト中...</span>
						</>
					) : (
						<>
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								role="img"
								aria-label="ログアウトアイコン"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
								/>
							</svg>
							<span>ログアウト</span>
						</>
					)}
				</button>
			</div>
		</header>
	);
};

export default Header;
