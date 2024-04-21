import { Routes, Route } from "react-router-dom";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Home from "../pages/Home";

function App() {
  return (
    <>
      <div>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
