const SectionHeader = ({ title, icon }) => (
	<div className="flex items-center gap-3 mb-6">
		{icon && <div className="text-blue-700">{icon}</div>}
		<h2 className="text-2xl font-bold text-gray-800">{title}</h2>
	</div>
);

export default SectionHeader;
