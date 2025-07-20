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
import { likesData } from "../../data/likesData";

function LikeTrendChart() {
	return (
		<div style={{ width: "100%", height: 400 }}>
			<h2>いいね数</h2>
			<ResponsiveContainer>
				<LineChart data={likesData}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="month" />
					<YAxis allowDecimals={false} />
					<Tooltip />
					<Legend />
					<Line
						type="monotone"
						dataKey="likes"
						stroke="#8884d8"
						name="いいね数"
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}

export default LikeTrendChart;
