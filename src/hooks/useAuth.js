import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../state/Auth/Auth";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const Auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("token") === null ||
      localStorage.getItem("token") === undefined
    ) {
      dispatch(logout());
      Navigate("/");
    } else {
      if (
        localStorage.getItem("user") === null ||
        localStorage.getItem("user") === undefined
      ) {
        dispatch(logout());

        Navigate("/");
      } else {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log("abc");
        console.log(Auth);
        dispatch(login({ user: user }));
      }
    }
    setLoading(false);
  }, []);
  const setAuth = (user, token) => {
    setLoading(true);
    dispatch(login({ user: user }));
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setLoading(false);
  };

  const removeAuth = () => {
    setLoading(true);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    setLoading(false);
  };

  return { Auth, setAuth, removeAuth, loading };
};

export default useAuth;
