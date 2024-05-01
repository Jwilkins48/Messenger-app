import { usePostContext } from "../hooks/usePostContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function PostList({ post }) {
  const { user } = useAuthContext();
  const { dispatch } = usePostContext();

  const currentUser = user.email == post.email;

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
            <p className="text-xs">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xl">{post?.post}</p>
      </div>

      <div className="absolute right-6">
        {currentUser ? <button onClick={handleDelete}>Delete</button> : ""}
      </div>
    </div>
  );
}

export default PostList;
