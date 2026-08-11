import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import config from './config'
import './App.css'

// Professional SVG Icons
const Icons = {
  Solar: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
  ),
  Demand: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
  ),
  Battery: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="10" x="2" y="7" rx="2" ry="2"/><line x1="22" x2="22" y1="11" y2="13"/></svg>
  ),
  Price: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  ),
  Tree: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 10c0-4.4-3.6-8-8-8S1 5.6 1 10c0 3.7 2.5 6.8 6 7.7V22h4v-4.3c3.5-.9 6-4 6-7.7z"/><path d="M7 10v.01"/><path d="M11 10v.01"/></svg>
  ),
  Share: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12V4a2 2 0 0 1 2-2h10l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4"/><path d="M14 2v4h4"/><path d="m16 12-4 4-4-4"/><path d="M12 8v8"/></svg>
  ),
  Zap: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
  ),
  Settings: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h0a2 2 0 0 0-2.22 2v0a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2v0a2 2 0 0 0-2.22-2h0a2 2 0 0 0-2 2.22v0a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2v0a2 2 0 0 0-2.22 2h0a2 2 0 0 0 2 2.22v0a2 2 0 0 1 2 2h0a2 2 0 0 1-2 2v0a2 2 0 0 0-2 2.22h0a2 2 0 0 0 2.22 2h0a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2v0a2 2 0 0 0 2 2.22h0a2 2 0 0 0 2.22-2v0a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v0a2 2 0 0 0 2.22 2h0a2 2 0 0 0 2-2.22v0a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v0a2 2 0 0 0 2.22-2h0a2 2 0 0 0-2-2.22v0a2 2 0 0 1-2-2h0a2 2 0 0 1 2-2v0a2 2 0 0 0 2-2.22h0a2 2 0 0 0-2.22-2h0a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2v0a2 2 0 0 0-2-2.22z"/><circle cx="12" cy="12" r="3"/></svg>
  )
}

