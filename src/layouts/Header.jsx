import RareTech from "../assets/raretech.png";
const Header = () => {
	return (
		<header className="bg-blue-800 text-white p-4 shadow-md">
			<div className="container mx-auto flex justify-between items-center">
				{/* ロゴとタイトル部分 */}
				<div className="flex items-center space-x-3 mask-radial-at-center">
					<div>
						<img src={RareTech} alt="RareTECHLogo" className="h-10 w-auto" />
					</div>
					<div>
						<h1 className="text-2xl font-bold">RareTECH</h1>
					</div>
				</div>
				{/* 運用管理画面ボタン */}
				<button
					type="button"
					className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out"
				>
					運用管理画面
				</button>
			</div>
		</header>
	);
};

export default Header;
