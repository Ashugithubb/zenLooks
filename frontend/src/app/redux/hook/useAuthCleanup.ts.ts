import { useEffect } from "react";
import Cookies from "js-cookie";

export default function useAuthCleanup() {
  const token = Cookies.get("access_token");
  console.log("token",token);
  if (!token) {
    console.log("Token missing → Clearing localStorage");
    localStorage.clear();
  }
}
