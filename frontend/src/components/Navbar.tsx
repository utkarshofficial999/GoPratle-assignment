'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Layers,
  CalendarCheck2,
  CheckCircle2,
  AlertCircle,
  Database,
  ChevronDown
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
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(10, 13, 20, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '14px 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setActiveTab('wizard')}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)'
          }}>
            <Sparkles size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
                Go<span style={{ color: '#818cf8' }}>Pratle</span>
              </span>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: '2px 7px',
                borderRadius: '6px',
                background: 'rgba(99, 102, 241, 0.15)',
                color: '#a5b4fc',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                textTransform: 'uppercase'
              }}>
                Talent Flow
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', margin: 0 }}>
              Event Requirement & Hiring Portal
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(17, 23, 38, 0.7)',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid var(--border-subtle)'
        }}>
          <button
            onClick={() => setActiveTab('wizard')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: '9px',
              border: 'none',
              background: activeTab === 'wizard' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'wizard' ? '#ffffff' : 'var(--text-muted)',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: activeTab === 'wizard' ? '0 2px 8px var(--primary-glow)' : 'none'
            }}
          >
            <CalendarCheck2 size={16} />
            Post Requirement
          </button>

          <button
            onClick={() => setActiveTab('explorer')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: '9px',
              border: 'none',
              background: activeTab === 'explorer' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'explorer' ? '#ffffff' : 'var(--text-muted)',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: activeTab === 'explorer' ? '0 2px 8px var(--primary-glow)' : 'none'
            }}
          >
            <Layers size={16} />
            View Requirements
            {requirementCount > 0 && (
              <span style={{
                background: activeTab === 'explorer' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(99, 102, 241, 0.2)',
                color: activeTab === 'explorer' ? '#ffffff' : '#818cf8',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '1px 6px',
                borderRadius: '9999px',
                marginLeft: '2px'
              }}>
                {requirementCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Action: Demo Preset Filler & DB Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Preset Menu Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowPresetMenu(!showPresetMenu)}
              className="btn btn-secondary"
              style={{
                fontSize: '0.8rem',
                padding: '7px 13px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Quickly fill form with pre-configured sample data for instant evaluation"
            >
              <Sparkles size={14} color="#818cf8" />
              <span>Fill Sample Data</span>
              <ChevronDown size={14} />
            </button>

            {showPresetMenu && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '115%',
                  width: '210px',
                  background: 'var(--bg-dark-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '6px',
                  zIndex: 100
                }}
              >
                <div style={{ padding: '6px 10px', fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Select Sample Scenario:
                </div>
                <button
                  onClick={() => handleSelectPreset('planner')}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 10px',
                    borderRadius: '7px',
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--text-main)',
                    fontSize: '0.83rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--planner-color)' }}></span>
                  Planner (Fintech Summit)
                </button>
                <button
                  onClick={() => handleSelectPreset('performer')}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 10px',
                    borderRadius: '7px',
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--text-main)',
                    fontSize: '0.83rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--performer-color)' }}></span>
                  Performer (Concert Band)
                </button>
                <button
                  onClick={() => handleSelectPreset('crew')}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 10px',
                    borderRadius: '7px',
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--text-main)',
                    fontSize: '0.83rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(245, 158, 11, 0.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--crew-color)' }}></span>
                  Crew (Fashion Week Team)
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
              padding: '6px 11px',
              borderRadius: '9999px',
              background: 'rgba(13, 18, 30, 0.9)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}
          >
            <Database size={13} color="#818cf8" />
            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
              {dbStatus.mode === 'mongodb' ? 'MongoDB' : 'Live Store'}
            </span>
            {dbStatus.connected ? (
              <CheckCircle2 size={13} color="#10b981" />
            ) : (
              <AlertCircle size={13} color="#f59e0b" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
