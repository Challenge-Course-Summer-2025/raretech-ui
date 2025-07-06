const StatsCard = ({ value, label, valueColor = "text-blue-600" }) => {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md text-center">
			<div className={`text-3xl font-bold ${valueColor} mb-2`}>{value}</div>
			<div className="text-gray-600">{label}</div>
		</div>
	);
};

export default StatsCard;