function LikedPost({ l, post, email }) {
  return (
    <div>{post._id == l.postId && l.userEmail == email ? "liked" : "like"}</div>
  );
}

export default LikedPost;
