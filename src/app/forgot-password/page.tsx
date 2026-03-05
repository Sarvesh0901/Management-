'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ForgotPasswordPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page with forgot screen
    router.push('/login');
  }, [router]);

  return null;
};

export default ForgotPasswordPage;