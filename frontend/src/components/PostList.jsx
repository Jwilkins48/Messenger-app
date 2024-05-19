import { useCommentContext } from "../hooks/useCommentContext.jsx";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { usePostContext } from "../hooks/usePostContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function PostList({ post }) {
  const { dispatch: commentDispatch } = useCommentContext();
  const time = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });

  const { user } = useAuthContext();
  const { dispatch } = usePostContext();

  const currentUser = user.email == post.email;
  const newTime = time.replace("about", "");
  const commentLength = post.comments.length;
  const postId = post._id;

  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);

  // // New Comment
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
      dispatch({ type: "SET_POST", payload: json });
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch("http://localhost:4000/api/post/comments", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        setError("Comment Required");
      }
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
          className="input"
          onChange={(e) => setComment(e.currentTarget.value)}
          type="text"
        />
        <button className="btn" onClick={newCommentClick}>
          comment
        </button>
        <div>{error && <p>{error}</p>}</div>
      </div>

      <div className="collapse bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          {commentLength > 1
            ? `${commentLength} Comments`
            : `${commentLength} Comment`}
        </div>
        <div className="collapse-content">
          {post?.comments?.map((c) => (
            <div className="border" key={uuidv4()}>
              {[c]}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-6">
        {currentUser ? <button onClick={handleDelete}>Delete</button> : ""}
      </div>
    </div>
  );
}

export default PostList;
