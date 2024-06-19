import { useAuthContext } from "../src/hooks/useAuthContext.jsx";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile.jsx";

function App() {
  const { user } = useAuthContext();
  return (
    <>
      <div>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile/:id"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/signUp"
              element={!user ? <SignUp /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
