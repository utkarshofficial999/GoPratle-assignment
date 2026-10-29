'use client';

import React from 'react';
import {
  CheckCircle2,
  Calendar,
  Sparkles,
  Music,
  Users,
  DollarSign,
  Edit3,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { RequirementFormData } from '../../types/requirement';

interface Step4Props {
  formData: RequirementFormData;
  goToStep: (step: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  submissionError: string | null;
}

export const Step4ReviewSubmit: React.FC<Step4Props> = ({
  formData,
  goToStep,
  onSubmit,
  isSubmitting,
  submissionError
}) => {
  const { category } = formData;

  const formatDate = (d: string) => {
    if (!d) return 'Not set';
    try {
      return new Date(d).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return d;
    }
  };

  const totalCrewCount = formData.crewDetails.roles.reduce((acc, r) => acc + (r.count || 1), 0);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>
          Step 4: Review & Final Submission
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Review the summary below. Upon submission, the requirement will be categorized as{' '}
          <strong style={{ color: 'var(--text-main)' }}>{category.toUpperCase()}</strong> and persisted in the database.
        </p>
      </div>

      {submissionError && (
        <div
          style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            padding: '12px 16px',
            borderRadius: 'var(--radius-sm)',
            color: '#b91c1c',
            marginBottom: '16px',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
          <span><strong>Submission Error:</strong> {submissionError}</span>
        </div>
      )}

      {/* Main Review Overview Banner */}
      <div
        className="card-panel"
        style={{
          padding: '20px 24px',
          marginBottom: '16px',
          borderLeft: `4px solid var(--${category}-color)`
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className={`badge badge-${category}`}>
                {category === 'planner' && 'Event Planner'}
                {category === 'performer' && 'Performer / Artist'}
                {category === 'crew' && 'Production Crew'}
              </span>
              <span style={{ fontSize: '0.813rem', color: 'var(--text-muted)' }}>
                • {formData.eventType}
              </span>
            </div>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
              {formData.title || 'Untitled Event'}
            </h2>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Location</span>
            <span style={{ fontSize: '0.938rem', fontWeight: 600, color: 'var(--text-main)' }}>
              {formData.location.city || 'City not set'}, {formData.location.state || 'India'}
            </span>
          </div>
        </div>
      </div>

      {/* 3 Structured Review Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
        {/* Card 1: Event Basics */}
        <div className="card-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={16} style={{ color: 'var(--text-muted)' }} />
              <h3 style={{ fontSize: '0.938rem', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>
                1. Event Basics & Schedule
              </h3>
            </div>
            <button
              type="button"
              onClick={() => goToStep(1)}
              className="btn btn-secondary"
              style={{ padding: '3px 8px', fontSize: '0.75rem', height: '26px' }}
            >
              <Edit3 size={11} /> Edit Step 1
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div>
              <span className="form-hint">Event Name</span>
              <p style={{ fontWeight: 500, color: 'var(--text-main)', fontSize: '0.875rem' }}>{formData.title}</p>
            </div>
            <div>
              <span className="form-hint">Event Type</span>
              <p style={{ fontWeight: 500, color: 'var(--text-main)', fontSize: '0.875rem' }}>{formData.eventType}</p>
            </div>
            <div>
              <span className="form-hint">Schedule Type</span>
              <p style={{ fontWeight: 500, color: 'var(--text-main)', fontSize: '0.875rem' }}>
                {formData.dateType === 'range' ? (
                  <>{formatDate(formData.startDate)} → {formatDate(formData.endDate)}</>
                ) : (
                  <>{formatDate(formData.startDate)}</>
                )}
              </p>
            </div>
            <div>
              <span className="form-hint">Venue Booking</span>
              <p style={{ fontWeight: 500, color: 'var(--text-main)', fontSize: '0.875rem' }}>
                {formData.venue.hasSpecificVenue
                  ? `${formData.venue.name} (${formData.venue.hallDetails || 'Confirmed'})`
                  : 'Flexible / Unconfirmed'}
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Category Details */}
        <div className="card-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {category === 'planner' && <Sparkles size={16} style={{ color: 'var(--planner-color)' }} />}
              {category === 'performer' && <Music size={16} style={{ color: 'var(--performer-color)' }} />}
              {category === 'crew' && <Users size={16} style={{ color: 'var(--crew-color)' }} />}
              <h3 style={{ fontSize: '0.938rem', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>
                2. Category Specifications ({category.toUpperCase()})
              </h3>
            </div>
            <button
              type="button"
              onClick={() => goToStep(2)}
              className="btn btn-secondary"
              style={{ padding: '3px 8px', fontSize: '0.75rem', height: '26px' }}
            >
              <Edit3 size={11} /> Edit Step 2
            </button>
          </div>

          {/* Planner Review */}
          {category === 'planner' && (
            <div>
              <div style={{ marginBottom: '12px' }}>
                <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Services Requested</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {formData.plannerDetails.services?.length ? (
                    formData.plannerDetails.services.map((s) => (
                      <span key={s} className="badge badge-planner">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.813rem' }}>No specific services selected</span>
                  )}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <div>
                  <span className="form-hint">Guest Scale</span>
                  <p style={{ fontWeight: 500, color: 'var(--text-main)', fontSize: '0.875rem' }}>
                    {formData.plannerDetails.guestCount || 'Not specified'}
                  </p>
                </div>
                <div>
                  <span className="form-hint">Concept & Theme</span>
                  <p style={{ fontWeight: 500, color: 'var(--text-main)', fontSize: '0.875rem' }}>
                    {formData.plannerDetails.themePreference || 'Open to proposals'}
                  </p>
                </div>
                <div>
                  <span className="form-hint">Decor Atmosphere</span>
                  <p style={{ fontWeight: 500, color: 'var(--text-main)', fontSize: '0.875rem' }}>
                    {formData.plannerDetails.decorStyle || 'Standard'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Performer Review */}
          {category === 'performer' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <span className="form-hint">Act Role</span>
                  <p style={{ fontWeight: 500, color: 'var(--text-main)', fontSize: '0.875rem' }}>{formData.performerDetails.performerType}</p>
                </div>
                <div>
                  <span className="form-hint">Duration & Sets</span>
                  <p style={{ fontWeight: 500, color: 'var(--text-main)', fontSize: '0.875rem' }}>
                    {formData.performerDetails.performanceDuration} ({formData.performerDetails.numberOfSets} set{formData.performerDetails.numberOfSets > 1 ? 's' : ''})
                  </p>
                </div>
              </div>

              <div>
                <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Genres</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {formData.performerDetails.genres?.length ? (
                    formData.performerDetails.genres.map((g) => (
                      <span key={g} className="badge badge-performer">
                        {g}
                      </span>
                    ))
                  ) : (
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.813rem' }}>Open genre</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Crew Review */}
          {category === 'crew' && (
            <div>
              <div style={{ marginBottom: '12px' }}>
                <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>
                  Required Crew Roles ({totalCrewCount} total members)
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {formData.crewDetails.roles.map((r, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: 'var(--bg-subtle)',
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-xs)',
                        fontSize: '0.813rem'
                      }}
                    >
                      <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>{r.role}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                          Level: {r.experienceLevel}
                        </span>
                        <span className="badge badge-crew">Qty: {r.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <div>
                  <span className="form-hint">Shift Model</span>
                  <p style={{ fontWeight: 500, color: 'var(--text-main)', fontSize: '0.875rem', textTransform: 'capitalize' }}>
                    {formData.crewDetails.shiftTimings.shiftType} ({formData.crewDetails.shiftTimings.startTime} - {formData.crewDetails.shiftTimings.endTime})
                  </p>
                </div>
                <div>
                  <span className="form-hint">Dress Code</span>
                  <p style={{ fontWeight: 500, color: 'var(--text-main)', fontSize: '0.875rem', textTransform: 'capitalize' }}>
                    {formData.crewDetails.dressCode.replace('_', ' ')}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Card 3: Logistics, Budget & Organizer */}
        <div className="card-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <DollarSign size={16} style={{ color: 'var(--planner-color)' }} />
              <h3 style={{ fontSize: '0.938rem', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>
                3. Logistics, Budget & Point of Contact
              </h3>
            </div>
            <button
              type="button"
              onClick={() => goToStep(3)}
              className="btn btn-secondary"
              style={{ padding: '3px 8px', fontSize: '0.75rem', height: '26px' }}
            >
              <Edit3 size={11} /> Edit Step 3
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div>
              <span className="form-hint">Estimated Budget</span>
              <p style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.938rem' }}>
                {category === 'planner' &&
                  `₹ ${formData.plannerDetails.plannerBudget.min.toLocaleString('en-IN')} - ₹ ${formData.plannerDetails.plannerBudget.max.toLocaleString('en-IN')}`}
                {category === 'performer' &&
                  `₹ ${formData.performerDetails.feeBudget.min.toLocaleString('en-IN')} - ₹ ${formData.performerDetails.feeBudget.max.toLocaleString('en-IN')}`}
                {category === 'crew' &&
                  `₹ ${formData.crewDetails.crewBudget.totalEstimatedBudget.toLocaleString('en-IN')} (₹ ${formData.crewDetails.crewBudget.amountPerCrew}/crew)`}
              </p>
            </div>

            <div>
              <span className="form-hint">Organizer Name</span>
              <p style={{ fontWeight: 500, color: 'var(--text-main)', fontSize: '0.875rem' }}>
                {formData.organizer.name} ({formData.organizer.organization || 'Individual'})
              </p>
            </div>

            <div>
              <span className="form-hint">Organizer Email</span>
              <p style={{ fontWeight: 500, color: 'var(--text-main)', fontSize: '0.875rem' }}>{formData.organizer.email}</p>
            </div>

            <div>
              <span className="form-hint">Organizer Phone</span>
              <p style={{ fontWeight: 500, color: 'var(--text-main)', fontSize: '0.875rem' }}>{formData.organizer.phone || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-subtle)'
        }}
      >
        <button
          type="button"
          onClick={() => goToStep(3)}
          className="btn btn-secondary"
          disabled={isSubmitting}
        >
          Back to Step 3
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="btn btn-primary"
          style={{ padding: '9px 24px', fontSize: '0.875rem' }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Saving to MongoDB...</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={16} />
              <span>Confirm & Post Requirement</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
