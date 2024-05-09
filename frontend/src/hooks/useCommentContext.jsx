import { CommentContext } from "../Context/CommentContext";
import { useContext } from "react";

export const useCommentContext = () => {
  const context = useContext(CommentContext);

  if (!context) {
    throw Error("useCommentContext must be used inside CommentContextProvider");
  }

  return context;
};
