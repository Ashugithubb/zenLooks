"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/app/redux/hook/hook";
import { clearUser } from "../slice/login.slice";


export default function useAuthCleanup() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Wait 5 seconds before checking token
    const timeout = setTimeout(() => {
      const token = Cookies.get("access_token");

      if (!token) {
        console.log("Token missing → Clearing localStorage and Redux (after 5s)");
        localStorage.clear();
        dispatch(clearUser());
      }
    }, 5000); // 5 seconds delay

    // cleanup
    return () => clearTimeout(timeout);
  }, [dispatch]);
}
