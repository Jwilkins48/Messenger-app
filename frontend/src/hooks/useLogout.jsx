import { useAuthContext } from "../hooks/useAuthContext";
import { usePostContext } from "../hooks/usePostContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: postDispatch } = usePostContext();

  const logout = () => {
    // Remove from local storage
    localStorage.removeItem("user");
    // set global user to null
    dispatch({ type: "LOGOUT" });
    // set global user to null
    postDispatch({ type: "SET_POST", payload: null });
  };

  return { logout };
};
