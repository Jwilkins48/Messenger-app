import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const { login } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <div className="flex justify-center items-center h-[calc(100vh-5rem)]">
      <div className="w-[60rem] h-[35rem] flex form">
        <div className="w-[60%] flex flex-col items-center justify-center left bg-primary">
          <h2 className="pb-4 text-4xl text-gray-300">Welcome Back!</h2>
          <div className="divider px-10 text-blue-200 ">
            <i className="fa-solid fa-ghost"></i>
          </div>
          <p className="text-lg text-blue-200 pt-4">
            Effortless Communication Made Simple
          </p>
        </div>
        <div className="w-[40%] flex flex-col items-center justify-center bg-gray-300 right">
          <h1 className="mb-4 text-2xl text-neutral">Login</h1>
          <form className="flex flex-col w-full px-12" onSubmit={onSubmit}>
            <input
              placeholder="Email"
              onChange={(e) => setEmail(e.currentTarget.value)}
              value={email}
              type="email"
              name="email"
              className="p-1 mb-4 input bg-gray-200"
            />
            <input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              type="password"
              name="password"
              className="p-1 mb-4 input bg-gray-200"
            />

            <button
              className="btn bg-[#2fb0af] border-0 text-white"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
