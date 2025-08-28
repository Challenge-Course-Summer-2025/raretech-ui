import { useState, useEffect, useCallback } from "react";
import { PlusCircle } from "lucide-react";
import { TemplateForm } from "../components/settings/Templateform";
import { TemplateItem } from "../components/settings/TemplateItem";
import { DeleteDialog } from "../components/settings/DeleteDialog";
import {
	fetchTemplates,
	createTemplate,
	updateTemplate,
	deleteTemplate,
} from "../api/templates";

const Settings = () => {
	const [templates, setTemplates] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showForm, setShowForm] = useState(false);
	const [editingTemplate, setEditingTemplate] = useState(null);
	const [formContent, setFormContent] = useState("");
	const [deleteTargetId, setDeleteTargetId] = useState(null);

	const loadTemplates = useCallback(async () => {
		try {
			setLoading(true);
			const data = await fetchTemplates();
			setTemplates(data);
			setError(null);
		} catch (err) {
			setError("テンプレートの取得に失敗しました");
			console.error("Failed to load templates:", err);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		loadTemplates();
	}, [loadTemplates]);

	// 新規作成処理
	const handleCreate = async () => {
		if (!formContent.trim()) return;

		try {
			const templateData = {
				template: formContent,
				is_active: 0, // 新規は未有効
			};

			await createTemplate(templateData);
			await loadTemplates(); // データを再読み込み
			setFormContent("");
			setShowForm(false);
		} catch (err) {
			setError("テンプレートの作成に失敗しました");
			console.error("Failed to create template:", err);
		}
	};

	// 更新処理
	const handleUpdate = async () => {
		if (!formContent.trim() || !editingTemplate) return;

		try {
			const templateData = {
				template: formContent,
				is_active: editingTemplate.is_active,
			};

			await updateTemplate(editingTemplate.id, templateData);
			await loadTemplates(); // データを再読み込み
			setEditingTemplate(null);
			setFormContent("");
			setShowForm(false);
		} catch (err) {
			setError("テンプレートの更新に失敗しました");
			console.error("Failed to update template:", err);
		}
	};

	// 有効化処理のハンドラー
	const handleActivate = async (targetId) => {
		try {
			const targetTemplate = templates.find((t) => t.id === targetId);
			if (!targetTemplate) return;

			const templateData = {
				template: targetTemplate.template,
				is_active: 1,
			};

			await updateTemplate(targetId, templateData);

			// 他のテンプレートを無効化
			const otherTemplates = templates.filter((t) => t.id !== targetId);
			for (const template of otherTemplates) {
				if (template.is_active === 1) {
					await updateTemplate(template.id, {
						template: template.template,
						is_active: 0,
					});
				}
			}

			await loadTemplates(); // データを再読み込み
		} catch (err) {
			setError("テンプレートの有効化に失敗しました");
			console.error("Failed to activate template:", err);
		}
	};

	// 削除処理のハンドラー
	const handleDelete = async () => {
		if (!deleteTargetId) return;

		try {
			await deleteTemplate(deleteTargetId);
			await loadTemplates(); // データを再読み込み
			setDeleteTargetId(null);
		} catch (err) {
			setError("テンプレートの削除に失敗しました");
			console.error("Failed to delete template:", err);
		}
	};

	// 編集開始
	const startEdit = (template) => {
		setEditingTemplate(template);
		setFormContent(template.template);
		setShowForm(true);
	};

	// フォームキャンセル
	const cancelForm = () => {
		setShowForm(false);
		setEditingTemplate(null);
		setFormContent("");
	};

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
				<div className="text-center text-red-500 mb-4">{error}</div>
				<div className="text-center">
					<button
						type="button"
						onClick={loadTemplates}
						className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
					>
						再試行
					</button>
				</div>
			</div>
		);
	}

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
