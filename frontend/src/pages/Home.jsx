import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { usePostContext } from "../hooks/usePostContext.jsx";
import PostList from "../components/PostList.jsx";
import PostModal from "../components/PostModal.jsx";
import ProfileDetails from "../components/ProfileDetails.jsx";
import FriendsList from "../components/FriendsList.jsx";

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
      dispatch({ type: "CREATE_POST", payload: json });
    }
  };

  return (
    <div className="p-6 justify-between flex">
      <div className="start">
        <ProfileDetails />
      </div>
      <div className="middle w-[45rem] mt-2">
        <div className="text-center justify-center pt-8 rounded bg-neutral items-center gap-2">
          <div className="py-1 shadow">
            <div className=" flex items-center justify-center gap-2">
              <i className="fa-solid fa-user border border-primary py-2 px-4 rounded text-3xl shadow" />

              <label className="input input-bordered flex items-center w-[37rem] justify-between py-7 shadow">
                <input
                  onChange={(e) => setPost(e.currentTarget.value)}
                  type="text"
                  placeholder="What's New?"
                />
                <button onClick={newPostClick}>
                  <i className="fa-solid fa-arrow-right text-lg" />
                </button>
              </label>
            </div>
            <div className="divider px-20 pt-2">
              <i className="fa-solid fa-ghost" />
            </div>
            <div className="flex gap-40 pt-0 pb-5 items-center justify-center">
              <PostModal
                newPostClick={newPostClick}
                setPost={setPost}
                error={error}
              />

              <button>
                Upload Photo <i className="fa-solid fa-image" />
              </button>
            </div>
          </div>
        </div>

        <div className="">
          {posts?.map((post) => (
            <PostList key={post._id} post={post} />
          ))}
        </div>
      </div>
      <div className="w-[] ">
        <FriendsList />
      </div>
    </div>
  );
}

export default Home;
