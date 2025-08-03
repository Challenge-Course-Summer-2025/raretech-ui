import { useState, useEffect } from "react";
import InfoCard from "../components/InfoCard";
import StatsCard from "../components/StatsCard";
import { fetchDashboardData } from "../api/dashboard";

const Dashboard = () => {
	const [dashboardData, setDashboardData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loadDashboardData = async () => {
			try {
				setLoading(true);
				const data = await fetchDashboardData();
				setDashboardData(data);
				setError(null);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		loadDashboardData();
	}, []);

	const botStatusData = [
		{
			id: "stats-1",
			type: "status",
			label: "Qiita記事チェック",
			value: "15分毎実行",
			valueColor: "text-blue-600",
		},
		{
			id: "stats-2",
			type: "status",
			label: "X API接続",
			value: "正常",
			valueColor: "text-green-600",
		},
		{
			id: "stats-3",
			type: "status",
			label: "今日の投稿記事",
			value: dashboardData?.summary?.total_posts || "0件",
			valueColor: "text-blue-600",
		},
		{
			id: "stats-4",
			type: "status",
			label: "投稿済み",
			value: dashboardData?.summary?.total_posts || "0件",
			valueColor: "text-blue-600",
		},
	];

	const postPerformanceData =
		dashboardData?.latest_posts?.map((post, index) => ({
			id: `info-${index + 1}`,
			type: "post",
			time: new Date(post.created_at).toLocaleTimeString("ja-JP", {
				hour: "2-digit",
				minute: "2-digit",
			}),
			title: post.title,
			author: post.author || "不明",
			clicks: `クリック${post.click_count || 0}件`,
		})) || [];

	if (loading) {
		return (
			<main className="container mx-auto p-6">
				<div className="flex justify-center items-center h-64">
					<div className="text-lg">データを読み込み中...</div>
				</div>
			</main>
		);
	}

	if (error) {
		return (
			<main className="container mx-auto p-6">
				<div className="bg-red-50 border border-red-200 rounded-lg p-4">
					<div className="text-red-800">
						<strong>エラー:</strong> {error}
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className="container mx-auto p-6">
			{/* 統計カード */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
				<StatsCard
					value={dashboardData?.summary?.total_posts?.toString() || "0"}
					label="今月の投稿数"
				/>
				<StatsCard
					value={dashboardData?.summary?.total_clicks?.toString() || "0"}
					label="総クリック数"
				/>
				<StatsCard value={`${dashboardData?.summary?.ctr || 0}%`} label="CTR" />
				<StatsCard
					value={dashboardData?.summary?.error_count?.toString() || "0"}
					label="エラー件数"
				/>
			</div>

			{/* メインコンテンツ */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* 自動投稿botの状況 */}
				<InfoCard title="🤖 自動投稿botの状況" items={botStatusData} />

				{/* 直近の投稿効果 */}
				<InfoCard title="📊 直近の投稿効果" items={postPerformanceData} />
			</div>

			{/* システム概要 */}
			<div className="bg-blue-50 p-4 rounded-lg mt-8">
				<div className="flex items-start space-x-2">
					<div className="text-blue-600 mt-1">💡</div>
					<div className="text-sm text-blue-800">
						<strong>システム概要:</strong>{" "}
						RareTECH受講生のQiita記事を15分毎に自動検出し、テンプレートに基づいてX（旧Twitter）に自動投稿します。投稿には体験授業予約リンクが含まれます。
					</div>
				</div>
			</div>
		</main>
	);
};

export default Dashboard;
