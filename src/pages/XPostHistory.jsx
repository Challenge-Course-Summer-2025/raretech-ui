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
			<div className="flex flex-row bg-green-100 rounded-md p-4 mt-6 mb-6 border border-green-300 border-l-green-600 border-l-5">
				<span className="text-green-800 font-semibold">本日の投稿実績:</span>
				<span className="text-green-800 pl-2">
					2件投稿完了で、合計41クリック獲得
				</span>
			</div>

			{/* 投稿履歴リスト */}
			<section className="bg-white border border-sky-200 rounded-lg shadow-md p-6">
				<h3 className="text-md font-semibold text-blue-900 mb-4 flex items-center gap-2 pl-3">
					📝 投稿履歴一覧
					<span className="bg-amber-500 text-blue-900 text-xs font-bold p-2 rounded-md">
						手動投稿
					</span>
				</h3>

				{postHistory.map((post) => (
					<div
						key={post.id}
						className="border-t py-4 first:border-t-0 border-gray-200 w-full"
					>
						<div className="flex flex-grow space-x-16 mb-2">
							<div className="w-1/12">
								<div className="flex items-center justify-center space-x-4 mb-1">
									<span className="text-sm text-gray-500">{post.time}</span>
								</div>
							</div>
							<div className="w-10/12">
								<div className="items-start">
									<span className="text-gray-800 font-medium">
										{post.title}
									</span>
								</div>
								<div className="text-sm text-gray-600 mb-2">
									投稿者: {post.author} さん｜投稿済み
								</div>
								{post.id === postHistory[0].id && (
									<div className="flex flex-col bg-gray-100 border border-sky-200 rounded-lg shadow-md text-sm mt-3 mb-3 space-y-4 p-6">
										<div className="flex items-center space-x-4">
											<div className="w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center text-xs font-bold">
												RT
											</div>
											<div className="flex flex-col">
												<span className="font-semibold">@RareTECH_jp</span>
												<span className="text-gray-500 text-xs">14:30</span>
											</div>
										</div>
										<div className="flex flex-col pb-2">
											<span>
												🎉RareTECH受講生の{post.author}さんの技術記事をご紹介！
											</span>
											<span>「{post.title}」</span>
										</div>
										<div className="flex flex-col">
											<span>実務レベルの技術を習得中💪</span>
											<span>
												🎯
												<span className="text-blue-500">
													無料体験授業はこちら
												</span>
											</span>
										</div>
										<div className="flex flex-row gap-1">
											<span className="text-blue-500">#RareTECH</span>
											<span className="text-blue-500">#AWS</span>
											<span className="text-blue-500">#プログラミング学習</span>
										</div>
									</div>
								)}
								<div className="text-sm text-blue-500">
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
