import { useEffect } from "react";
import { useAppDispatch } from "./hook";
import Cookies from "js-cookie";
import { clearUser } from "../slice/login.slice";

export default function useAuthCleanup() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const token = Cookies.get("access_token");

    if (!token) {
      console.log("Token missing → Clearing localStorage");
      localStorage.clear();
      dispatch(clearUser());

    }
  }, []);
}