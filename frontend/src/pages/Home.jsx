import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { usePostContext } from "../hooks/usePostContext.jsx";
import PostList from "../components/PostList.jsx";

function Home() {
  const { user } = useAuthContext();
  const { dispatch, posts } = usePostContext();

  const [post, setPost] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:4000/api/post/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_POST", payload: json });
      }
    };

    fetchPosts();
  }, [dispatch, user.token]);

  const newPostClick = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/post/new", {
      method: "POST",
      body: JSON.stringify({ post }),
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
      console.log(json);
      dispatch({ type: "CREATE_POST", payload: json });
    }
  };

  return (
    <div className=" py-10 justify-start flex flex-col gap-2">
      <div className="text-center justify-center flex items-center gap-2">
        <h1 className="text-4xl font-bold">
          Welcome, <span className="text-primary">{user.name}</span>!
        </h1>

        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          New Post <i className="fa-solid fa-plus" />
        </button>
      </div>

      {/* FORM START */}

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
      {/* FORM END */}

      <div className="">
        {posts?.map((post) => (
          <PostList key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
