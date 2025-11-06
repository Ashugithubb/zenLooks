"use client";
import useAuthCleanup from "./apiCall";
export default function ClientAuthWrapper({ children }: { children: React.ReactNode }) {
  useAuthCleanup();
  return <>{children}</>;
}