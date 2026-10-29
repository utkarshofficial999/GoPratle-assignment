'use client';

import React from 'react';
import { Check } from 'lucide-react';
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
        return 'Performance Details';
      case 'crew':
        return 'Crew Roles';
      default:
        return 'Role Details';
    }
  };

  const getStep3Title = () => {
    switch (category) {
      case 'planner':
        return 'Logistics & Budget';
      case 'performer':
        return 'Stage & Riders';
      case 'crew':
        return 'Shift & Compensation';
      default:
        return 'Logistics & Budget';
    }
  };

  const steps = [
    { number: 1, label: 'Event Basics' },
    { number: 2, label: getStep2Title() },
    { number: 3, label: getStep3Title() },
    { number: 4, label: 'Review & Submit' }
  ];

  return (
    <div style={{ marginBottom: '28px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8px',
          alignItems: 'center'
        }}
      >
        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          const isClickable = step.number <= maxReachedStep;

          return (
            <div
              key={step.number}
              onClick={() => isClickable && onStepClick(step.number)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                cursor: isClickable ? 'pointer' : 'default',
                opacity: isClickable ? 1 : 0.6,
                transition: 'opacity var(--transition-fast)'
              }}
            >
              {/* Step indicator bar */}
              <div
                style={{
                  height: '3px',
                  borderRadius: '2px',
                  backgroundColor: isCompleted
                    ? 'var(--primary)'
                    : isCurrent
                    ? 'var(--primary)'
                    : 'var(--border-subtle)',
                  transition: 'background-color var(--transition-normal)'
                }}
              />

              {/* Step label row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.688rem',
                    fontWeight: 600,
                    backgroundColor: isCompleted
                      ? 'var(--primary)'
                      : isCurrent
                      ? 'var(--text-main)'
                      : 'var(--bg-subtle)',
                    color: isCompleted || isCurrent ? '#ffffff' : 'var(--text-muted)',
                    border: isCompleted || isCurrent ? 'none' : '1px solid var(--border-default)',
                    flexShrink: 0
                  }}
                >
                  {isCompleted ? <Check size={11} strokeWidth={2.5} /> : step.number}
                </span>

                <span
                  style={{
                    fontSize: '0.813rem',
                    fontWeight: isCurrent ? 600 : 500,
                    color: isCurrent ? 'var(--text-main)' : isCompleted ? 'var(--text-body)' : 'var(--text-muted)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
