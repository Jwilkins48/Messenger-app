import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

function Navbar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  return (
    <nav className="flex justify-between h-[5rem] border-b-2 p-5 items-center">
      <div>
        <a className="text-3xl text-primary" href="/">
          Messenger
        </a>
      </div>

      <div>
        {user ? (
          <div className="flex gap-5 items-center">
            <p>{user.email}</p>

            <button
              onClick={logout}
              className="border-2 border-primary rounded px-2 py-1"
            >
              Logout
            </button>
          </div>
        ) : (
          <ul className="flex gap-3">
            <li>
              <a className="text-lg" href="/signUp">
                Sign Up
              </a>
            </li>
            <li>
              <a className="text-lg" href="/login">
                Login
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
