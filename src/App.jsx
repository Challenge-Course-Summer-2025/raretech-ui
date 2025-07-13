import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import XPostHistory from "./pages/XPostHistory";
import Analytics from "./pages/Analytics";
import Effective from "./pages/EffectMeasurement";

const App = () => {
	return (
		<div className="min-h-screen bg-gray-100 font-sans antialiased">
			<Router>
				<Header />
				<Navigation />
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/x-post-history" element={<XPostHistory />} />
					<Route path="/analytics" element={<Analytics />} />
					<Route path="/effective" element={<Effective />} />
					<Route path="/settings" element={<Settings />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
