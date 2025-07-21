import AnalyticsItem from "./AnalyticsItem";

const AnalyticsLog = ({ analyticsData }) => {
	return (
		<section className="bg-white border border-sky-200 rounded-lg shadow-md p-6">
			<h3 className="text-md font-semibold text-blue-900 mb-4 flex items-center gap-2 pl-3">
				🔍 記事検出履歴
			</h3>

			{analyticsData.map((analytics) => (
				<AnalyticsItem
					key={analytics.id}
					analytics={analytics}
					isLatest={analytics.id === analyticsData[0].id}
				/>
			))}
		</section>
	);
};

export default AnalyticsLog;
