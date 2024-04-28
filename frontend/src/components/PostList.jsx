import { usePostContext } from "../hooks/usePostContext";
import { useAuthContext } from "../hooks/useAuthContext";

function PostList({ post }) {
  const { user } = useAuthContext();
  const { dispatch } = usePostContext();

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
    <div className="border mx-20 p-6 my-6 flex justify-between">
      <p>{user?.name}</p>
      <div>{post?.post}</div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default PostList;
