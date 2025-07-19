import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { cvData } from "../../data/cvRate";

function CVRateChart() {
	const avgCVRate = (
		cvData.reduce((sum, item) => sum + item.cvRate, 0) / cvData.length
	).toFixed(1);
	const totalConversions = cvData.reduce(
		(sum, item) => sum + item.conversions,
		0,
	);
	const latestCVRate = cvData[cvData.length - 1].cvRate;

	return (
		<div className="w-full p-6">
			{/* KPIカード */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				<div className="bg-white p-6 rounded-lg shadow-md text-center">
					<div className="text-3xl font-bold text-green-600 mb-2">
						{avgCVRate}%
					</div>
					<div className="text-gray-600">平均CV率</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-md text-center">
					<div className="text-3xl font-bold text-blue-600 mb-2">
						{totalConversions.toLocaleString()}
					</div>
					<div className="text-gray-600">総コンバージョン数</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-md text-center">
					<div className="text-3xl font-bold text-blue-600 mb-2">
						{latestCVRate}%
					</div>
					<div className="text-gray-600">今月のCV率</div>
				</div>
			</div>

			{/* グラフ */}
			<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
				<ResponsiveContainer width="100%" height={400}>
					<LineChart data={cvData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="month" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line
							type="monotone"
							dataKey="cvRate"
							stroke="#2563eb"
							name="CV率 (%)"
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export default CVRateChart;
