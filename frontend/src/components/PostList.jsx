import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { usePostContext } from "../hooks/usePostContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { v4 as uuidv4 } from "uuid";
import LikedPost from "./LikedPost";
import { useState } from "react";

function PostList({ post }) {
  const time = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });

  const { user } = useAuthContext();
  const { dispatch } = usePostContext();

  const likesLength = post.likes.length;
  const newTime = time.replace("about", "");
  const commentLength = post.comments.length;
  const currentUser = user.email == post.email;
  const postId = post._id;

  const [dropdown, setDropdown] = useState(false);
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState(null);

  // New Comment
  const newCommentClick = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/post/comment/new", {
      method: "POST",
      body: JSON.stringify({ comment, postId, postedBy: user.email }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    setComment("");

    if (!response.ok) {
      setError("Comment Required");
    }

    if (response.ok) {
      dispatch({ type: "SET_POST", payload: json });
    }
  };

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

  // Delete comment - /api/post/comment/delete
  const deleteComment = async (postComment) => {
    if (!user) {
      return;
    }
    const response = await fetch(
      `http://localhost:4000/api/post/comment/delete`,
      {
        method: "POST",
        body: JSON.stringify({ postComment, postId, postedBy: user.email }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      dispatch({ type: "SET_POST", payload: json });
    }
  };

  const newLikeClick = async (e) => {
    e.preventDefault();
    const userEmail = user.email;

    const response = await fetch("http://localhost:4000/api/post/likes/new", {
      method: "POST",
      body: JSON.stringify({ userEmail, postId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError("error");
    }

    if (response.ok) {
      setLiked(!liked);
      dispatch({ type: "SET_POST", payload: json });
    }
  };

  console.log(post.likes);
  console.log(postId);

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
        <p className="text-2xl break-words">{post?.post}</p>
      </div>

      <div className="pt-2">
        <div className="flex justify-between">
          <p>
            {likesLength !== 1 ? `${likesLength} Likes` : `${likesLength} Like`}
          </p>
          <button
            className="hover:underline"
            onClick={() => setDropdown(!dropdown)}
          >
            {commentLength !== 1
              ? `${commentLength} Comments`
              : `${commentLength} Comment`}
          </button>
        </div>

        <div>
          <div className="divider my-1" />
          <div className="flex justify-between px-20">
            <button onClick={newLikeClick} className="hover:underline">
              {/* show if liked */}
              {likesLength > 0
                ? post.likes.map((l) => (
                    <LikedPost l={l} key={l.postId} post={post} />
                  ))
                : "Like"}
            </button>
            <button
              className=" hover:underline"
              onClick={() => setDropdown(!dropdown)}
            >
              <i className="fa-regular fa-comment" /> Comment
            </button>
          </div>
          <div className="divider my-1" />
        </div>
      </div>

      <div className={dropdown ? "" : "hidden"}>
        <div className="flex gap-2">
          <i className="fa-solid fa-user border border-primary py-2 px-4 rounded text-3xl shadow" />
          <label className="input input-bordered flex items-center justify-between py-[1.6rem] shadow">
            <input
              onChange={(e) => setComment(e.currentTarget.value)}
              value={comment}
              type="text"
            ></input>
            <button onClick={newCommentClick}>
              <i className="fa-solid fa-arrow-right text-lg" />
            </button>
            <div>{error && <p>{error}</p>}</div>
          </label>
        </div>

        <div>
          {post?.comments?.map((c) => (
            <div className="flex  items-center" key={uuidv4()}>
              <i
                className={
                  c.postedBy == user.email
                    ? "fa-solid fa-user border border-primary items-center flex justify-center h-12 w-12 rounded text-3xl shadow mx-1 mt-3  "
                    : "fa-solid fa-user border border-accent h-12 w-12 items-center justify-center flex rounded text-3xl shadow mx-1 mt-3"
                }
              />
              <div className="border px-1 py-2 ml-1 mt-4 rounded shadow border-neutral min-w-[15rem] relative">
                <h1 className="font-bold">
                  {c.postedBy == user.email ? user.name : post.author}
                </h1>

                <p className="break-words">{c.comment}</p>

                <div className="top-1 right-2 absolute">
                  {c.postedBy == user.email ? (
                    <button
                      className=""
                      onClick={() => deleteComment(c.comment)}
                    >
                      <i className="fa-solid fa-xmark text-md text-primary" />
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-6">
        {currentUser ? (
          <button onClick={handleDelete}>
            <i className="fa-solid fa-xmark text-xl" />
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default PostList;
