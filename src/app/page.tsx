'use client';

'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#050508', padding: '24px', marginTop: 64 }}>
      <div 
        style={{ 
          maxWidth: '600px',
          margin: '0 auto',
          background: 'rgba(255, 255, 255, 0.045)',
          backdropFilter: 'blur(64px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '28px',
          padding: '40px 30px',
          boxShadow: '0 40px 80px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
          textAlign: 'center'
        }}
      >
        <h1 style={{ color: '#fff', marginBottom: '16px', fontSize: '2rem' }}>Welcome to Secure Portal</h1>
        <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '30px' }}>
          A secure platform with modern authentication and personalized dashboard
        </p>
        
        <div style={{ marginTop: '30px' }}>
          <Link href="/login" passHref>
            <button 
              type="button"
              style={{ 
                marginRight: '16px',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
                border: 'none',
                borderRadius: '14px',
                padding: '12px 24px',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Login
            </button>
          </Link>
          <Link href="/signup" passHref>
            <button 
              type="button"
              style={{ 
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '14px',
                color: '#fff',
                padding: '12px 24px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
      <footer style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.4)', background: 'transparent', marginTop: '40px' }}>
        Secure Portal ©{new Date().getFullYear()} Created with Next.js and Ant Design
      </footer>
    </div>
  );
}