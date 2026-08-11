import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import config from './config';
import './App.css';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('gridshare_theme') || 'dark');
  
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('gridshare_theme', newTheme);
  };

  React.useEffect(() => {
    document.body.className = theme;
  }, [theme]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/login' : '/api/signup';
      const res = await fetch(`${config.API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || 'Authentication failed');
      } else {
        localStorage.setItem('gridshare_token', data.token);
        localStorage.setItem('gridshare_role', data.role);
        localStorage.setItem('gridshare_username', data.username);
        
        // Redirect based on role and setup status
        if (data.needsSetup) {
          navigate('/setup');
        } else if (data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setError('Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`login-background ${theme}`}>
      <div className="login-container">
        <div style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 10 }}>
          <button 
            className="action-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{ borderRadius: '50%', width: '36px', height: '36px', padding: 0 }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div className="logo-glow"></div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px', position: 'relative' }}>GridShare</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Decentralized Energy Network</p>
        </div>

        <div className="auth-toggle">
          <button 
            className={`toggle-btn ${isLogin ? 'active' : ''}`}
            onClick={() => { setIsLogin(true); setError(''); }}
          >
            Sign In
          </button>
          <button 
            className={`toggle-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => { setIsLogin(false); setError(''); }}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div className="auth-error">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="input-group">
            <label>Username</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
            {!isLogin && <div className="input-hint">Must be at least 3 characters</div>}
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            {!isLogin && <div className="input-hint">Must be at least 6 characters</div>}
          </div>

          <button 
            type="submit" 
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="spinning-loader"></span>
            ) : isLogin ? 'Access Network' : 'Join Network'}
          </button>
        </form>
        
        <div className="auth-footer">
          <span className="pulse-active">●</span> Secure P2P Connection
        </div>
      </div>
    </div>
  );
}
