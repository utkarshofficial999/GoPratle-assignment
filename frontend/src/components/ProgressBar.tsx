'use client';

import React from 'react';
import { Calendar, UserCheck, Sliders, CheckCircle2 } from 'lucide-react';
import { EventCategory } from '../types/requirement';

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
  category: EventCategory;
  onStepClick: (step: number) => void;
  maxReachedStep: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps = 4,
  category,
  onStepClick,
  maxReachedStep
}) => {
  const getStep2Title = () => {
    switch (category) {
      case 'planner':
        return 'Planning Scope';
      case 'performer':
        return 'Performance & Genre';
      case 'crew':
        return 'Crew Roles & Scale';
      default:
        return 'Role Details';
    }
  };

  const getStep3Title = () => {
    switch (category) {
      case 'planner':
        return 'Logistics & Budget';
      case 'performer':
        return 'Stage & Hospitality';
      case 'crew':
        return 'Gear & Shift Timings';
      default:
        return 'Logistics & Budget';
    }
  };

  const steps = [
    { number: 1, label: 'Event Basics', icon: Calendar, subtitle: 'Type, Date, Location & Category' },
    { number: 2, label: getStep2Title(), icon: UserCheck, subtitle: `Adaptive to ${category}` },
    { number: 3, label: getStep3Title(), icon: Sliders, subtitle: 'Rider, Budget & Specs' },
    { number: 4, label: 'Review & Submit', icon: CheckCircle2, subtitle: 'Verify & Save to MongoDB' }
  ];

  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div style={{ marginBottom: '32px' }}>
      {/* Progress Track Line */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <div style={{
          height: '4px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '9999px',
          position: 'absolute',
          top: '20px',
          left: 0,
          zIndex: 1
        }} />
        <div style={{
          height: '4px',
          width: `${progressPercentage}%`,
          background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #10b981 100%)',
          borderRadius: '9999px',
          position: 'absolute',
          top: '20px',
          left: 0,
          zIndex: 2,
          transition: 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
        }} />

        {/* Step Circles & Labels */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          position: 'relative',
          zIndex: 3
        }}>
          {steps.map((step) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            const isClickable = step.number <= maxReachedStep;

            let circleBg = 'var(--bg-dark-card)';
            let circleBorder = 'var(--border-subtle)';
            let circleColor = 'var(--text-dim)';

            if (isCompleted) {
              circleBg = '#10b981';
              circleBorder = '#10b981';
              circleColor = '#ffffff';
            } else if (isCurrent) {
              circleBg = 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)';
              circleBorder = '#818cf8';
              circleColor = '#ffffff';
            }

            return (
              <div
                key={step.number}
                onClick={() => isClickable && onStepClick(step.number)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: isClickable ? 'pointer' : 'default',
                  opacity: isClickable ? 1 : 0.65,
                  transition: 'transform 0.2s ease',
                  padding: '0 8px'
                }}
              >
                {/* Step Icon Badge */}
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: circleBg,
                    border: `2px solid ${circleBorder}`,
                    color: circleColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px',
                    boxShadow: isCurrent ? '0 0 18px rgba(99, 102, 241, 0.45)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Icon size={18} />
                </div>

                {/* Step Indicator Text */}
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: isCurrent ? '#818cf8' : 'var(--text-dim)',
                  marginBottom: '2px'
                }}>
                  Step 0{step.number}
                </span>

                <span style={{
                  fontSize: '0.875rem',
                  fontWeight: isCurrent ? 700 : 600,
                  color: isCurrent ? '#ffffff' : isCompleted ? 'var(--text-main)' : 'var(--text-muted)',
                  lineHeight: 1.2
                }}>
                  {step.label}
                </span>

                <span style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-dim)',
                  marginTop: '3px',
                  display: 'none'
                }} className="step-subtitle">
                  {step.subtitle}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
