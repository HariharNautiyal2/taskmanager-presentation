import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import { auth } from "../firebase";

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  user: null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));

    return auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: "USER", payload: user });
      }
    });
  }, [state.currentUser, auth]);

  return (
    <AuthContext.Provider
      value={{ currentUser: state.currentUser, dispatch, user: state.user }}
    >
      {children}
    </AuthContext.Provider>
  );
};