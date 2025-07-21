import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import XPostHistory from "./pages/XPostHistory";
import Analytics from "./pages/Analytics";
import Effective from "./pages/EffectMeasurement";
import LoginPage from "./pages/Login";
import MainLayout from "./components/MainLayout";

const App = () => {
	return (
		<div className="min-h-screen bg-gray-100 font-sans antialiased">
			<Router>
				<Routes>
					<Route path="/login" element={<LoginPage />} />

					<Route element={<MainLayout />}>
						<Route path="/" element={<Dashboard />} />
						<Route path="/x-post-history" element={<XPostHistory />} />
						<Route path="/analytics" element={<Analytics />} />
						<Route path="/effective" element={<Effective />} />
						<Route path="/settings" element={<Settings />} />
					</Route>
				</Routes>
			</Router>
		</div>
	);
};

export default App;
