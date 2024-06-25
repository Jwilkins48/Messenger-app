import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProfileDetails() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:4000/api/users/uploads", formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const [file, setFile] = useState();

  return (
    <div className="rounded bg-neutral shadow   p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-user border border-primary py-1 px-3 rounded text-2xl shadow" />

          <button
            className="text-[21px] hover:underline"
            onClick={() =>
              navigate(`/profile/${user.name}`, {
                state: { post: user },
              })
            }
          >
            {user.name}
          </button>
        </div>

        <button>
          <i className="fa-regular fa-pen-to-square text-xl text-primary" />
        </button>
      </div>
      <div className="pt-5">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
}

export default ProfileDetails;
