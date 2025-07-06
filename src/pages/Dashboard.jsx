import InfoCard from "../components/InfoCard";
import StatsCard from "../components/StatsCard";

const Dashboard = () => {
	const botStatusData = [
		{
			type: 'status',
			label: 'Qiita記事チェック',
			value: '15分毎実行',
			valueColor: 'text-blue-600'
		},
		{
			type: 'status',
			label: 'X API接続',
			value: '正常',
			valueColor: 'text-green-600'
		},
		{
			type: 'status',
			label: '今日の投稿記事',
			value: '3件',
			valueColor: 'text-blue-600'
		},
		{
			type: 'status',
			label: '投稿済み',
			value: '2件',
			valueColor: 'text-blue-600'
		}
	];

	const postPerformanceData = [
		{
			type: 'post',
			time: '14:30',
			title: 'AWS Lambda入門',
			author: '田中一郎さん',
			clicks: 'クリック23件'
		},
		{
			type: 'post',
			time: '11:20',
			title: 'React Hook活用',
			author: '山田太郎さん',
			clicks: 'クリック18件'
		}
	];

	return (
		<main className="container mx-auto p-6">
			{/* 統計カード */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
				<StatsCard value="15" label="今月の投稿数" />
				<StatsCard value="234" label="総クリック数" />
				<StatsCard value="3.2%" label="CTR" />
				<StatsCard value="0" label="エラー件数" />
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
