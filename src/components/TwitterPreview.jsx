import { useState, useEffect } from "react";
import { fetchTemplateById } from "../api/templates";

const TwitterPreview = ({ post }) => {
	const [template, setTemplate] = useState(null);
	const [loading, setLoading] = useState(true);

	// created_atから時刻を抽出
	const getTimeFromCreatedAt = (createdAt) => {
		try {
			const date = new Date(createdAt);
			return date.toLocaleTimeString("ja-JP", {
				hour: "2-digit",
				minute: "2-digit",
			});
		} catch (error) {
			return "00:00";
		}
	};

	// テンプレート取得
	useEffect(() => {
		const loadTemplate = async () => {
			if (post.template_id) {
				try {
					const templateData = await fetchTemplateById(post.template_id);
					setTemplate(templateData);
				} catch (error) {
					console.error("Failed to fetch template:", error);
				}
			}
			setLoading(false);
		};

		loadTemplate();
	}, [post.template_id]);

	return (
		<div className="flex flex-col bg-gray-100 border border-sky-200 rounded-lg shadow-md text-sm mt-3 mb-3 space-y-4 p-6">
			<div className="flex items-center space-x-4">
				<div className="w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center text-xs font-bold">
					RT
				</div>
				<div className="flex flex-col">
					<span className="font-semibold">
						RareTECH受講生テックブログ｜希少型エンジニア育成ITスクール
					</span>
					<span className="text-gray-500 text-xs">
						{getTimeFromCreatedAt(post.created_at)}
					</span>
				</div>
			</div>
			<div className="flex flex-col">
				<span>受講生{post.author}さんが記事を公開しました！</span>
				<span>
					{loading
						? "読み込み中..."
						: template?.content ||
							"RareTECHではプログラミングだけでなく、インフラ・セキュリティ・UI/UXなど「基礎概念」を横断的に学びます💡"}
				</span>
				<span>
					体験授業：
					<span className="text-blue-500">https://raretech.short.gy/trial</span>
				</span>
				<span>
					カウンセリング：
					<span className="text-blue-500">
						https://raretech.short.gy/counseling
					</span>
				</span>
			</div>
			<div className="flex flex-row gap-1">
				<span className="text-blue-500">#Qiita</span>
				<span className="text-blue-500">#RareTECH</span>
			</div>
		</div>
	);
};

export default TwitterPreview;
