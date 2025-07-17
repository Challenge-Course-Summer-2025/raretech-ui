const TwitterPreview = ({ post }) => {
	return (
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
				<span>🎉RareTECH受講生の{post.author}さんの技術記事をご紹介！</span>
				<span>「{post.title}」</span>
			</div>
			<div className="flex flex-col">
				<span>実務レベルの技術を習得中💪</span>
				<span>
					🎯<span className="text-blue-500">無料体験授業はこちら</span>
				</span>
			</div>
			<div className="flex flex-row gap-1">
				<span className="text-blue-500">#RareTECH</span>
				<span className="text-blue-500">#AWS</span>
				<span className="text-blue-500">#プログラミング学習</span>
			</div>
		</div>
	);
};

export default TwitterPreview;
