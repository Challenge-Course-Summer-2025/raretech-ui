import PostHistory from "../components/PostHistory";
import DailyStats from "../components/DailyStats";

const XPostHistory = () => {
	const postHistory = [
		{
			id: "xpost-1",
			time: "14:30",
			title: "AWS Lambdaでサーバーレス開発入門",
			author: "田中一郎",
			clicks: 23,
			ctr: 4.1,
		},
		{
			id: "xpost-2",
			time: "12:10",
			title: "React Hookを活用した状態管理",
			author: "山田太郎",
			clicks: 18,
			ctr: 3.2,
		},
		{
			id: "xpost-3",
			time: "11:45",
			title: "Python機械学習入門ガイド",
			author: "佐藤花子",
			clicks: 45,
			ctr: 6.8,
		},
	];

	const totalClicks = postHistory.reduce((sum, post) => sum + post.clicks, 0);

	return (
		<main className="container mx-auto p-6">
			<DailyStats postsCount={postHistory.length} totalClicks={totalClicks} />
			<PostHistory postHistory={postHistory} />
		</main>
	);
};

export default XPostHistory;
