import {
	Route,
	BrowserRouter as Router,
	Routes,
	Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import XPostHistory from "./pages/XPostHistory";
import Effective from "./pages/EffectMeasurement";
import LoginPage from "./pages/Login";
import MainLayout from "./components/MainLayout";

// 認証が必要なルートを保護するコンポーネント
const ProtectedRoute = ({ children }) => {
	return sessionStorage.getItem("accessToken") ? (
		children
	) : (
		<Navigate to="/login" replace />
	);
};

const App = () => {
	return (
		<div className="min-h-screen bg-gray-100 font-sans antialiased">
			<Router>
				<Routes>
					<Route
						path="/login"
						element={
							sessionStorage.getItem("accessToken") ? (
								<Navigate to="/" replace />
							) : (
								<LoginPage />
							)
						}
					/>

					<Route
						element={
							<ProtectedRoute>
								<MainLayout />
							</ProtectedRoute>
						}
					>
						<Route path="/" element={<Dashboard />} />
						<Route path="/x-post-history" element={<XPostHistory />} />
						<Route path="/effective" element={<Effective />} />
						<Route path="/settings" element={<Settings />} />
					</Route>
				</Routes>
			</Router>
		</div>
	);
};

export default App;
