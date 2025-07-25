import { Edit2, Trash2 } from "lucide-react";

export const TemplateItem = ({ template, onActivate, onEdit, onDelete }) => {
	return (
		<div className="border border-gray-200 rounded-lg p-4">
			<div className="flex items-start justify-between">
				<div className="flex-1">
					{/* 有効化ラジオボタンとバッジの実装 */}
					<div className="flex items-center gap-3 mb-3">
						<div className="flex items-center gap-2">
							<input
								type="radio"
								name="activeTemplate"
								checked={template.isActive}
								onChange={() => onActivate(template.id)}
								className="w-4 h-4 text-blue-600 focus:ring-blue-500"
							/>
							<span className="text-sm font-medium text-gray-700">有効化</span>
						</div>
						{template.isActive && (
							<span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
								有効
							</span>
						)}
					</div>

					{/* テンプレート内容 */}
					<div className="bg-gray-50 p-4 rounded-lg mb-3">
						<pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
							{template.content}
						</pre>
					</div>

					{/* 日付情報 */}
					<div className="flex gap-4 text-xs text-gray-500">
						<span>作成日: {template.createdAt}</span>
						<span>更新日: {template.updatedAt}</span>
					</div>
				</div>

				{/* 編集セクション */}
				<div className="flex gap-2 ml-4">
					<button
						type="button"
						onClick={() => onEdit(template)}
						className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
						title="編集"
					>
						<Edit2 size={16} />
					</button>
					<button
						type="button"
						onClick={() => onDelete(template.id)}
						className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
						title="削除"
					>
						<Trash2 size={16} />
					</button>
				</div>
			</div>
		</div>
	);
};
