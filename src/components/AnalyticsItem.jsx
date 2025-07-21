const AnalyticsItem = ({ analytics, isLatest }) => {
	return (
		<div
			key={analytics.id}
			className="border-t py-4 first:border-t-0 border-gray-200 w-full"
		>
			<div className="flex flex-grow space-x-16 mb-2">
				<div className="w-1/12">
					<div className="flex items-center justify-center space-x-4 mb-1">
						<span className="text-sm text-gray-500">{analytics.time}</span>
					</div>
				</div>
				<div className="w-10/12">
					<div className="items-start">
						<span className="text-gray-800 font-medium">{analytics.title}</span>
					</div>
					<div className="text-sm text-gray-600 mb-2">
						投稿者: {analytics.author} さん｜投稿済み
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnalyticsItem;
