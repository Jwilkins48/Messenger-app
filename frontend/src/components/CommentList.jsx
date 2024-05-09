function CommentList({ c, postId }) {
  return (
    <div>
      {c.comment} - {c.postId === postId ? "true" : "false"}
    </div>
  );
}

export default CommentList;
