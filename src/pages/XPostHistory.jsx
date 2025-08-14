import { useState, useEffect } from "react";
import PostHistory from "../components/PostHistory";
import DailyStats from "../components/DailyStats";
import { fetchXPostHistoryData } from "../api/xposthistory";

const XPostHistory = () => {
	const [dashboardData, setDashboardData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loadDashboardData = async () => {
			try {
				setLoading(true);
				const data = await fetchXPostHistoryData();
				setDashboardData(data);
				setError(null);
			} catch (err) {
				setError("データの取得に失敗しました");
				console.error("Failed to load dashboard data:", err);
			} finally {
				setLoading(false);
			}
		};

		loadDashboardData();
	}, []);

	if (loading) {
		return (
			<main className="container mx-auto p-6">
				<div className="text-center">読み込み中...</div>
			</main>
		);
	}

	if (error) {
		return (
			<main className="container mx-auto p-6">
				<div className="text-center text-red-500">{error}</div>
			</main>
		);
	}

	const postHistory = dashboardData?.latest_posts || [];
	const summary = dashboardData?.summary || {};

	return (
		<main className="container mx-auto p-6">
			<DailyStats
				postsCount={summary.total_posts || 0}
				totalClicks={summary.total_clicks || 0}
			/>
			<PostHistory postHistory={postHistory} />
		</main>
	);
};

export default XPostHistory;
