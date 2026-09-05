'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ShieldCheck, Lock, Mail, KeyRound, AlertCircle, ArrowLeft, Send,
  CheckCircle2, RefreshCw, Sparkles, Eye, EyeOff
} from 'lucide-react';
import Link from 'next/link';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loginMode, setLoginMode] = useState<'password' | 'otp'>('password');
  const [email, setEmail] = useState('vibhavsrivastav355@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // OTP state
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpMessage, setOtpMessage] = useState('');
  const [otpPreview, setOtpPreview] = useState<string | null>(null);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const errParam = searchParams.get('error');
    if (errParam) {
      setError(decodeURIComponent(errParam));
    }
  }, [searchParams]);

  // Direct Google OAuth Login
  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  // Email + Password Login
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin');
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Request OTP Code
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOtpMessage('');
    setOtpPreview(null);

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setOtpSent(true);
        setOtpMessage(data.message || 'OTP sent successfully!');
        if (data.otpPreview) {
          setOtpPreview(data.otpPreview);
          setOtpCode(data.otpPreview);
        }
      } else {
        setError(data.error || 'Failed to send OTP code.');
      }
    } catch (err) {
      setError('An error occurred sending OTP code.');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP Login
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpCode }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin');
      } else {
        setError(data.error || 'OTP verification failed');
      }
    } catch (err) {
      setError('An error occurred verifying OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-sky-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>

        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 mx-auto flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Admin Security Portal
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Authorized Single-Admin Authentication
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* 1. Direct Google Login Button */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-lg flex items-center justify-center gap-3 transition-all hover:scale-[1.01]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Sign in with Google
            </button>

            <div className="relative flex items-center justify-center my-3">
              <div className="border-t border-slate-800 w-full" />
              <span className="bg-slate-900 px-3 text-[11px] font-mono text-slate-500 uppercase shrink-0">
                Or choose credentials
              </span>
              <div className="border-t border-slate-800 w-full" />
            </div>
          </div>

          {/* 2. Login Mode Switcher */}
          <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setLoginMode('password');
                setError('');
              }}
              className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                loginMode === 'password'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" /> Mail Password
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginMode('otp');
                setError('');
              }}
              className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                loginMode === 'otp'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5" /> OTP Verification
            </button>
          </div>

          {otpMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{otpMessage}</span>
            </div>
          )}

          {/* MODE A: Email + Password Login */}
          {loginMode === 'password' && (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vibhavsrivastav355@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Password Input with Eye Visibility Toggle */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Mail Password
                  </label>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-500 hover:text-sky-400 transition-colors p-0.5"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-sm shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <Lock className="w-4 h-4" />
                {loading ? 'Authenticating...' : 'Sign In as Admin'}
              </button>
            </form>
          )}

          {/* MODE B: Email + OTP Code Login */}
          {loginMode === 'otp' && (
            <div className="space-y-4">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Admin Email for OTP Code
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="vibhavsrivastav355@gmail.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-sm shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    {loading ? 'Generating Code...' : 'Send Verification OTP'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  {otpPreview && (
                    <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/30 text-center space-y-1">
                      <p className="text-xs text-sky-300 font-mono flex items-center justify-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> Your Verification Code:
                      </p>
                      <p className="text-2xl font-mono font-bold tracking-widest text-sky-400">
                        {otpPreview}
                      </p>
                      <p className="text-[10px] text-slate-400">Valid for 10 minutes</p>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Enter 6-Digit OTP Code
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="123456"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {loading ? 'Verifying...' : 'Verify OTP & Sign In'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="w-full py-2 text-xs font-mono text-slate-400 hover:text-sky-400 transition-colors flex items-center justify-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Resend or change email address
                  </button>
                </form>
              )}
            </div>
          )}

          <div className="pt-4 border-t border-slate-800 text-center space-y-1">
            <p className="text-[11px] text-slate-500">
              Registered Admin Email: <code className="text-sky-400">{email}</code>
            </p>
            <p className="text-[10px] text-slate-500">
              Only authorized admin account can authenticate into this portal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-mono text-sm">
          <RefreshCw className="w-5 h-5 animate-spin text-sky-500 mr-2" /> Loading Admin Portal...
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
