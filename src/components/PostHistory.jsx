import PostItem from "./PostItem";

const PostHistory = ({ postHistory }) => {
	return (
		<section className="bg-white border border-sky-200 rounded-lg shadow-md p-6">
			<h3 className="text-md font-semibold text-blue-900 mb-4 flex items-center gap-2 pl-3">
				📝 投稿履歴一覧
				<span className="bg-amber-500 text-blue-900 text-xs font-bold p-2 rounded-md">
					手動投稿
				</span>
			</h3>

			{postHistory.map((post) => (
				<PostItem
					key={post.id}
					post={post}
					isLatest={post.id === postHistory[0].id}
				/>
			))}
		</section>
	);
};

export default PostHistory;
