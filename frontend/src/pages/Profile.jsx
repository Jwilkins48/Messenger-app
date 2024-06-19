import { useAuthContext } from "../hooks/useAuthContext";

function Profile() {
  const { user } = useAuthContext();

  return <div>Profile {user.name}</div>;
}

export default Profile;
