'use client';

import { useState } from 'react';
import { Form, Input, Button, Layout, Typography } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/utils/api';

const { Content } = Layout;
const { Title, Text } = Typography;

const SignupPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{pin?: string; confirmPin?: string}>({});

  const onFinish = async (values: any) => {
    setLoading(true);
    setErrors({});
    try {
      console.log('📝 Signup attempt with:', { 
        name: values.name, 
        email: values.email,
        mobile: values.mobile,
        pin: values.pin
      });

      // Validate PIN length
      if (values.pin.length !== 4) {
        setErrors({ pin: 'PIN must be exactly 4 digits' });
        setLoading(false);
        return;
      }

      console.log('✅ Validation passed. Proceeding with signup...');

      // Call register with proper parameters
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://management-backend-seven.vercel.app/api'}/auth/signup`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          mobile: values.mobile,
          pin: values.pin,
          password: values.pin // Also use as password for compatibility
        })
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || data.details?.[0]?.msg || 'Registration failed');
      }

      console.log('✅ Signup successful:', data);

      // Store token and user data
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Show success animation then redirect
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (error: any) {
      console.error('❌ Signup error:', error);
      if (error.message.includes('Gmail')) {
        setErrors({ pin: error.message });
      } else {
        setErrors({ pin: error.message || 'Registration failed. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .lo-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #050508;
          overflow: hidden;
          position: relative;
          font-family: 'DM Sans', sans-serif;
          padding: 20px;
        }

        /* ── Aurora blobs ── */
        .lo-aurora {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .lo-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        .lo-blob-1 {
          width: 680px; height: 680px;
          background: radial-gradient(ellipse, rgba(99, 102, 241, 0.38) 0%, transparent 70%);
          top: -220px; left: -120px;
          animation: loBlob1 14s infinite;
        }
        .lo-blob-2 {
          width: 580px; height: 580px;
          background: radial-gradient(ellipse, rgba(236, 72, 153, 0.28) 0%, transparent 70%);
          bottom: -200px; right: -100px;
          animation: loBlob2 17s infinite;
        }
        .lo-blob-3 {
          width: 480px; height: 480px;
          background: radial-gradient(ellipse, rgba(6, 182, 212, 0.22) 0%, transparent 70%);
          top: 50%; left: 55%;
          transform: translate(-50%, -50%);
          animation: loBlob3 11s infinite;
        }
        .lo-blob-4 {
          width: 320px; height: 320px;
          background: radial-gradient(ellipse, rgba(167, 139, 250, 0.2) 0%, transparent 70%);
          top: 15%; right: 20%;
          animation: loBlob1 19s infinite reverse;
        }

        @keyframes loBlob1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(60px, 40px) scale(1.08); }
          66%       { transform: translate(-30px, 60px) scale(0.95); }
        }
        @keyframes loBlob2 {
          0%, 100% { transform: translate(0, 0) scale(1.05); }
          50%       { transform: translate(-60px, -50px) scale(1); }
        }
        @keyframes loBlob3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50%       { transform: translate(-44%, -58%) scale(1.18); }
        }

        /* ── Noise overlay ── */
        .lo-noise {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3Cfilter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
        }

        /* ── Card ── */
        .lo-card {
          position: relative;
          z-index: 10;
          width: 440px;
          max-width: 100%;
          background: rgba(255, 255, 255, 0.045);
          backdrop-filter: blur(64px);
          -webkit-backdrop-filter: blur(64px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 28px;
          padding: 52px 44px;
          box-shadow:
            0 40px 80px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          animation: loCardIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes loCardIn {
          from { opacity: 0; transform: translateY(32px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }

        /* ── Branding ── */
        .lo-logo {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.3);
          text-transform: uppercase;
          letter-spacing: 4px;
          text-align: center;
          margin-bottom: 36px;
        }

        .lo-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.8px;
          margin-bottom: 6px;
          animation: loFadeUp 0.6s ease both;
        }
        .lo-subheading {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.38);
          margin-bottom: 36px;
          animation: loFadeUp 0.6s 0.05s ease both;
        }

        @keyframes loFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Fields ── */
        .lo-field {
          margin-bottom: 22px;
          animation: loFadeUp 0.5s ease both;
        }
        .lo-field:nth-of-type(1) { animation-delay: 0.1s; }
        .lo-field:nth-of-type(2) { animation-delay: 0.15s; }
        .lo-field:nth-of-type(3) { animation-delay: 0.2s; }
        .lo-field:nth-of-type(4) { animation-delay: 0.25s; }
        .lo-field:nth-of-type(5) { animation-delay: 0.3s; }
        .lo-field:nth-of-type(6) { animation-delay: 0.35s; }

        .lo-label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 10px;
        }

        .lo-input {
          width: 100%;
          padding: 14px 18px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 14px;
          color: #fff;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
        }
        .lo-input:focus {
          border-color: rgba(99, 102, 241, 0.65);
          background: rgba(99, 102, 241, 0.09);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
        }
        .lo-input::placeholder { color: rgba(255, 255, 255, 0.18); }

        /* ── Error ── */
        .lo-error {
          color: #f87171;
          font-size: 12px;
          margin-top: 7px;
          font-weight: 500;
          padding-left: 2px;
        }

        /* ── Primary button ── */
        .lo-btn {
          width: 100%;
          padding: 17px;
          border: none;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.3px;
          color: #fff;
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
          background-size: 200% 200%;
          transition: transform 0.25s, box-shadow 0.25s;
          animation: loGradMove 5s ease infinite, loFadeUp 0.5s 0.3s ease both;
          margin-top: 8px;
          position: relative;
          overflow: hidden;
        }
        .lo-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
          pointer-events: none;
        }
        .lo-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 40px rgba(99, 102, 241, 0.35);
        }
        .lo-btn:active { transform: translateY(0); }
        .lo-btn:disabled { opacity: 0.55; pointer-events: none; }

        @keyframes loGradMove {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }

        /* ── Footer links ── */
        .lo-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 22px;
          animation: loFadeUp 0.5s 0.35s ease both;
        }
        .lo-link {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          color: rgba(99, 102, 241, 0.75);
          transition: color 0.25s;
          padding: 0;
          text-decoration: none;
        }
        .lo-link:hover { color: #a5b4fc; }

        /* ── Spinner ── */
        .lo-spin {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.25);
          border-top-color: #fff;
          border-radius: 50%;
          animation: loSpin 0.6s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }
        @keyframes loSpin { to { transform: rotate(360deg); } }

        /* ── Responsive ── */
        @media (max-width: 480px) {
          .lo-card { padding: 40px 24px; border-radius: 22px; }
        }
      `}</style>

      <div className="lo-root">
        {/* Aurora background */}
        <div className="lo-aurora">
          <div className="lo-blob lo-blob-1" />
          <div className="lo-blob lo-blob-2" />
          <div className="lo-blob lo-blob-3" />
          <div className="lo-blob lo-blob-4" />
        </div>
        <div className="lo-noise" />

        <div className="lo-card">
          <div className="lo-logo">Secure Portal</div>

          <div className="lo-heading">Create account</div>
          <div className="lo-subheading">Join us — it only takes a minute</div>

          <Form
            name="signup"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <div className="lo-field">
              <label className="lo-label">Full Name</label>
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please enter your name!' }]}
              >
                <Input 
                  className="lo-input"
                  prefix={<UserOutlined style={{ color: 'rgba(255,255,255,0.65)' }} />} 
                  placeholder="Your full name"
                />
              </Form.Item>
            </div>

            <div className="lo-field">
              <label className="lo-label">Email Address</label>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email!' },
                  { 
                    pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                    message: 'Please use only your Gmail address'
                  }
                ]}
              >
                <Input 
                  className="lo-input"
                  prefix={<MailOutlined style={{ color: 'rgba(255,255,255,0.65)' }} />} 
                  placeholder="you@gmail.com"
                />
              </Form.Item>
            </div>

            <div className="lo-field">
              <label className="lo-label">Mobile Number</label>
              <Form.Item
                name="mobile"
                rules={[
                  { required: true, message: 'Please enter your mobile number!' },
                  { pattern: /^\d{10}$/, message: 'Please enter a valid 10-digit mobile number' }
                ]}
              >
                <Input 
                  className="lo-input"
                  prefix={<PhoneOutlined style={{ color: 'rgba(255,255,255,0.65)' }} />} 
                  placeholder="Enter 10-digit number"
                  maxLength={10}
                />
              </Form.Item>
            </div>

            <div className="lo-field">
              <label className="lo-label">Set PIN</label>
              <Form.Item
                name="pin"
                rules={[
                  { required: true, message: 'Please set a 4-digit PIN!' },
                  { pattern: /^\d{4}$/, message: 'PIN must be exactly 4 digits' }
                ]}
              >
                <Input.Password
                  className="lo-input"
                  prefix={<LockOutlined style={{ color: 'rgba(255,255,255,0.65)' }} />}
                  placeholder="Enter 4-digit PIN"
                  maxLength={4}
                />
                {errors.pin && <div className="lo-error">{errors.pin}</div>}
              </Form.Item>
            </div>

            <div className="lo-field">
              <label className="lo-label">Confirm PIN</label>
              <Form.Item
                name="confirmPin"
                dependencies={['pin']}
                rules={[
                  { required: true, message: 'Please confirm your PIN!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('pin') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('PINs do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password
                  className="lo-input"
                  prefix={<LockOutlined style={{ color: 'rgba(255,255,255,0.65)' }} />}
                  placeholder="Confirm 4-digit PIN"
                  maxLength={4}
                />
              </Form.Item>
            </div>

            <button 
              className="lo-btn" 
              type="submit"
              disabled={loading}
            >
              {loading ? <><span className="lo-spin" />Creating account...</> : 'Create Account'}
            </button>

            <div className="lo-footer">
              <Link href="/login" className="lo-link">← Back to login</Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