const SearchBar = React.memo(({ value, onChange }) => {
  return (
    <div className="search-box">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.3-4.3"/>
      </svg>
      <input 
        type="text" 
        placeholder="Search residences or status..." 
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
})

export default function UserDashboard() {
  const [serverState, setServerState] = useState(null)
  const [selectedHouseId, setSelectedHouseId] = useState(null)
  const [theme, setTheme] = useState(localStorage.getItem('gridshare_theme') || 'dark')
  const [isRTL, setIsRTL] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [houseSpecs, setHouseSpecs] = useState({
    capacity: 10,
    ratedPower: 5,
    efficiency: 90
  })
  const [allConfigs, setAllConfigs] = useState([])
  const [configHouseId, setConfigHouseId] = useState('House C')
  const [savingSettings, setSavingSettings] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [saveError, setSaveError] = useState('')
  const lastManualUpdate = React.useRef(0) // Timestamp for ignoring stale polls
  
  const navigate = useNavigate()
  const token = localStorage.getItem('gridshare_token')
  const username = localStorage.getItem('gridshare_username') || 'User'

  useEffect(() => {
    if (!token) navigate('/')
    document.body.className = theme
  }, [token, theme, navigate])

  useEffect(() => {
    if (!token) return;

    const fetchState = async () => {
      const pollStartTime = Date.now();
      try {
        const res = await fetch(`${config.API_BASE}/api/state`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('gridshare_token')
          navigate('/')
          return
        }
        const data = await res.json()
        // Proper Developer Guard: Only apply if poll started AFTER manual update
        if (pollStartTime > lastManualUpdate.current) {
          setServerState(data)
        }
      } catch (err) {
        console.error('Error fetching state:', err)
      }
    }
    
    const fetchUserSpecs = async () => {
      try {
        const res = await fetch(`${config.API_BASE}/api/houses/configs`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (res.ok) {
          const data = await res.json()
          setAllConfigs(data)
          // Default form to House C's data
          const cConfig = data.find(c => c.house_id === configHouseId)
          if (cConfig) {
            setHouseSpecs({
              capacity: cConfig.battery_capacity,
              ratedPower: cConfig.rated_power,
              efficiency: cConfig.efficiency
            })
          }
        }
      } catch (err) {
        console.error('Error fetching specs:', err)
      }
    }
    
    fetchState()
    fetchUserSpecs()
    const timer = setInterval(fetchState, 1000)
    return () => clearInterval(timer)
  }, [token, navigate, configHouseId])

  const handleLogout = () => {
    localStorage.removeItem('gridshare_token')
    localStorage.removeItem('gridshare_role')
    localStorage.removeItem('gridshare_username')
    navigate('/')
  }

  const updateSettings = async (updates) => {
    if (!token) return;
    lastManualUpdate.current = Date.now();
    
    // Optimistic UI update for immediate response
    setServerState(prev => prev ? { ...prev, ...updates } : null);

    try {
      const res = await fetch(`${config.API_BASE}/api/settings`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(updates)
      });
      
      if (res.ok) {
        const data = await res.json();
        // Use the actual server-confirmed state
        setServerState(prev => prev ? { ...prev, ...data.state } : data.state);
      }
    } catch (err) {
      console.error('Failed to update settings:', err)
    }
  }

  const handleSpecChange = async (e) => {
    e.preventDefault()
    if (!token) return
    setSavingSettings(true)
    try {
      const res = await fetch(`${config.API_BASE}/api/houses/configs`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          houseId: configHouseId,
          ...houseSpecs
        })
      })
      if (res.ok) {
        setShowSuccess(true)
        setSaveError('')
        setTimeout(() => setShowSuccess(false), 3000)
        // Refresh local allConfigs
        const resList = await fetch(`${config.API_BASE}/api/houses/configs`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (resList.ok) setAllConfigs(await resList.json());
      } else {
        const errData = await res.json()
        setSaveError(errData.error || 'Failed to update specs')
      }
    } catch (err) {
      console.error('Failed to update house settings:', err)
      setSaveError('Server connection lost')
    } finally {
      setSavingSettings(false)
    }
  }

  const exportToCSV = () => {
    if (!serverState) return;
    const headers = ['Residence', 'Production', 'Consumption', 'Balance', 'Battery']
    const rows = serverState.housesData.map(h => [h.id, h.gen, h.dem, h.balance, h.battery])
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n")
    const link = document.createElement("a")
    link.setAttribute("href", encodeURI(csvContent))
    link.setAttribute("download", `gridshare_report_${new Date().getTime()}.csv`)
    link.click()
  }

  if (!serverState) {
    return (
      <div className={`app-container ${theme}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' }}>
        <div style={{ color: 'var(--text-primary)', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="pulse-active" style={{ color: 'var(--accent-blue)' }}>●</div> 
          Connecting to Simulation Server...
        </div>
      </div>
    )
  }

  const { 
    isAutoMode, weatherIdx, activeCommunityName, sunIntensity, utilityPrice,
    currentTime, weather, WEATHER_TYPES, housesData, communityMetrics 
  } = serverState;

  const filteredHouses = housesData.filter(h => 
    h.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      className={`app-container ${theme}`} 
      dir={isRTL ? 'rtl' : 'ltr'} 
      onClick={() => setSelectedHouseId(null)}
    >
      <aside className="sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="logo-section">
          <h1>GridShare</h1>
          <p>Decentralized Energy Network</p>
          
          <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
            <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-blue)', display: 'block', marginBottom: '4px' }}>Connected To</label>
            <div style={{ fontWeight: 600, fontSize: '13px' }}>{activeCommunityName}</div>
          </div>
        </div>

        <div className="control-group">
          <div className="stat-card" style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div className="stat-label" style={{ margin: 0 }}>Current Weather</div>
            </div>
            
            <div className="weather-selector">
              {WEATHER_TYPES.map((wt, idx) => (
                <button 
                  key={wt.id}
                  className={`weather-btn ${weatherIdx === idx ? 'active' : ''}`}
                  style={{ opacity: isAutoMode && weatherIdx !== idx ? 0.3 : 1, cursor: 'pointer' }}
                  onClick={() => updateSettings({ weatherIdx: idx, isAutoMode: false })}
                >
                  <span style={{ fontSize: '18px' }}>{wt.icon}</span>
                  <span style={{ fontSize: '10px', marginTop: '4px', fontWeight: 600 }}>{wt.label}</span>
                </button>
              ))}
            </div>

            <div 
              style={{ 
                marginTop: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '12px',
                background: isAutoMode ? 'rgba(59, 130, 246, 0.05)' : 'rgba(245, 158, 11, 0.05)',
                borderRadius: '10px',
                border: '1px solid var(--glass-border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className={`pulse-active ${isAutoMode ? 'active' : ''}`} style={{ width: '8px', height: '8px', borderRadius: '50%', background: isAutoMode ? 'var(--accent-blue)' : 'var(--accent-yellow)' }} />
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.5px' }}>AUTO SIMULATION</span>
              </div>
              <div 
                className={`toggle-switch ${isAutoMode ? 'active' : ''}`} 
                onClick={() => updateSettings({ isAutoMode: !isAutoMode })}
              >
                <div className="toggle-knob"></div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 'bold', marginTop: '16px', color: isAutoMode ? 'var(--accent-blue)' : 'var(--accent-yellow)' }}>
              <span style={{ color: 'inherit' }}>●</span> 
              {isAutoMode ? `Cycling: ${weather.label}` : 'Manual Control Active'}
            </div>
          </div>

          <div className="control-item" style={{ opacity: isAutoMode ? 0.6 : 1, pointerEvents: isAutoMode ? 'none' : 'auto', marginTop: '20px' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>SOLAR INTENSITY</span> 
              <span style={{ color: isAutoMode ? 'var(--accent-blue)' : 'var(--accent-yellow)', fontSize: '11px', fontWeight: 800 }}>
                {Math.round(sunIntensity * 100)}%
              </span>
            </label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={sunIntensity} 
              onChange={(e) => updateSettings({ sunIntensity: parseFloat(e.target.value), isAutoMode: false })}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>

          <div className="control-item" style={{ marginTop: '16px' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>UTILITY PRICE</span> 
              <span style={{ color: 'var(--accent-green)', fontSize: '11px', fontWeight: 800 }}>
                ${utilityPrice}/kWh
              </span>
            </label>
            <input 
              type="range" 
              min="0.1" 
              max="0.4" 
              step="0.01" 
              value={utilityPrice} 
              onChange={(e) => updateSettings({ utilityPrice: parseFloat(e.target.value) })} 
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>

          <div className="stat-card" style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.05)', marginTop: '20px', border: showSuccess ? '1px solid var(--accent-green)' : '1px solid var(--glass-border)', transition: 'all 0.3s ease' }} id="residence-config">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="stat-label" style={{ margin: 0 }}>Device Configuration</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {saveError && <span style={{ color: '#ff4444', fontSize: '10px', fontWeight: 'bold' }}>{saveError}</span>}
                {showSuccess && <span style={{ color: 'var(--accent-green)', fontSize: '10px', fontWeight: 'bold' }}>SAVED!</span>}
              </div>
            </div>
            <form onSubmit={handleSpecChange} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '10px', color: 'var(--accent-blue)', fontWeight: 800 }}>SELECT RESIDENCE</label>
                <select 
                  value={configHouseId} 
                  onChange={(e) => {
                    const hid = e.target.value;
                    setConfigHouseId(hid);
                    const cfg = allConfigs.find(c => c.house_id === hid);
                    if (cfg) {
                      setHouseSpecs({
                        capacity: cfg.battery_capacity,
                        ratedPower: cfg.rated_power,
                        efficiency: cfg.efficiency
                      });
                    }
                  }}
                  style={{ background: 'var(--bg-accent)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '10px', borderRadius: '4px', fontSize: '13px', fontWeight: 600 }}
                >
                  {['House A', 'House B', 'House C', 'House D', 'House E'].map(id => (
                    <option key={id} value={id}>{id}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>BATTERY CAPACITY (KWH)</label>
                <input 
                  type="number" step="0.1" value={houseSpecs.capacity} 
                  onChange={(e) => {
                    const val = e.target.value === '' ? '' : parseFloat(e.target.value);
                    setHouseSpecs({...houseSpecs, capacity: val});
                  }}
                  style={{ background: 'var(--bg-accent)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '6px', borderRadius: '4px', fontSize: '12px' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>RATED POWER (KW)</label>
                <input 
                  type="number" step="0.1" value={houseSpecs.ratedPower} 
                  onChange={(e) => {
                    const val = e.target.value === '' ? '' : parseFloat(e.target.value);
                    setHouseSpecs({...houseSpecs, ratedPower: val});
                  }}
                  style={{ background: 'var(--bg-accent)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '6px', borderRadius: '4px', fontSize: '12px' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>EFFICIENCY (%)</label>
                <input 
                  type="number" step="0.1" value={houseSpecs.efficiency} 
                  onChange={(e) => {
                    const val = e.target.value === '' ? '' : parseFloat(e.target.value);
                    setHouseSpecs({...houseSpecs, efficiency: val});
                  }}
                  style={{ background: 'var(--bg-accent)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '6px', borderRadius: '4px', fontSize: '12px' }}
                />
              </div>
              <button 
                type="submit" 
                className="export-btn" 
                style={{ width: '100%', padding: '8px', fontSize: '11px', marginTop: '8px', background: 'var(--accent-blue)' }}
                disabled={savingSettings}
              >
                {savingSettings ? 'Applying...' : 'Update Specifications'}
              </button>
            </form>
          </div>

          <button className="export-btn" onClick={exportToCSV} style={{ marginTop: 'var(--s-4)', padding: '12px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            Export Network Data
          </button>
        </div>

        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--glass-border)', paddingTop: '20px' }}>
          <div className="stat-label">System Health</div>
          <div style={{ fontSize: '13px', color: 'var(--accent-green)', display: 'flex', gap: '8px' }}>
            <span className="pulse-active">●</span> P2P Protocol: Synchronized
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {new Date(currentTime).toISOString().split('T')[1].split('.')[0]} UTC
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="app-header">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <div className="header-actions">
            <button 
              className="action-btn" 
              onClick={() => setIsRTL(!isRTL)} 
              title={isRTL ? "Switch to LTR" : "Switch to RTL"}
            >
              {isRTL ? 'LTR' : 'RTL'}
            </button>
            <button 
              className="action-btn" 
              onClick={() => {
                const newTheme = theme === 'dark' ? 'light' : 'dark';
                setTheme(newTheme);
                localStorage.setItem('gridshare_theme', newTheme);
              }}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? 
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg> : 
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              }
            </button>
            <button 
              className="action-btn"
              onClick={() => {
                const el = document.getElementById('residence-config');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ background: 'var(--accent-blue)', border: 'none' }}
            >
              <Icons.Settings size={14} />
              <span>Edit Residence</span>
            </button>
            <div className="network-badge">
              <span className="pulse-active">●</span> Online
            </div>
            <div className="user-profile" style={{ cursor: 'pointer' }} onClick={handleLogout} title="Click to Logout">
              <div className="avatar">{username.substring(0,2).toUpperCase()}</div>
              <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: '1.2' }}>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>{username}</span>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Sign Out</span>
              </span>
            </div>
          </div>
        </header>

        <div className="content-scroll-area">
          <header className="section-header">
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Neighborhood Analytics</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Real-time optimization of {filteredHouses.length} active residential nodes</p>
            </div>
            <div className={`status-badge ${communityMetrics.selfSufficiency ? 'status-selling' : 'status-buying'}`}>
              {communityMetrics.selfSufficiency ? 'Autonomous Network' : 'Supporting Main Grid'}
            </div>
          </header>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label"><Icons.Solar /> Community Generation</div>
              <div className="stat-value" style={{ color: 'var(--accent-green)' }}>{communityMetrics.totalGen} <small style={{ fontSize: '14px' }}>kWh</small></div>
            </div>
            <div className="stat-card">
              <div className="stat-label"><Icons.Demand /> Community Demand</div>
              <div className="stat-value" style={{ color: 'var(--accent-red)' }}>{communityMetrics.totalDem} <small style={{ fontSize: '14px' }}>kWh</small></div>
            </div>
            <div className="stat-card">
              <div className="stat-label"><Icons.Price /> Network Savings</div>
              <div className="stat-value" style={{ color: 'var(--accent-blue)' }}>${communityMetrics.totalSavings} <small style={{ fontSize: '14px' }}>/hr</small></div>
            </div>
            <div className="stat-card">
              <div className="stat-label"><Icons.Price /> Profit Rate</div>
              <div className="stat-value" style={{ color: 'var(--accent-yellow)' }}>{communityMetrics.profitRate}%</div>
            </div>
            <div className="stat-card">
              <div className="stat-label"><Icons.Battery /> Storage Capacity</div>
              <div className="stat-value" style={{ color: 'var(--accent-blue)' }}>{communityMetrics.avgBattery}%</div>
            </div>
            <div className="stat-card">
              <div className="stat-label"><Icons.Tree /> Carbon Offset</div>
              <div className="stat-value" style={{ color: 'var(--text-primary)' }}>{communityMetrics.carbonSaved} <small style={{ fontSize: '14px' }}>lbs/hr</small></div>
            </div>
          </div>

          <section className="viz-section">
            <div className="section-header">
              <h3>Residential Load Profiling</h3>
              <div style={{ display: 'flex', gap: '20px', fontSize: '12px', fontWeight: 600 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--accent-green)' }}></div> Production</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--accent-red)' }}></div> Consumption</span>
              </div>
            </div>

            <div className="chart-container">
              {filteredHouses.map((h) => (
                <div key={h.id} className={`bar-wrapper ${selectedHouseId === h.id ? 'selected' : ''}`} onClick={(e) => { e.stopPropagation(); setSelectedHouseId(h.id); }}>
                  <div className="bar-dual">
                    <div className="bar-gen" style={{ height: `${h.gen * 15}px`, opacity: 1 }}></div>
                    <div className="bar-dem" style={{ height: `${h.dem * 15}px` }}></div>
                  </div>
                  <span className="bar-label">{h.id}</span>
                  <div className="battery-container"><div className="battery-level" style={{ width: `${h.battery}%` }}></div></div>
                </div>
              ))}
            </div>
          </section>

          <section className="log-section">
            <h3>Active P2P Transactions</h3>
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Residence</th>
                  <th>Battery Level</th>
                  <th>Energy Mix (Gen | Dem)</th>
                  <th>Network Status</th>
                  <th>Financial Yield</th>
                  <th>P2P Trading Strategy</th>
                </tr>
              </thead>
              <tbody>
                {filteredHouses.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>
                      No residences found matching "{searchTerm}"
                    </td>
                  </tr>
                ) : (
                  filteredHouses.map((h) => (
                    <tr key={h.id} className={selectedHouseId === h.id ? 'selected' : ''} onClick={(e) => { e.stopPropagation(); setSelectedHouseId(h.id); }}>
                      <td style={{ fontWeight: 800 }}>{h.id}</td>
                      <td style={{ width: '120px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}><span>Capacity</span> <span>{h.battery}%</span></div>
                        <div className="battery-container" style={{ marginTop: 0 }}><div className="battery-level" style={{ width: `${h.battery}%`, background: h.battery < 20 ? 'var(--accent-red)' : 'var(--accent-blue)' }}></div></div>
                      </td>
                      <td style={{ fontWeight: 600 }}>
                        <span style={{ color: 'var(--accent-green)' }}>{h.gen}</span> / <span style={{ color: 'var(--accent-red)' }}>{h.dem}</span> <small style={{ color: 'var(--text-secondary)' }}>kWh</small>
                      </td>
                      <td><span className={`status-badge ${h.balance >= 0 ? 'status-selling' : 'status-buying'}`}>{h.balance >= 0 ? 'Surplus' : 'Deficit'}</span></td>
                      <td style={{ fontWeight: 700, color: h.balance >= 0 ? 'var(--accent-green)' : 'var(--accent-blue)' }}>
                        {h.balance >= 0 
                          ? `+$${(h.balance * communityMetrics.tradingPrice).toFixed(2)}` 
                          : `-$${(Math.abs(h.balance) * communityMetrics.tradingPrice).toFixed(2)}`}
                      </td>
                      <td style={{ fontSize: '13px' }}>
                        {h.balance >= 0 ? (
                          <div className="strategy-tag export">
                            <Icons.Share /> 
                            <span><strong>P2P Export</strong></span>
                          </div>
                        ) : (
                          <div className="strategy-tag import">
                            <Icons.Zap /> 
                            <span><strong>Local Sourcing</strong></span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>

          <footer className="app-footer">
            <div className="footer-content">
              <div className="footer-links">
                <a href="#">Network Docs</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Support</a>
              </div>
              <div className="footer-info">
                <span>GridShare OS v2.4</span>
                <span>&copy; 2026 Energy Decentral. All rights reserved.</span>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}
