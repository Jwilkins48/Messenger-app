import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { usePostContext } from "../hooks/usePostContext.jsx";
import { useState } from "react";

function PostModal() {
  const { user } = useAuthContext();
  const { dispatch: modalDispatch } = usePostContext();

  const [post, setPost] = useState("");
  const [error, setError] = useState(null);

  const newPostClick = async (e) => {
    e.preventDefault();
    const author = user.name;

    const response = await fetch("http://localhost:4000/api/post/new", {
      method: "POST",
      body: JSON.stringify({ post, author }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setPost("");
      modalDispatch({ type: "CREATE_POST", payload: json });
    }
  };
  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        New Post <i className="fa-solid fa-plus" />
      </button>

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h1 className="text-start pl-2">New Post</h1>
          <textarea
            type="text"
            placeholder="Type here"
            onChange={(e) => setPost(e.currentTarget.value)}
            className="input input-bordered w-full h-[20rem] resize-none pl-2 py-1"
          />
          <div className="textArea"></div>

          <button className="btn" onClick={newPostClick}>
            Post
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
          {error && <div className="error">{error}</div>}
        </form>
      </dialog>
    </div>
  );
}

export default PostModal;
