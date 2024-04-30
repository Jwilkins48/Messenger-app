import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { usePostContext } from "../hooks/usePostContext.jsx";
import PostList from "../components/PostList.jsx";
import PostModal from "../components/PostModal.jsx";
import ProfileDetails from "../components/ProfileDetails.jsx";
import FriendsList from "../components/FriendsList.jsx";

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
    <div className="py-4 px-6 justify-between flex">
      <div className="start w-[20%]">
        <ProfileDetails />
      </div>
      <div className="middle w-[60%]">
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
      <div className="w-[20%] ">
        <FriendsList />
      </div>
    </div>
  );
}

export default Home;
