import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LogIn, Mail, Lock } from 'lucide-react';

export const Login = () => {
  const { handleGoogleAuth, navigate, setUser } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onGoogleClick = async () => {
    setLoading(true);
    await handleGoogleAuth();
    setLoading(false);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const nameFromEmail = email.split('@')[0] || "Founder";
      setUser({
        uid: "user_" + Math.random().toString(36).substring(2, 8),
        name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
        email: email,
        isDemo: true
      });

      const alreadyRegistered = localStorage.getItem('foundry_founder_registered') === 'true';
      if (alreadyRegistered) {
        navigate('NEW_IDEA');
      } else {
        navigate('FOUNDER_INFO');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="page-content animate-fade-in" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {/* Top Greeting */}
      <div className="greeting-header">
        Hello <strong>Founder</strong>,
      </div>

      {/* Center Card Box */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', margin: 'auto 0' }}>
        <div 
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '28px',
            padding: '36px 36px 32px 36px',
            width: '100%',
            maxWidth: '440px',
            boxShadow: '0 16px 40px rgba(0,0,0,0.06)',
            border: '1px solid #f0f0f0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* Top Login Icon Box */}
          <div 
            style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '14px', 
              border: '1px solid #e2e8f0', 
              backgroundColor: '#ffffff',
              display: 'flex', 
              alignItems: 'center', 
              justify: 'center',
              marginBottom: '20px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
            }}
          >
            <LogIn size={20} style={{ color: '#0f172a' }} />
          </div>

          {/* Title */}
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '24px', letterSpacing: '-0.5px' }}>
            {isSignUp ? "Create Your Account." : "Login First. Tell Us Next."}
          </h2>

          <form onSubmit={handleEmailSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Email Input */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                backgroundColor: '#f8fafc', 
                border: '1px solid #e2e8f0', 
                borderRadius: '14px', 
                padding: '12px 16px' 
              }}
            >
              <Mail size={18} style={{ color: '#94a3b8', flexShrink: 0 }} />
              <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  color: '#0f172a',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* Password Input */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                backgroundColor: '#f8fafc', 
                border: '1px solid #e2e8f0', 
                borderRadius: '14px', 
                padding: '12px 16px' 
              }}
            >
              <Lock size={18} style={{ color: '#94a3b8', flexShrink: 0 }} />
              <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  color: '#0f172a',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* Links Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#475569', marginTop: '2px', padding: '0 2px' }}>
              <button 
                type="button" 
                onClick={() => setIsSignUp(!isSignUp)}
                style={{ background: 'none', border: 'none', color: '#1e293b', fontWeight: '600', cursor: 'pointer', padding: 0 }}
              >
                {isSignUp ? "Already have an account? Login" : "New user? Create an account."}
              </button>

              {!isSignUp && (
                <button 
                  type="button" 
                  onClick={() => alert("Password reset link sent to your email!")}
                  style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: 0 }}
                >
                  Forgot password?
                </button>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: '#161c2d',
                color: '#ffffff',
                border: 'none',
                borderRadius: '14px',
                padding: '14px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                marginTop: '8px',
                boxShadow: '0 4px 12px rgba(15,23,42,0.15)',
                transition: 'all 0.2s ease'
              }}
            >
              {loading ? "Processing..." : isSignUp ? "Create Account" : "Get Started"}
            </button>
          </form>

          {/* Clean Solid Divider Line */}
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', margin: '22px 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
            <span style={{ fontSize: '12px', color: '#64748b', padding: '0 14px', fontWeight: '500', whiteSpace: 'nowrap' }}>
              Or sign in with
            </span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
          </div>

          {/* Lengthier Google Sign In Button */}
          <button
            type="button"
            onClick={onGoogleClick}
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              gap: '12px',
              width: '100%',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '14px',
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#0f172a',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
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
                d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>

      <div style={{ textAlign: 'center', color: '#888888', fontSize: '13px', paddingBottom: '8px' }}>
        Foundry Authentication • Secure & Minimal
      </div>
    </div>
  );
};

export default Login;
