'use client';

import React, { useState, useEffect } from 'react';
import {
  CalendarCheck2,
  Layers,
  ChevronDown,
  Database,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import { requirementApi, samplePresets } from '../services/api';
import { EventCategory, RequirementFormData } from '../types/requirement';

interface NavbarProps {
  activeTab: 'wizard' | 'explorer';
  setActiveTab: (tab: 'wizard' | 'explorer') => void;
  onApplyPreset?: (data: RequirementFormData) => void;
  requirementCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onApplyPreset,
  requirementCount = 0
}) => {
  const [dbStatus, setDbStatus] = useState<{ mode: string; connected: boolean }>({
    mode: 'checking',
    connected: false
  });
  const [showPresetMenu, setShowPresetMenu] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await requirementApi.getHealth();
        if (res.database) {
          setDbStatus({
            mode: res.database.mode,
            connected: res.database.connected
          });
        }
      } catch {
        setDbStatus({ mode: 'offline', connected: false });
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectPreset = (cat: EventCategory) => {
    if (onApplyPreset) {
      onApplyPreset(samplePresets[cat]);
    }
    setShowPresetMenu(false);
    setActiveTab('wizard');
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-xs)'
      }}
    >
      <div
        className="container"
        style={{
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Brand Logo */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          onClick={() => setActiveTab('wizard')}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              backgroundColor: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.875rem'
            }}
          >
            G
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
              GoPratle
            </span>
            <span
              style={{
                fontSize: '0.688rem',
                fontWeight: 600,
                padding: '2px 6px',
                borderRadius: '4px',
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              Talent Flow
            </span>
          </div>
        </div>

        {/* Center: Segmented Navigation Switcher */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-subtle)',
            padding: '3px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <button
            onClick={() => setActiveTab('wizard')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: 'var(--radius-xs)',
              border: 'none',
              backgroundColor: activeTab === 'wizard' ? '#ffffff' : 'transparent',
              color: activeTab === 'wizard' ? 'var(--text-main)' : 'var(--text-muted)',
              fontSize: '0.813rem',
              fontWeight: activeTab === 'wizard' ? 600 : 500,
              cursor: 'pointer',
              boxShadow: activeTab === 'wizard' ? 'var(--shadow-xs)' : 'none',
              transition: 'all var(--transition-fast)'
            }}
          >
            <CalendarCheck2 size={14} />
            <span>Post Requirement</span>
          </button>

          <button
            onClick={() => setActiveTab('explorer')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: 'var(--radius-xs)',
              border: 'none',
              backgroundColor: activeTab === 'explorer' ? '#ffffff' : 'transparent',
              color: activeTab === 'explorer' ? 'var(--text-main)' : 'var(--text-muted)',
              fontSize: '0.813rem',
              fontWeight: activeTab === 'explorer' ? 600 : 500,
              cursor: 'pointer',
              boxShadow: activeTab === 'explorer' ? 'var(--shadow-xs)' : 'none',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Layers size={14} />
            <span>Requirements</span>
            {requirementCount > 0 && (
              <span
                style={{
                  backgroundColor: activeTab === 'explorer' ? 'var(--bg-subtle)' : '#e2e8f0',
                  color: 'var(--text-muted)',
                  fontSize: '0.688rem',
                  fontWeight: 600,
                  padding: '1px 5px',
                  borderRadius: '999px',
                  marginLeft: '2px'
                }}
              >
                {requirementCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right: Presets & Live DB Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Preset Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowPresetMenu(!showPresetMenu)}
              className="btn btn-secondary"
              style={{
                fontSize: '0.75rem',
                padding: '5px 10px',
                height: '30px'
              }}
              title="Fill form with sample data for quick evaluation"
            >
              <FileSpreadsheet size={13} style={{ color: 'var(--text-muted)' }} />
              <span>Fill Sample Data</span>
              <ChevronDown size={13} />
            </button>

            {showPresetMenu && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '115%',
                  width: '210px',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '4px',
                  zIndex: 100
                }}
              >
                <div
                  style={{
                    padding: '6px 10px',
                    fontSize: '0.688rem',
                    color: 'var(--text-dim)',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    letterSpacing: '0.04em'
                  }}
                >
                  Evaluation Presets
                </div>
                <button
                  onClick={() => handleSelectPreset('planner')}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-xs)',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: 'var(--text-main)',
                    fontSize: '0.813rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-subtle)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--planner-color)' }}></span>
                  Planner (Fintech Summit)
                </button>
                <button
                  onClick={() => handleSelectPreset('performer')}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-xs)',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: 'var(--text-main)',
                    fontSize: '0.813rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-subtle)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--performer-color)' }}></span>
                  Performer (Concert Band)
                </button>
                <button
                  onClick={() => handleSelectPreset('crew')}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-xs)',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: 'var(--text-main)',
                    fontSize: '0.813rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-subtle)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--crew-color)' }}></span>
                  Crew (Production Team)
                </button>
              </div>
            )}
          </div>

          {/* Database Live Telemetry Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 8px',
              borderRadius: 'var(--radius-xs)',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: dbStatus.connected ? '#10b981' : '#f59e0b'
              }}
            />
            <span style={{ fontWeight: 500, color: 'var(--text-body)' }}>
              {dbStatus.mode === 'mongodb' ? 'MongoDB Atlas' : 'In-Memory Store'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
