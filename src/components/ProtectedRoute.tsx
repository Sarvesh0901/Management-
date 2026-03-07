'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/utils/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check auth on client side only
    const token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('user');
    const hasAuth = !!(token && userStr);
    
    if (!hasAuth) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Don't render anything until mounted on client
  if (!mounted) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: '#050508'
      }}>
        <div 
          style={{ 
            background: 'rgba(255, 255, 255, 0.045)',
            backdropFilter: 'blur(64px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '28px',
            padding: '40px',
            textAlign: 'center'
          }}
        >
          <h2 style={{ color: '#fff' }}>Access Denied</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginTop: '10px' }}>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;