import { PostContext } from "../Context/PostContext";
import { useContext } from "react";

export const usePostContext = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw Error("usePostContext must be used inside PostContextProvider");
  }

  return context;
};
