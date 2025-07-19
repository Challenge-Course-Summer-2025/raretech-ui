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
			</div>
		</header>
	);
};

export default Header;
