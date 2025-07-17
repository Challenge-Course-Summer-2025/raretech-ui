const PostStats = ({ post }) => {
	return (
		<div className="text-sm text-blue-500">
			クリック数: {post.clicks}件 ｜ CTR: {post.ctr}%
		</div>
	);
};

export default PostStats;
