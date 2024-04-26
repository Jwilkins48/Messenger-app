import { useAuthContext } from "../hooks/useAuthContext";

function Home() {
  const { user } = useAuthContext();

  const newPostClick = (e) => {
    e.preventDefault();
    console.log("new post");
  };

  return (
    <div>
      <div className=" py-10 text-center justify-center flex items-center gap-2">
        <h1 className="text-4xl font-bold">
          Welcome, <span className="text-primary">{user.name}</span>!
        </h1>
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          New Post <i className="fa-solid fa-plus" />
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <div className="textArea"></div>

            <button className="btn" onClick={newPostClick}>
              Post
            </button>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
}

export default Home;
