import { Home, List, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
	const location = useLocation();

	const isActive = (path) => {
		return location.pathname === path;
	};

	return (
		<nav className="bg-blue-800 text-white">
			<div className="container mx-auto px-4 pb-4">
				<div className="flex space-x-2 md:space-x-4 lg:space-x-6 overflow-x-auto pb-2">
					<Link
						to="/"
						className={`flex items-center space-x-2 font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out whitespace-nowrap ${
							isActive("/")
								? "bg-amber-500 hover:bg-amber-600 text-blue-900"
								: "bg-blue-600 hover:bg-blue-500 text-white"
						}`}
					>
						<Home size={18} />
						<span>ダッシュボード</span>
					</Link>

					<Link
						to="/x-post-history"
						className={`flex items-center space-x-2 font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out whitespace-nowrap ${
							isActive("/x-post-history")
								? "bg-amber-500 hover:bg-amber-600 text-blue-900"
								: "bg-blue-600 hover:bg-blue-500 text-white"
						}`}
					>
						<List size={18} />
						<span>X投稿履歴</span>
					</Link>

					<Link
						to="/settings"
						className={`flex items-center space-x-2 font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out whitespace-nowrap ${
							isActive("/settings")
								? "bg-amber-500 hover:bg-amber-600 text-blue-900"
								: "bg-blue-600 hover:bg-blue-500 text-white"
						}`}
					>
						<Settings size={18} />
						<span>設定</span>
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
