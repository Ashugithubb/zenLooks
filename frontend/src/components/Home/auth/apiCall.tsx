"use client";

import { useAppDispatch } from "@/app/redux/hook/hook";
import { clearUser } from "@/app/redux/slice/login.slice";
import { useEffect } from "react";

export default function useAuthCleanup() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/useAuthCleanup");
        const data = await res.json();
        if (!data.token) {
          console.log("No token found → clearing localStorage");
          localStorage.clear();
          dispatch(clearUser());
        }

      }
      catch (error) {
        console.log("error",error);
      }



    }

    checkAuth();
  }, []);
}
