import { useState, useEffect } from "react";
import PostHistory from "../components/PostHistory";
import DailyStats from "../components/DailyStats";
import { fetchXPostHistoryData } from "../api/xposthistory";

const XPostHistory = () => {
	const [postData, setPostData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const limit = 10;

	useEffect(() => {
		const loadPostData = async () => {
			try {
				setLoading(true);
				const data = await fetchXPostHistoryData(currentPage, limit);
				setPostData(data);
				setError(null);
			} catch (err) {
				setError("データの取得に失敗しました");
				console.error("Failed to load post data:", err);
			} finally {
				setLoading(false);
			}
		};

		loadPostData();
	}, [currentPage]);

	if (loading) {
		return (
			<main className="container mx-auto p-6">
				<div className="text-center">読み込み中...</div>
			</main>
		);
	}

	if (error) {
		return (
			<main className="container mx-auto p-6">
				<div className="text-center text-red-500">{error}</div>
			</main>
		);
	}

	const postHistory = postData?.posts || [];
	const totalPages = Math.ceil((postData?.total || 0) / limit);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<main className="container mx-auto p-6">
			<DailyStats postsCount={postData?.total || 0} totalClicks={0} />
			<PostHistory postHistory={postHistory} />

			{totalPages > 1 && (
				<div className="flex justify-center items-center mt-6 space-x-2">
					<button
						type="button"
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className="px-3 py-2 bg-gray-200 text-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
					>
						前へ
					</button>

					<span className="px-4 py-2 text-sm text-gray-600">
						{currentPage} / {totalPages}
					</span>

					<button
						type="button"
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						className="px-3 py-2 bg-gray-200 text-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
					>
						次へ
					</button>
				</div>
			)}
		</main>
	);
};

export default XPostHistory;
