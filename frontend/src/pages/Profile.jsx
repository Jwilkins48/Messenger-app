import { useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function Profile() {
  // Access user info/props
  const { user } = useAuthContext();
  const { state } = useLocation();
  const { post } = state;

  console.log(post);

  return (
    <div className="text-center">
      <div className="flex justify-center pt-8 text-2xl">
        <h1>
          {post.email == user.email ? "My Profile" : `${post.author}'s Profile`}
        </h1>
      </div>
    </div>
  );
}

export default Profile;
