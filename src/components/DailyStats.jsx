const DailyStats = ({ postsCount, totalClicks }) => {
	return (
		<div className="flex flex-row bg-green-100 rounded-md p-4 mt-6 mb-6 border border-green-300 border-l-green-600 border-l-5">
			<span className="text-green-800 font-semibold">本日の投稿実績:</span>
			<span className="text-green-800 pl-2">
				{postsCount}件投稿完了で、合計{totalClicks}クリック獲得
			</span>
		</div>
	);
};

export default DailyStats;
