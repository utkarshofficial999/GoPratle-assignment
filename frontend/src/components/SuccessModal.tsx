'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  PlusCircle,
  Database
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
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(4px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        className="animate-fade-in"
        style={{
          maxWidth: '480px',
          width: '100%',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-modal)',
          padding: '28px',
          textAlign: 'center'
        }}
      >
        {/* Success Icon */}
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'var(--planner-subtle)',
            color: 'var(--planner-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            border: '1px solid var(--planner-border)'
          }}
        >
          <CheckCircle2 size={24} strokeWidth={2} />
        </div>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
          Requirement Successfully Posted
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '20px' }}>
          Your requirement for <strong style={{ color: 'var(--text-main)' }}>{requirement.title}</strong> has been saved and categorized under{' '}
          <span className={`badge badge-${category}`} style={{ fontSize: '0.75rem', margin: '0 2px' }}>
            {category.toUpperCase()}
          </span>
        </p>

        {/* Code Box */}
        <div
          style={{
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 16px',
            marginBottom: '20px',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.688rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
              Requirement Identifier
            </span>
            <button
              onClick={handleCopyCode}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: 'transparent',
                border: 'none',
                color: copied ? 'var(--planner-color)' : 'var(--text-muted)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div
            style={{
              fontSize: '1.125rem',
              fontWeight: 700,
              fontFamily: 'JetBrains Mono, monospace',
              color: 'var(--text-main)',
              letterSpacing: '0.02em'
            }}
          >
            {requirement.requirementCode || 'GP-REQ-2026-SAVED'}
          </div>

          <div
            style={{
              marginTop: '8px',
              paddingTop: '6px',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.688rem',
              color: 'var(--text-dim)'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Database size={11} style={{ color: 'var(--text-muted)' }} /> MongoDB ID:
            </span>
            <span style={{ fontFamily: 'monospace' }}>
              {requirement._id || 'Generated'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onPostAnother}
            className="btn btn-secondary"
            style={{ flex: 1, padding: '8px 14px' }}
          >
            <PlusCircle size={15} />
            Post Another
          </button>

          <button
            onClick={onViewInExplorer}
            className="btn btn-primary"
            style={{ flex: 1.2, padding: '8px 14px' }}
          >
            <span>View Requirements</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
