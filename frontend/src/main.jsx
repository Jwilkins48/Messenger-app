import { AuthContextProvider } from "./Context/AuthContext.jsx";
import { PostContextProvider } from "./Context/PostContext.jsx";
import { CommentContextProvider } from "./Context/CommentContext.jsx";

import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <PostContextProvider>
        <CommentContextProvider>
          <App />
        </CommentContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
