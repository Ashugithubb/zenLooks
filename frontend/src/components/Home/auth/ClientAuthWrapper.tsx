"use client";

import useAuthCleanup from "@/components/useAuthCleanup";


export default function ClientAuthWrapper({ children }: { children: React.ReactNode }) {
  useAuthCleanup(); 
  return <>{children}</>;
}
