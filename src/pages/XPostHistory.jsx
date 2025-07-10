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

	return (
		<main className="container mx-auto p-6">
			{/* 本日の投稿実績 */}
			<div className="bg-green-100 text-green-800 font-semibold rounded-md p-4 mt-6 mb-6 border border-green-300">
				本日の投稿実績: 2件投稿完了で、合計41クリック獲得
			</div>

			{/* 投稿履歴リスト */}
			<section className="bg-white rounded-lg shadow-md p-6">
				<h3 className="text-md font-semibold text-blue-900 mb-4 flex items-center gap-2">
					📝 投稿履歴一覧
					<span className="bg-amber-500 text-blue-900 text-xs font-bold px-2 py-1 rounded">
						手動投稿
					</span>
				</h3>

				{postHistory.map((post) => (
					<div
						key={post.id}
						className="border-t py-4 first:border-t-0 border-gray-200"
					>
						<div className="flex flex-row items-start space-x-16 mb-2">
							<div>
								<div className="flex items-center space-x-4 mb-1">
									<span className="text-sm text-gray-500">{post.time}</span>
								</div>
							</div>
							<div>
								<div>
									<span className="text-gray-800 font-medium">
										{post.title}
									</span>
								</div>
								<div className="text-sm text-gray-600 mb-2">
									投稿者: {post.author} さん｜投稿済み
								</div>
								<div className="text-sm text-gray-600">
									クリック数: {post.clicks}件 ｜ CTR: {post.ctr}%
								</div>
							</div>
						</div>
					</div>
				))}
			</section>
		</main>
	);
};

export default XPostHistory;
