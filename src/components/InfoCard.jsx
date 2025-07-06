const InfoCard = ({ title, items }) => {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h3 className="text-lg font-semibold mb-4 flex items-center">
				{title}
			</h3>
			<div className="space-y-3">
				{items.map((item) => (
					<div key={item.id} className="flex justify-between items-center">
						{item.type === 'status' ? (
							<>
								<span>{item.label}</span>
								<span className={item.valueColor || "text-blue-600"}>{item.value}</span>
							</>
						) : (
							<>
								<div>
									<div className="text-sm text-gray-500">{item.time}</div>
									<div className="font-medium">{item.title}</div>
									<div className="text-sm text-gray-500">{item.author}</div>
								</div>
								<div className="text-blue-600">{item.clicks}</div>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default InfoCard;