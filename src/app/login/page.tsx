'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login, signup } from '../../utils/auth';

type Screen = 'login' | 'forgot' | 'forgot-success';

interface LoginPageProps {
  onLoginSuccess?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>('login');

  // Login / shared state
  const [mobile, setMobile] = useState('');
  const [pin, setPin] = useState(['', '', '', '']);
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ mobile: '', pin: '' });

  // Forgot state
  const [forgotMobile, setForgotMobile] = useState('');

  const pinRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ] as const;

  const handlePinChange = (
    index: number,
    value: string,
    pinState: string[],
    setPinState: (p: string[]) => void,
    refs: readonly React.RefObject<HTMLInputElement | null>[]
  ) => {
    const v = value.replace(/\D/g, '');
    const newPin = [...pinState];
    newPin[index] = v;
    setPinState(newPin);
    if (v && index < 3 && refs[index + 1].current) refs[index + 1].current?.focus();
  };

  const handlePinKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
    pinState: string[],
    setPinState: (p: string[]) => void,
    refs: readonly React.RefObject<HTMLInputElement | null>[]
  ) => {
    if (e.key === 'Backspace' && !pinState[index] && index > 0 && refs[index - 1].current) {
      const newPin = [...pinState];
      newPin[index - 1] = '';
      setPinState(newPin);
      refs[index - 1].current?.focus();
    }
  };

  const handleLogin = async () => {
    const newErrors = { mobile: '', pin: '' };
    let hasError = false;
    if (!mobile) { newErrors.mobile = 'Mobile number is required'; hasError = true; }
    else if (mobile.length !== 10) { newErrors.mobile = 'Please enter a 10-digit mobile number'; hasError = true; }
    const pinStr = pin.join('');
    if (!pinStr) { newErrors.pin = 'PIN is required'; hasError = true; }
    else if (pinStr.length !== 4) { newErrors.pin = 'PIN must be 4 digits'; hasError = true; }
    if (hasError) { setErrors(newErrors); return; }

    setErrors({ mobile: '', pin: '' });
    setLoading(true);
    try {
      // Using the login function from our auth utilities
      const success = await login(mobile, pinStr);
      if (success) {
        console.log('Login successful');
        if (onLoginSuccess) onLoginSuccess();
        router.push('/dashboard');
      } else {
        setErrors({ mobile: '', pin: 'Invalid credentials' });
      }
    } catch {
      setErrors({ mobile: '', pin: 'Network error, please try again' });
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async () => {
    setLoading(true);
    // Replace with your actual forgot PIN API call
    setTimeout(() => {
      setLoading(false);
      setScreen('forgot-success');
    }, 1500);
  };

  const switchScreen = (s: Screen) => {
    setErrors({ mobile: '', pin: '' });
    setScreen(s);
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

        /* ── PIN row ── */
        .lo-pin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .lo-pin-row {
          display: flex;
          gap: 12px;
          justify-content: center;
        }
        .lo-pin-box {
          width: 62px;
          height: 62px;
          text-align: center;
          font-size: 22px;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 16px;
          color: #fff;
          outline: none;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          font-family: 'DM Sans', sans-serif;
        }
        .lo-pin-box:focus {
          border-color: rgba(99, 102, 241, 0.7);
          background: rgba(99, 102, 241, 0.1);
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.2);
          transform: translateY(-4px) scale(1.05);
        }
        .lo-pin-box.filled {
          border-color: rgba(236, 72, 153, 0.55);
          background: rgba(236, 72, 153, 0.07);
        }

        /* ── Toggle ── */
        .lo-toggle {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 20px;
          color: rgba(255, 255, 255, 0.4);
          cursor: pointer;
          font-size: 11px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          letter-spacing: 0.5px;
          padding: 5px 14px;
          transition: all 0.25s;
        }
        .lo-toggle:hover {
          color: #fff;
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
        }

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
        }
        .lo-link:hover { color: #a5b4fc; }

        /* ── Divider ── */
        .lo-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0;
          color: rgba(255, 255, 255, 0.15);
          font-size: 12px;
        }
        .lo-divider::before, .lo-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.07);
        }

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

        /* ── Success screen ── */
        .lo-success-wrap {
          text-align: center;
          padding: 12px 0;
          animation: loFadeUp 0.6s ease both;
        }
        .lo-success-ring {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #ec4899);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          font-size: 30px;
          box-shadow: 0 16px 40px rgba(99, 102, 241, 0.4);
          animation: loPop 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes loPop {
          from { transform: scale(0) rotate(-20deg); opacity: 0; }
          to   { transform: scale(1) rotate(0);      opacity: 1; }
        }
        .lo-success-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 10px;
          letter-spacing: -0.5px;
        }
        .lo-success-body {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.38);
          line-height: 1.7;
          margin-bottom: 36px;
          max-width: 280px;
          margin-left: auto;
          margin-right: auto;
        }

        /* ── Responsive ── */
        @media (max-width: 480px) {
          .lo-card { padding: 40px 24px; border-radius: 22px; }
          .lo-pin-box { width: 54px; height: 54px; font-size: 18px; }
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

          {/* ── LOGIN ───────────────────────────────────── */}
          {screen === 'login' && (
            <>
              <div className="lo-heading">Welcome back</div>
              <div className="lo-subheading">Sign in to continue your journey</div>

              <div className="lo-field">
                <label className="lo-label">Mobile Number</label>
                <input
                  className="lo-input"
                  type="tel"
                  maxLength={10}
                  placeholder="Enter 10-digit number"
                  value={mobile}
                  onChange={e => setMobile(e.target.value.replace(/\D/g, '').substring(0, 10))}
                />
                {errors.mobile && <div className="lo-error">{errors.mobile}</div>}
              </div>

              <div className="lo-field">
                <div className="lo-pin-header">
                  <label className="lo-label" style={{ margin: 0 }}>Security PIN</label>
                  <button className="lo-toggle" onClick={() => setShowPin(!showPin)}>
                    {showPin ? 'Hide PIN' : 'Show PIN'}
                  </button>
                </div>
                <div className="lo-pin-row">
                  {pin.map((digit, i) => (
                    <input
                      key={i}
                      ref={pinRefs[i]}
                      className={`lo-pin-box${digit ? ' filled' : ''}`}
                      type={showPin ? 'text' : 'password'}
                      maxLength={1}
                      inputMode="numeric"
                      value={digit}
                      onChange={e => handlePinChange(i, e.target.value, pin, setPin, pinRefs)}
                      onKeyDown={e => handlePinKeyDown(i, e, pin, setPin, pinRefs)}
                    />
                  ))}
                </div>
                {errors.pin && <div className="lo-error">{errors.pin}</div>}
              </div>

              <button className="lo-btn" onClick={handleLogin} disabled={loading}>
                {loading ? <><span className="lo-spin" />Verifying...</> : 'Sign In'}
              </button>

              <div className="lo-footer">
                <button className="lo-link" onClick={() => switchScreen('forgot')}>Forgot PIN?</button>
                <Link href="/signup" className="lo-link" style={{ textDecoration: 'none' }}>Create account →</Link>
              </div>
            </>
          )}

          {/* ── FORGOT PIN ──────────────────────────────── */}
          {screen === 'forgot' && (
            <>
              <div className="lo-heading">Reset your PIN</div>
              <div className="lo-subheading">We'll send a reset code to your number</div>

              <div className="lo-field">
                <label className="lo-label">Mobile Number</label>
                <input
                  className="lo-input"
                  type="tel"
                  maxLength={10}
                  placeholder="Enter 10-digit number"
                  value={forgotMobile}
                  onChange={e => setForgotMobile(e.target.value.replace(/\D/g, '').substring(0, 10))}
                />
              </div>

              <button className="lo-btn" onClick={handleForgot} disabled={loading}>
                {loading ? <><span className="lo-spin" />Sending code...</> : 'Send Reset Code'}
              </button>

              <div className="lo-footer">
                <button className="lo-link" onClick={() => switchScreen('login')}>← Back to login</button>
              </div>
            </>
          )}

          {/* ── FORGOT SUCCESS ──────────────────────────── */}
          {screen === 'forgot-success' && (
            <div className="lo-success-wrap">
              <div className="lo-success-ring">✓</div>
              <div className="lo-success-title">Check your phone</div>
              <p className="lo-success-body">
                We've sent a reset code to <strong style={{ color: 'rgba(255,255,255,0.6)' }}>{forgotMobile || 'your number'}</strong>.
                It will expire in 10 minutes.
              </p>
              <button className="lo-btn" onClick={() => switchScreen('login')}>
                Back to Sign In
              </button>
              <div className="lo-footer" style={{ justifyContent: 'center' }}>
                <button className="lo-link" onClick={() => switchScreen('forgot')}>
                  Didn't receive it? Resend
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;