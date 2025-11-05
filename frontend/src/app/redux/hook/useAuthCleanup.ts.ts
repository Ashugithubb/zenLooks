"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function useAuthCleanup() {
  useEffect(() => {
    const token = Cookies.get("access_token");

    if (!token) {
      console.log("Token missing → Clearing localStorage");
      localStorage.clear();
    }
  }, []);
}
