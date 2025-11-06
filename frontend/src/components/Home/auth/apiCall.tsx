"use client";
import { useAppDispatch } from "@/app/redux/hook/hook";
import { clearUser } from "@/app/redux/slice/login.slice";
import { useEffect } from "react";

export default function useAuthCleanup() {
    const dispatch = useAppDispatch();
  useEffect(() => {
    async function checkAuth() {
      const res = await fetch(" /app/api/useAuthCleanup/route.ts");
      const data = await res.json();

      if (!data.token) {
        console.log("No token found → clearing localStorage");
        localStorage.clear();
         dispatch(clearUser());
      }
    }

    checkAuth();
  }, []);
}
