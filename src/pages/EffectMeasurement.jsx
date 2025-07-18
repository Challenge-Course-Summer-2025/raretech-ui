import LikeTrendChart from "../components/Chart/LineChart";
import CVRateChart from "../components/chart/CVRateChart";
import SectionHeader from "../layouts/SectionHeader";
import { MousePointerClick, HeartPlus } from "lucide-react";

const Effective = () => {
	return (
		<div className="container mx-auto p-6 space-y-10">
			{/* CV率セクション */}
			<div>
				<SectionHeader
					title="月別のコンバージョン率・パフォーマンス分析"
					icon={<MousePointerClick size={28} />}
				/>
				<div className="bg-white rounded-xl shadow-md p-6">
					<CVRateChart />
				</div>
			</div>

			{/*  Xのポスト いいね数推移セクション */}
			<div>
				<SectionHeader
					title="月別のいいね数推移"
					icon={<HeartPlus size={28} />}
				/>
				<div className="bg-white rounded-xl shadow-md p-6">
					<LikeTrendChart />
				</div>
			</div>
		</div>
	);
};

export default Effective;
