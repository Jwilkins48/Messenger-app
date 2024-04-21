function Navbar() {
  return (
    <nav className="flex justify-between h-[5rem] border-b-2 p-5 items-center">
      <div>
        <a className="text-3xl text-primary" href="/">
          Messenger
        </a>
      </div>

      <div>
        <ul className="flex gap-3">
          <li>
            <a className="text-lg" href="/signUp">
              Sign Up
            </a>
          </li>
          <li>
            <a className="text-lg text-primary" href="/login">
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
