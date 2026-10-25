'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  PlusCircle,
  Database,
  ExternalLink
} from 'lucide-react';
import { RequirementFormData } from '../types/requirement';

interface SuccessModalProps {
  requirement: RequirementFormData;
  onPostAnother: () => void;
  onViewInExplorer: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  requirement,
  onPostAnother,
  onViewInExplorer
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (requirement.requirementCode) {
      navigator.clipboard.writeText(requirement.requirementCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const { category } = requirement;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(5, 7, 12, 0.85)',
        backdropFilter: 'blur(12px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{
          maxWidth: '560px',
          width: '100%',
          padding: '36px',
          textAlign: 'center',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(16, 185, 129, 0.2)'
        }}
      >
        {/* Animated Checkmark Icon */}
        <div
          style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            boxShadow: '0 6px 25px rgba(16, 185, 129, 0.45)'
          }}
        >
          <CheckCircle2 size={36} color="#ffffff" strokeWidth={2.5} />
        </div>

        <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
          Requirement Successfully Posted!
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
          Your requirement for <strong style={{ color: '#ffffff' }}>{requirement.title}</strong> has been committed to MongoDB and categorized under{' '}
          <span className={`badge badge-${category}`} style={{ fontSize: '0.78rem', margin: '0 4px' }}>
            {category.toUpperCase()}
          </span>
        </p>

        {/* Unique Generated Identifier Card */}
        <div
          style={{
            background: 'rgba(10, 13, 20, 0.75)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 20px',
            marginBottom: '26px',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
              Official Requirement Code
            </span>
            <button
              onClick={handleCopyCode}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                background: 'transparent',
                border: 'none',
                color: copied ? '#10b981' : 'var(--text-muted)',
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>

          <div style={{
            fontSize: '1.3rem',
            fontWeight: 800,
            fontFamily: 'JetBrains Mono, monospace',
            color: '#38bdf8',
            letterSpacing: '0.04em'
          }}>
            {requirement.requirementCode || 'GP-REQ-2026-PENDING'}
          </div>

          <div style={{
            marginTop: '10px',
            paddingTop: '8px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.72rem',
            color: 'var(--text-dim)'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Database size={12} color="#10b981" /> MongoDB Record ID:
            </span>
            <span style={{ fontFamily: 'monospace' }}>
              {requirement._id || 'Generated'}
            </span>
          </div>
        </div>

        {/* Modal Actions */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onPostAnother}
            className="btn btn-secondary"
            style={{ flex: 1, padding: '12px' }}
          >
            <PlusCircle size={16} />
            Post Another
          </button>

          <button
            onClick={onViewInExplorer}
            className="btn btn-primary"
            style={{ flex: 1.2, padding: '12px' }}
          >
            <span>View Requirements</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
