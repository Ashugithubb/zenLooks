"use client";
import useAuthCleanup from "@/app/api/useAuthCleanup";
export default function ClientAuthWrapper({ children }: { children: React.ReactNode }) {
  useAuthCleanup;
  return <>{children}</>;
}
