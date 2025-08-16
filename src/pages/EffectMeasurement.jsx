import { useState, useEffect } from "react";
import LikeTrendChart from "../components/chart/LineChart";
import CVRateChart from "../components/chart/CVRateChart";
import SectionHeader from "../layouts/SectionHeader";
import { MousePointerClick, HeartPlus } from "lucide-react";
import { fetchMetricsData } from "../api/metrics";

const Effective = () => {
	const [metricsData, setMetricsData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loadMetricsData = async () => {
			try {
				setLoading(true);
				const data = await fetchMetricsData();
				setMetricsData(data);
				setError(null);
			} catch (err) {
				setError("メトリクスデータの取得に失敗しました");
				console.error("Failed to load metrics data:", err);
			} finally {
				setLoading(false);
			}
		};

		loadMetricsData();
	}, []);

	if (loading) {
		return (
			<div className="container mx-auto p-6">
				<div className="text-center">読み込み中...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mx-auto p-6">
				<div className="text-center text-red-500">{error}</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-6 space-y-10">
			{/* CV率セクション */}
			<div>
				<SectionHeader
					title="月別のコンバージョン率・パフォーマンス分析"
					icon={<MousePointerClick size={28} />}
				/>
				<div className="bg-white rounded-xl shadow-md p-6">
					<CVRateChart metricsData={metricsData} />
				</div>
			</div>

			{/*  Xのポスト いいね数推移セクション */}
			<div>
				<SectionHeader
					title="月別のいいね数推移"
					icon={<HeartPlus size={28} />}
				/>
				<div className="bg-white rounded-xl shadow-md p-6">
					<LikeTrendChart metricsData={metricsData} />
				</div>
			</div>
		</div>
	);
};

export default Effective;
