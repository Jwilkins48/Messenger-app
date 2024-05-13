import { createContext, useReducer } from "react";

export const CommentContext = createContext();

export const commentReducer = (state, action) => {
  switch (action.type) {
    case "SET_COMMENT":
      return {
        comments: action?.payload,
      };
    case "CREATE_COMMENT":
      return {
        comments: [action?.payload, ...state.comments],
      };
    case "DELETE_COMMENT":
      return {
        comments: state.comments.filter((p) => p._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const CommentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commentReducer, {
    comments: null,
  });
  return (
    <CommentContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CommentContext.Provider>
  );
};
