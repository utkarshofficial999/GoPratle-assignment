'use client';

import React from 'react';
import {
  CheckCircle2,
  Calendar,
  MapPin,
  Building,
  Sparkles,
  Music,
  Users,
  DollarSign,
  User,
  Mail,
  Phone,
  Briefcase,
  Edit3,
  Clock,
  Layers,
  ShieldCheck,
  Coffee,
  Wrench,
  Loader2
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
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
          Step 4: Review & Final Submission
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Review the details before posting. On submission, the requirement will be saved to MongoDB categorized as{' '}
          <strong style={{ color: `var(--${category}-color)` }}>{category.toUpperCase()}</strong>.
        </p>
      </div>

      {submissionError && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.15)',
          border: '1px solid rgba(244, 63, 94, 0.35)',
          padding: '14px 18px',
          borderRadius: 'var(--radius-md)',
          color: '#fecdd3',
          marginBottom: '20px',
          fontSize: '0.88rem'
        }}>
          <strong>Submission Error:</strong> {submissionError}
        </div>
      )}

      {/* Main Review Overview Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '24px 28px',
          marginBottom: '20px',
          borderLeft: `5px solid var(--${category}-color)`,
          background: `linear-gradient(135deg, var(--${category}-soft) 0%, rgba(17, 23, 38, 0.8) 100%)`
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className={`badge badge-${category}`}>
                {category === 'planner' && 'Event Planner Requirement'}
                {category === 'performer' && 'Performer / Artist Requirement'}
                {category === 'crew' && 'Production Crew Requirement'}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                • {formData.eventType}
              </span>
            </div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              {formData.title || 'Untitled Event'}
            </h1>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', display: 'block' }}>Target Destination</span>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
              {formData.location.city || 'City not set'}, {formData.location.state || 'India'}
            </span>
          </div>
        </div>
      </div>

      {/* 3 Structured Review Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '32px' }}>
        {/* Card 1: Event Basics */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={18} color="#818cf8" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                1. Event Basics & Schedule
              </h3>
            </div>
            <button
              type="button"
              onClick={() => goToStep(1)}
              className="btn btn-outline"
              style={{ padding: '4px 10px', fontSize: '0.75rem' }}
            >
              <Edit3 size={12} /> Edit Step 1
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <div>
              <span className="form-hint">Event Name</span>
              <p style={{ fontWeight: 600, color: '#ffffff' }}>{formData.title}</p>
            </div>
            <div>
              <span className="form-hint">Event Type</span>
              <p style={{ fontWeight: 600, color: '#ffffff' }}>{formData.eventType}</p>
            </div>
            <div>
              <span className="form-hint">Schedule Type</span>
              <p style={{ fontWeight: 600, color: '#ffffff' }}>
                {formData.dateType === 'range' ? (
                  <>Date Range: {formatDate(formData.startDate)} → {formatDate(formData.endDate)}</>
                ) : (
                  <>Single Day: {formatDate(formData.startDate)}</>
                )}
              </p>
            </div>
            <div>
              <span className="form-hint">Venue Booking</span>
              <p style={{ fontWeight: 600, color: '#ffffff' }}>
                {formData.venue.hasSpecificVenue
                  ? `${formData.venue.name} (${formData.venue.hallDetails || 'Main Hall'})`
                  : 'Flexible / To be finalized'}
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Category Details */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {category === 'planner' && <Sparkles size={18} color="var(--planner-color)" />}
              {category === 'performer' && <Music size={18} color="var(--performer-color)" />}
              {category === 'crew' && <Users size={18} color="var(--crew-color)" />}
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                2. Category-Specific Specifications ({category.toUpperCase()})
              </h3>
            </div>
            <button
              type="button"
              onClick={() => goToStep(2)}
              className="btn btn-outline"
              style={{ padding: '4px 10px', fontSize: '0.75rem' }}
            >
              <Edit3 size={12} /> Edit Step 2
            </button>
          </div>

          {/* Planner Review */}
          {category === 'planner' && (
            <div>
              <div style={{ marginBottom: '12px' }}>
                <span className="form-hint">Services Requested</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                  {formData.plannerDetails.services?.length ? (
                    formData.plannerDetails.services.map((s) => (
                      <span key={s} className="badge badge-planner">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>No specific services selected</span>
                  )}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                <div>
                  <span className="form-hint">Guest Scale</span>
                  <p style={{ fontWeight: 600, color: '#ffffff' }}>
                    {formData.plannerDetails.guestCount || 'Not specified'}
                  </p>
                </div>
                <div>
                  <span className="form-hint">Concept & Theme</span>
                  <p style={{ fontWeight: 600, color: '#ffffff' }}>
                    {formData.plannerDetails.themePreference || 'Client open to ideas'}
                  </p>
                </div>
                <div>
                  <span className="form-hint">Decor Atmosphere</span>
                  <p style={{ fontWeight: 600, color: '#ffffff' }}>
                    {formData.plannerDetails.decorStyle || 'Standard'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Performer Review */}
          {category === 'performer' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <span className="form-hint">Act Role</span>
                  <p style={{ fontWeight: 600, color: '#ffffff' }}>{formData.performerDetails.performerType}</p>
                </div>
                <div>
                  <span className="form-hint">Duration & Sets</span>
                  <p style={{ fontWeight: 600, color: '#ffffff' }}>
                    {formData.performerDetails.performanceDuration} ({formData.performerDetails.numberOfSets} set{formData.performerDetails.numberOfSets > 1 ? 's' : ''})
                  </p>
                </div>
              </div>

              <div>
                <span className="form-hint">Genres & Style</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                  {formData.performerDetails.genres?.length ? (
                    formData.performerDetails.genres.map((g) => (
                      <span key={g} className="badge badge-performer">
                        {g}
                      </span>
                    ))
                  ) : (
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Open genre</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Crew Review */}
          {category === 'crew' && (
            <div>
              <div style={{ marginBottom: '14px' }}>
                <span className="form-hint">Required Crew Roles ({totalCrewCount} total positions)</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                  {formData.crewDetails.roles.map((r, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'rgba(13, 18, 30, 0.6)',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.85rem'
                      }}
                    >
                      <span style={{ fontWeight: 600, color: '#ffffff' }}>{r.role}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'capitalize' }}>
                          Level: {r.experienceLevel}
                        </span>
                        <span className="badge badge-crew">Count: {r.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                <div>
                  <span className="form-hint">Shift Model</span>
                  <p style={{ fontWeight: 600, color: '#ffffff', textTransform: 'capitalize' }}>
                    {formData.crewDetails.shiftTimings.shiftType} ({formData.crewDetails.shiftTimings.startTime} - {formData.crewDetails.shiftTimings.endTime})
                  </p>
                </div>
                <div>
                  <span className="form-hint">Dress Code</span>
                  <p style={{ fontWeight: 600, color: '#ffffff', textTransform: 'capitalize' }}>
                    {formData.crewDetails.dressCode.replace('_', ' ')}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Card 3: Logistics, Budget & Organizer */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <DollarSign size={18} color="#10b981" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                3. Logistics, Budget & Point of Contact
              </h3>
            </div>
            <button
              type="button"
              onClick={() => goToStep(3)}
              className="btn btn-outline"
              style={{ padding: '4px 10px', fontSize: '0.75rem' }}
            >
              <Edit3 size={12} /> Edit Step 3
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div>
              <span className="form-hint">Estimated Budget</span>
              <p style={{ fontWeight: 700, color: '#10b981', fontSize: '1.1rem' }}>
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
              <p style={{ fontWeight: 600, color: '#ffffff' }}>
                {formData.organizer.name} ({formData.organizer.organization || 'Individual'})
              </p>
            </div>

            <div>
              <span className="form-hint">Organizer Email</span>
              <p style={{ fontWeight: 600, color: '#ffffff' }}>{formData.organizer.email}</p>
            </div>

            <div>
              <span className="form-hint">Organizer Phone</span>
              <p style={{ fontWeight: 600, color: '#ffffff' }}>{formData.organizer.phone || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 0',
        borderTop: '1px solid var(--border-subtle)'
      }}>
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
          style={{
            padding: '14px 32px',
            fontSize: '1rem',
            background: 'linear-gradient(135deg, #6366f1 0%, #10b981 100%)',
            boxShadow: '0 4px 20px rgba(16, 185, 129, 0.35)'
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Saving to MongoDB...
            </>
          ) : (
            <>
              <CheckCircle2 size={18} />
              Confirm & Post Requirement
            </>
          )}
        </button>
      </div>
    </div>
  );
};
