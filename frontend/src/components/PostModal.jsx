function PostModal({ newPostClick, setPost, error }) {
  return (
    <div>
      <button onClick={() => document.getElementById("my_modal_2").showModal()}>
        New Post <i className="fa-solid fa-plus" />
      </button>

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
    </div>
  );
}

export default PostModal;
