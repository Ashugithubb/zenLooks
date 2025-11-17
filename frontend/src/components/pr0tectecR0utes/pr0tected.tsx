'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '@/app/redux/hook/hook';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const role = useAppSelector((state) => state.login.auth?.role);

  console.log("role:", role, "pathname:", pathname);

  useEffect(() => {
    if (!role) {
      router.replace('/services');
      return;
    }

    // ADMIN ONLY
    if (pathname === '/services/allbookings') {
      if (role !== 'Admin') {
        router.replace('/services');
      }
      return;
    }

    // USER ONLY
    if (pathname === '/services/mybookings') {
      if (role !== 'User') {
        router.replace('/services');
      }
      return;
    }

    // SERVICES is allowed for both
    if (pathname === '/services') return;

    // Anything else
    router.replace('/services');
  }, [role, pathname, router]);

  if (!role) return null;

  return children;
};

export default ProtectedRoute;
