function LikedPost({ l, post }) {
  return (
    <div>
      {post._id == l.postId ? "liked" : "like"}
      {}
    </div>
  );
}

export default LikedPost;
