"use client";

import useAuthCleanup from "../../../app/redux/hook/useAuthCleanup.ts";

export default function ClientAuthWrapper({ children }: { children: React.ReactNode }) {
  useAuthCleanup(); 
  return <>{children}</>;
}
