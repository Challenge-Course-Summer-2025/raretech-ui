import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { TemplateForm } from "../components/settings/Templateform";
import { TemplateItem } from "../components/settings/TemplateItem";
import { DeleteDialog } from "../components/settings/DeleteDialog";

const Settings = () => {
	// サンプルデータ
	// TODO: DyanamoDBからデータを取得する
	const sampleTemplates = [
		{
			id: "1",
			content:
				"🎉 RareTECH受講生の{投稿者名}さんの技術記事をご紹介！\n「{記事タイトル}」\nAWSでサーバーレスな実行環境を構築💪",
			isActive: true,
			createdAt: "2025-04-15",
			updatedAt: "2025-04-20",
		},
		{
			id: "2",
			content:
				"📚 新着記事のお知らせ\n{投稿者名}さんによる「{記事タイトル}」\n詳細はリンクをチェック！",
			isActive: false,
			createdAt: "2025-07-10",
			updatedAt: "2024-07-18",
		},
	];

	const [templates, setTemplates] = useState(sampleTemplates);
	const [showForm, setShowForm] = useState(false);
	const [editingTemplate, setEditingTemplate] = useState(null);
	const [formContent, setFormContent] = useState("");
	const [deleteTargetId, setDeleteTargetId] = useState(null);

	// 新規作成処理
	const handleCreate = () => {
		if (!formContent.trim()) return;

		const newTemplate = {
			id: Date.now().toString(),
			content: formContent,
			isActive: false,
			createdAt: new Date().toISOString().split("T")[0],
			updatedAt: new Date().toISOString().split("T")[0],
		};

		setTemplates([...templates, newTemplate]);
		setFormContent("");
		setShowForm(false);
	};

	// 更新処理
	const handleUpdate = () => {
		if (!formContent.trim() || !editingTemplate) return;

		const updatedTemplates = templates.map((template) =>
			template.id === editingTemplate.id
				? {
						...template,
						content: formContent,
						updatedAt: new Date().toISOString().split("T")[0],
					}
				: template,
		);

		setTemplates(updatedTemplates);
		setEditingTemplate(null);
		setFormContent("");
		setShowForm(false);
	};

	// 有効化処理のハンドラー
	const handleActivate = (targetId) => {
		const updatedTemplates = templates.map((template) => ({
			...template,
			isActive: template.id === targetId,
		}));
		setTemplates(updatedTemplates);
	};

	// 削除処理のハンドラー
	const handleDelete = () => {
		const updatedTemplates = templates.filter(
			(template) => template.id !== deleteTargetId,
		);
		setTemplates(updatedTemplates);
		setDeleteTargetId(null);
	};

	// 編集開始
	const startEdit = (template) => {
		setEditingTemplate(template);
		setFormContent(template.content);
		setShowForm(true);
	};

	// フォームキャンセル
	const cancelForm = () => {
		setShowForm(false);
		setEditingTemplate(null);
		setFormContent("");
	};

	return (
		<div className="container mx-auto p-6">
			<h2 className="text-lg font-semibold text-gray-800 mb-2">
				投稿テンプレート設定
			</h2>
			<div className="bg-white rounded-lg shadow-md p-6">
				<div className="flex items-center justify-between mb-6">
					<div></div>
					<button
						type="button"
						onClick={() => setShowForm(true)}
						className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
					>
						<PlusCircle size={20} />
						新規テンプレート
					</button>
				</div>

				{/* フォームの表示 */}
				{showForm && (
					<TemplateForm
						content={formContent}
						onChange={setFormContent}
						onSave={editingTemplate ? handleUpdate : handleCreate}
						onCancel={cancelForm}
						isEditing={!!editingTemplate}
					/>
				)}

				{/* テンプレート一覧 */}
				<div>
					<h4 className="text-md font-semibold text-gray-800 mb-4">
						テンプレート一覧
					</h4>

					<div className="space-y-4">
						{templates.map((template) => (
							<TemplateItem
								key={template.id}
								template={template}
								onActivate={handleActivate}
								onEdit={startEdit}
								onDelete={setDeleteTargetId}
							/>
						))}
					</div>

					{templates.length === 0 && (
						<div className="p-8 text-center text-gray-500 border border-gray-200 rounded-lg">
							<p>テンプレートが登録されていません</p>
							<p className="text-sm mt-1">
								「新規テンプレート」ボタンから作成してください
							</p>
						</div>
					)}
				</div>
			</div>

			{/* 削除確認用のダイアログ  */}
			<DeleteDialog
				isOpen={!!deleteTargetId}
				onConfirm={handleDelete}
				onCancel={() => setDeleteTargetId(null)}
			/>
		</div>
	);
};

export default Settings;
