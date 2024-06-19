import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const { login, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <div className="flex justify-center items-center h-[calc(100vh-5rem)]">
      <div className="w-[20%] h-[35rem] rounded border-primary border flex flex-col items-center justify-center ">
        <h1 className="mb-4 text-2xl text-primary">Login</h1>
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

          <button className="btn bg-primary border-0 text-white" type="submit">
            Submit
          </button>
          <div className="pt-2 text-accent">{error ? error : ""}</div>
        </form>
      </div>
    </div>
  );
}

export default Login;
