import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from './config';
import './App.css';

export default function HouseSetup() {
  const [capacity, setCapacity] = useState(10);
  const [ratedPower, setRatedPower] = useState(5);
  const [efficiency, setEfficiency] = useState(90);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const token = localStorage.getItem('gridshare_token');
  const role = localStorage.getItem('gridshare_role');

  useEffect(() => {
    if (!token) navigate('/');
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${config.API_BASE}/api/houses/configs`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          houseId: 'House C', // Standard default for new users
          capacity, 
          ratedPower, 
          efficiency 
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || 'Failed to save settings');
      } else {
        // Redirect to dashboard
        navigate(role === 'admin' ? '/admin' : '/dashboard');
      }
    } catch (err) {
      setError('Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-background dark">
      <div className="login-container" style={{ maxWidth: '500px' }}>
        
        <div style={{ textAlign: 'center' }}>
          <div className="logo-glow"></div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px', position: 'relative' }}>House Setup</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Configure your residential energy node</p>
        </div>

        {error && (
          <div className="auth-error">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="input-group">
            <label>Battery Capacity (kWh)</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="16" height="10" rx="2" ry="2"/><line x1="22" x2="22" y1="11" y2="13"/></svg>
              <input 
                type="number" 
                step="0.1"
                value={capacity}
                onChange={(e) => setCapacity(parseFloat(e.target.value))}
                placeholder="e.g., 13.5"
                required
              />
            </div>
            <div className="input-hint">Total energy storage rating of your battery unit</div>
          </div>
          
          <div className="input-group">
            <label>Rated Power (kW)</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              <input 
                type="number" 
                step="0.1"
                value={ratedPower}
                onChange={(e) => setRatedPower(parseFloat(e.target.value))}
                placeholder="e.g., 5.0"
                required
              />
            </div>
            <div className="input-hint">Maximum peak power output of your solar array</div>
          </div>

          <div className="input-group">
            <label>Efficiency (%)</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              <input 
                type="number" 
                max="100"
                min="1"
                value={efficiency}
                onChange={(e) => setEfficiency(parseFloat(e.target.value))}
                placeholder="e.g., 95"
                required
              />
            </div>
            <div className="input-hint">System conversion efficiency (typically 85-98%)</div>
          </div>

          <button 
            type="submit" 
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="spinning-loader"></span>
            ) : 'Complete Setup & Simulate'}
          </button>
        </form>
        
        <div className="auth-footer" style={{ borderTop: 'none', paddingTop: 0 }}>
          You can change these later in your dashboard
        </div>
      </div>
    </div>
  );
}
