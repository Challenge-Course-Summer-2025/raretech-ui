export const TemplateForm = ({
	template,
	onChange,
	onSave,
	onCancel,
	isEditing,
}) => {
	return (
		<div className="bg-gray-50 rounded-lg p-6 mb-6">
			<h4 className="text-md font-semibold mb-4">
				{isEditing ? "テンプレート編集" : "新規テンプレート作成"}
			</h4>

			<div className="space-y-4">
				<div>
					<textarea
						value={template}
						onChange={(e) => onChange(e.target.value)}
						placeholder="投稿テンプレートを入力してください。{投稿者名}、{記事タイトル}などの変数が使用できます。"
						className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
					/>
				</div>

				<div className="flex gap-3">
					<button
						type="button"
						onClick={onSave}
						className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
					>
						{isEditing ? "更新" : "作成"}
					</button>
					<button
						type="button"
						onClick={onCancel}
						className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
					>
						キャンセル
					</button>
				</div>
			</div>
		</div>
	);
};
