import Header from "../layouts/Header";
import Navigation from "../components/Navigation";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
	return (
		<>
			<Header />
			<Navigation />
			<main className="container mx-auto px-4 py-8">
				<Outlet />
			</main>
		</>
	);
};

export default MainLayout;
