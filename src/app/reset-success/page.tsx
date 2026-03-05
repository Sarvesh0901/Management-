'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ResetPasswordSuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page
    router.push('/login');
  }, [router]);

  return null;
};

export default ResetPasswordSuccessPage;