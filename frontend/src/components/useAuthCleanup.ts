"use client"
import { useEffect } from "react";

import Cookies from "js-cookie";
import { useAppDispatch } from "@/app/redux/hook/hook";
import { clearUser } from "@/app/redux/slice/login.slice";


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