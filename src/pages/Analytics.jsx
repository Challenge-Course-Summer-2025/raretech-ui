import AnalyticsLog from "../components/AnalyticsLog";

const Analytics = () => {
	const analyticsData = [
		{
			id: "analytics-1",
			time: "15:15",
			title: "DockerでPython開発環境を構築",
			author: "高橋三郎",
			status: "投稿待機中",
		},
		{
			id: "analytics-2",
			time: "14:30",
			title: "AWS Lambdaでサーバーレス開発入門",
			author: "田中一郎",
			status: "投稿完了",
		},
		{
			id: "analytics-3",
			time: "11:20",
			title: "React Hookを活用した状態管理",
			author: "山田太郎",
			status: "投稿完了",
		},
		{
			id: "analytics-4",
			time: "10:05",
			title: "JavaScript基礎講座",
			author: "田中美香",
			status: "除外ユーザーのためスキップ",
		},
	];

	return (
		<main className="container mx-auto p-6">
			<div className="flex flex-row bg-sky-100 rounded-md p-4 mt-6 mb-6 border border-sky-300 border-l-sky-600 border-l-5">
				<span className="text-sky-800 font-semibold">📡検出条件:</span>
				<span className="text-sky-800 pl-2">
					RareTECHタグ付き記事 + 指定ユーザーの記事を15分毎にチェック
				</span>
			</div>
			<AnalyticsLog analyticsData={analyticsData} />
		</main>
	);
};

export default Analytics;
