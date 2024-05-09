import { usePostContext } from "../hooks/usePostContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCommentContext } from "../hooks/useCommentContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useEffect, useState } from "react";
//import CommentList from "./CommentList";

function PostList({ post }) {
  const { user } = useAuthContext();
  const { dispatch } = usePostContext();
  const { dispatch: commentDispatch, comments } = useCommentContext();

  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);

  const postId = post._id; // POST ID IN POST COLLECTION
  // const commentPostId - POST ID IN COMMENT COLLECTION

  const time = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });
  // Remove 'about' in front of time
  const newTime = time.replace("about", "");
  const currentUser = user.email == post.email;

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch("http://localhost:4000/api/post/comments", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        commentDispatch({ type: "SET_COMMENT", payload: json });
      }
      console.log(comments?.map((t) => t.postId));
    };
    fetchComments();
  }, [commentDispatch, user.token]);

  // Delete post
  const handleDelete = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(`http://localhost:4000/api/post/${post._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_POST", payload: json });
    }
  };

  const newCommentClick = async (e) => {
    e.preventDefault();
    const author = user.name;

    const response = await fetch("http://localhost:4000/api/post/comment/new", {
      method: "POST",
      body: JSON.stringify({ comment, postId, author }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError("Comment Required");
    }

    if (response.ok) {
      setComment("");
      dispatch({ type: "CREATE_COMMENT", payload: json });
    }
  };

  return (
    <div className="bg-neutral mx-2 p-6 my-6 flex flex-col relative justify-between rounded shadow">
      <div>
        <div className="flex items-center gap-2">
          <i
            className={
              currentUser
                ? "fa-solid fa-user border border-primary py-2 px-4 rounded text-3xl shadow"
                : "fa-solid fa-user border border-accent py-2 px-4 rounded text-3xl shadow"
            }
          />
          <div>
            <p className={currentUser ? "text-primary text-xl" : "text-accent"}>
              {post.author}
            </p>
            <p className="text-xs">{newTime}</p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xl">{post?.post}</p>
      </div>

      <div>
        <input
          onChange={(e) => setComment(e.currentTarget.value)}
          type="text"
        />
        <button onClick={newCommentClick}>comment</button>
        <div>{error && <p>{error}</p>}</div>
      </div>

      {comments?.map((c) => (
        // <CommentList key={c._id} c={c} postId={postId} />
        <div key={c._id} className={c.postId == postId ? "" : "hidden"}>
          {c.comment}
        </div>
      ))}

      <div className="absolute right-6">
        {currentUser ? <button onClick={handleDelete}>Delete</button> : ""}
      </div>
    </div>
  );
}

export default PostList;
