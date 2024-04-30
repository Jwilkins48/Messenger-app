import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { usePostContext } from "../hooks/usePostContext.jsx";
import PostList from "../components/PostList.jsx";
import PostModal from "../components/PostModal.jsx";

function Home() {
  const { user } = useAuthContext();
  const { dispatch, posts } = usePostContext();

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

  return (
    <div className=" py-10 justify-start flex flex-col gap-2">
      <div className="text-center justify-center flex items-center gap-2">
        <h1 className="text-4xl font-bold">
          Welcome, <span className="text-primary">{user.name}</span>!
        </h1>

        <PostModal />
      </div>

      <div className="">
        {posts?.map((post) => (
          <PostList key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
