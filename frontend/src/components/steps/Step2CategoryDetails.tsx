'use client';

import React from 'react';
import {
  Sparkles,
  Music,
  Users,
  Plus,
  Minus,
  Trash2,
  Clock,
  Award
} from 'lucide-react';
import {
  RequirementFormData,
  CrewRoleItem
} from '../../types/requirement';

interface Step2Props {
  formData: RequirementFormData;
  updateFormData: (fields: Partial<RequirementFormData>) => void;
  errors: Record<string, string>;
}

// Available Options for Planner
const plannerServiceOptions = [
  'Full Event Planning & Curation',
  'Day-of Coordination & Run-down',
  'Decor & Theme Styling',
  'Vendor Sourcing & Management',
  'Guest Concierge & RSVP Desk',
  'Budget Auditing & Tracking',
  'Stage Design & 3D Renders',
  'Licensing & Local Authority Permits'
];

const guestCountTiers = [
  { value: 'under_50', label: 'Under 50', desc: 'Intimate / Private' },
  { value: '50_150', label: '50 - 150', desc: 'Boutique / Mid' },
  { value: '150_300', label: '150 - 300', desc: 'Large Gathering' },
  { value: '300_700', label: '300 - 700', desc: 'Grand Scale' },
  { value: '700_plus', label: '700+', desc: 'Mega Convention' }
];

// Available Options for Performer
const performerTypeOptions = [
  'Live Band (4-6 piece)',
  'Solo Singer / Vocalist',
  'DJ & Electronic Live Act',
  'Standup Comedian',
  'Emcee / Anchor / Host',
  'Dancers / Choreography Troupe',
  'Magician / Mentalist',
  'Instrumentalist (Violin / Sax / Flute)'
];

const genreChips = [
  'Bollywood',
  'Sufi',
  'Commercial Pop',
  'Rock & Retro',
  'EDM / Deep House',
  'Punjabi Beats',
  'Indie Acoustic',
  'Jazz & Blues',
  'Classical / Fusion',
  'Standup / Roast',
  'Corporate Motivational'
];

// Available default roles for Crew
const defaultCrewRoleTemplates = [
  'FOH Sound Engineer',
  'Lighting Console Operator',
  'Camera Operator (4K / PTZ)',
  'Stage Hands & Cable Runners',
  'VIP Hospitality Ushers',
  'Truss & Rigging Specialist',
  'Event Security Supervisor'
];

export const Step2CategoryDetails: React.FC<Step2Props> = ({
  formData,
  updateFormData,
  errors
}) => {
  const { category } = formData;

  // Planner handlers
  const togglePlannerService = (service: string) => {
    const current = formData.plannerDetails.services || [];
    const exists = current.includes(service);
    const updated = exists
      ? current.filter((s) => s !== service)
      : [...current, service];
    updateFormData({
      plannerDetails: { ...formData.plannerDetails, services: updated }
    });
  };

  // Performer handlers
  const toggleGenre = (genre: string) => {
    const current = formData.performerDetails.genres || [];
    const exists = current.includes(genre);
    const updated = exists
      ? current.filter((g) => g !== genre)
      : [...current, genre];
    updateFormData({
      performerDetails: { ...formData.performerDetails, genres: updated }
    });
  };

  // Crew handlers
  const addCrewRole = (roleTitle: string) => {
    const currentRoles = [...formData.crewDetails.roles];
    const existing = currentRoles.find((r) => r.role === roleTitle);
    if (existing) {
      existing.count = (existing.count || 1) + 1;
      updateFormData({
        crewDetails: { ...formData.crewDetails, roles: currentRoles }
      });
    } else {
      updateFormData({
        crewDetails: {
          ...formData.crewDetails,
          roles: [
            ...currentRoles,
            { role: roleTitle, count: 1, experienceLevel: 'mid' }
          ]
        }
      });
    }
  };

  const updateCrewRoleCount = (index: number, delta: number) => {
    const roles = [...formData.crewDetails.roles];
    if (!roles[index]) return;
    const newCount = (roles[index].count || 1) + delta;
    if (newCount > 0) {
      roles[index].count = newCount;
      updateFormData({
        crewDetails: { ...formData.crewDetails, roles }
      });
    }
  };

  const updateCrewRoleExp = (index: number, level: 'junior' | 'mid' | 'senior' | 'lead') => {
    const roles = [...formData.crewDetails.roles];
    if (!roles[index]) return;
    roles[index].experienceLevel = level;
    updateFormData({
      crewDetails: { ...formData.crewDetails, roles }
    });
  };

  const removeCrewRole = (index: number) => {
    const roles = formData.crewDetails.roles.filter((_, i) => i !== index);
    updateFormData({
      crewDetails: { ...formData.crewDetails, roles }
    });
  };

  return (
    <div className="animate-fade-in">
      {/* Category Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)' }}>
              Step 2: {category === 'planner' && 'Planning Scope & Scale'}
              {category === 'performer' && 'Performance & Repertoire'}
              {category === 'crew' && 'Crew Roles & Headcount'}
            </h1>
            <span className={`badge badge-${category}`}>
              {category.toUpperCase()}
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            {category === 'planner' && 'Define deliverables, guest count tier, and thematic scope for your Event Planner.'}
            {category === 'performer' && 'Select the act type, performance duration, sets, and musical genres.'}
            {category === 'crew' && 'Specify crew positions, required experience levels, and headcount.'}
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CASE A: PLANNER ADAPTIVE FIELDS                                          */}
      {/* ========================================================================= */}
      {category === 'planner' && (
        <div className="card-panel" style={{ padding: '24px' }}>
          {/* Services Checklist */}
          <div style={{ marginBottom: '24px' }}>
            <label className="form-label" style={{ marginBottom: '6px' }}>
              <Sparkles size={15} style={{ color: 'var(--planner-color)' }} />
              <span>Planning Services Required</span>
            </label>
            <p style={{ fontSize: '0.813rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Select all responsibilities you want the event planning team to manage:
            </p>
            <div className="chip-grid">
              {plannerServiceOptions.map((service) => {
                const isSelected = formData.plannerDetails.services?.includes(service);
                return (
                  <div
                    key={service}
                    onClick={() => togglePlannerService(service)}
                    className={`chip ${isSelected ? 'active' : ''}`}
                    style={
                      isSelected
                        ? {
                            backgroundColor: 'var(--planner-subtle)',
                            borderColor: 'var(--planner-color)',
                            color: 'var(--planner-color)'
                          }
                        : {}
                    }
                  >
                    {service}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Guest Count Tier */}
          <div style={{ marginBottom: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
            <label className="form-label" style={{ marginBottom: '6px' }}>
              <Users size={15} style={{ color: 'var(--planner-color)' }} />
              <span>Expected Guest Count Tier</span>
            </label>
            <p style={{ fontSize: '0.813rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Helps planners size their coordination team and vendor allocations:
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '10px'
              }}
            >
              {guestCountTiers.map((tier) => {
                const isSelected = formData.plannerDetails.guestCount === tier.value;
                return (
                  <div
                    key={tier.value}
                    onClick={() =>
                      updateFormData({
                        plannerDetails: {
                          ...formData.plannerDetails,
                          guestCount: tier.value as any
                        }
                      })
                    }
                    style={{
                      padding: '12px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: isSelected ? 'var(--planner-subtle)' : '#ffffff',
                      border: isSelected ? '1.5px solid var(--planner-color)' : '1px solid var(--border-default)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: isSelected ? 'var(--planner-color)' : 'var(--text-main)', marginBottom: '2px' }}>
                      {tier.label}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {tier.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Theme & Decor Preferences */}
          <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Theme / Aesthetic Concept</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Modern Minimalist, Traditional Elegance"
                  value={formData.plannerDetails.themePreference}
                  onChange={(e) =>
                    updateFormData({
                      plannerDetails: {
                        ...formData.plannerDetails,
                        themePreference: e.target.value
                      }
                    })
                  }
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Stage & Decor Atmosphere Notes</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Curved LED backdrop, warm ambient spotlights"
                  value={formData.plannerDetails.decorStyle}
                  onChange={(e) =>
                    updateFormData({
                      plannerDetails: {
                        ...formData.plannerDetails,
                        decorStyle: e.target.value
                      }
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CASE B: PERFORMER ADAPTIVE FIELDS                                        */}
      {/* ========================================================================= */}
      {category === 'performer' && (
        <div className="card-panel" style={{ padding: '24px' }}>
          {/* Performer Act Selection */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">
                <Music size={15} style={{ color: 'var(--performer-color)' }} />
                <span>Performer Act / Role</span> <span className="required">*</span>
              </label>
              <select
                className="form-select"
                value={formData.performerDetails.performerType}
                onChange={(e) =>
                  updateFormData({
                    performerDetails: {
                      ...formData.performerDetails,
                      performerType: e.target.value
                    }
                  })
                }
              >
                {performerTypeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">
                <Clock size={15} style={{ color: 'var(--performer-color)' }} />
                <span>Performance Duration & Sets</span>
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '8px' }}>
                <select
                  className="form-select"
                  value={formData.performerDetails.performanceDuration}
                  onChange={(e) =>
                    updateFormData({
                      performerDetails: {
                        ...formData.performerDetails,
                        performanceDuration: e.target.value
                      }
                    })
                  }
                >
                  <option value="45 mins">45 mins</option>
                  <option value="60 mins">60 mins (1 hour)</option>
                  <option value="90 mins">90 mins (1.5 hours)</option>
                  <option value="2 hours">2 hours</option>
                  <option value="3+ hours">3+ hours</option>
                  <option value="Multiple sets">Multiple Sets</option>
                </select>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#ffffff', padding: '0 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sets:</span>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={formData.performerDetails.numberOfSets}
                    onChange={(e) =>
                      updateFormData({
                        performerDetails: {
                          ...formData.performerDetails,
                          numberOfSets: parseInt(e.target.value) || 1
                        }
                      })
                    }
                    style={{
                      width: '36px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: 'var(--text-main)',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      textAlign: 'center',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Genres Chips */}
          <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
            <label className="form-label" style={{ marginBottom: '6px' }}>
              Musical & Act Genres
            </label>
            <p style={{ fontSize: '0.813rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Select genres that match your event audience:
            </p>
            <div className="chip-grid">
              {genreChips.map((genre) => {
                const isSelected = formData.performerDetails.genres?.includes(genre);
                return (
                  <div
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    className={`chip ${isSelected ? 'active' : ''}`}
                    style={
                      isSelected
                        ? {
                            backgroundColor: 'var(--performer-subtle)',
                            borderColor: 'var(--performer-color)',
                            color: 'var(--performer-color)'
                          }
                        : {}
                    }
                  >
                    {genre}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CASE C: CREW ADAPTIVE FIELDS                                             */}
      {/* ========================================================================= */}
      {category === 'crew' && (
        <div className="card-panel" style={{ padding: '24px' }}>
          {/* Roles List */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <label className="form-label" style={{ margin: 0 }}>
                <Users size={15} style={{ color: 'var(--crew-color)' }} />
                <span>Crew Positions & Scale</span>
              </label>
              <span style={{ fontSize: '0.813rem', color: 'var(--text-muted)' }}>
                Total Headcount:{' '}
                <strong style={{ color: 'var(--text-main)' }}>
                  {formData.crewDetails.roles.reduce((acc, r) => acc + (r.count || 1), 0)} members
                </strong>
              </span>
            </div>

            {/* Quick Add Presets */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                Quick add:
              </span>
              {defaultCrewRoleTemplates.map((tpl) => (
                <button
                  key={tpl}
                  type="button"
                  onClick={() => addCrewRole(tpl)}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: 'var(--radius-xs)' }}
                >
                  <Plus size={11} />
                  {tpl}
                </button>
              ))}
            </div>

            {/* Active Crew Roles Card List */}
            {formData.crewDetails.roles.length === 0 ? (
              <div
                style={{
                  padding: '24px',
                  textAlign: 'center',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px dashed var(--border-default)'
                }}
              >
                <p style={{ color: 'var(--text-muted)', fontSize: '0.813rem', margin: 0 }}>
                  No crew roles added yet. Click any quick-add button above to populate roles.
                </p>
                {errors.crewRoles && <span className="error-text" style={{ justifyContent: 'center', marginTop: '6px' }}>{errors.crewRoles}</span>}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {formData.crewDetails.roles.map((roleItem, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: 'var(--bg-subtle)',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    {/* Role Title */}
                    <div style={{ flex: 1, minWidth: '180px' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-main)' }}>
                        {roleItem.role}
                      </div>
                      <span style={{ fontSize: '0.688rem', color: 'var(--text-muted)' }}>
                        Position #{idx + 1}
                      </span>
                    </div>

                    {/* Experience Tier Selector */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: '16px' }}>
                      <Award size={13} style={{ color: 'var(--text-muted)' }} />
                      <select
                        value={roleItem.experienceLevel}
                        onChange={(e) => updateCrewRoleExp(idx, e.target.value as any)}
                        style={{
                          backgroundColor: '#ffffff',
                          color: 'var(--text-main)',
                          border: '1px solid var(--border-default)',
                          borderRadius: 'var(--radius-xs)',
                          padding: '4px 6px',
                          fontSize: '0.75rem',
                          outline: 'none'
                        }}
                      >
                        <option value="junior">Junior (Entry)</option>
                        <option value="mid">Mid-level (1-3 yrs)</option>
                        <option value="senior">Senior (3-6 yrs)</option>
                        <option value="lead">Lead / Specialist (6+ yrs)</option>
                      </select>
                    </div>

                    {/* Counter Buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          backgroundColor: '#ffffff',
                          borderRadius: 'var(--radius-xs)',
                          border: '1px solid var(--border-default)',
                          overflow: 'hidden'
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => updateCrewRoleCount(idx, -1)}
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: 'var(--text-muted)',
                            padding: '4px 8px',
                            cursor: 'pointer'
                          }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 600, fontSize: '0.813rem' }}>
                          {roleItem.count}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCrewRoleCount(idx, 1)}
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: 'var(--text-muted)',
                            padding: '4px 8px',
                            cursor: 'pointer'
                          }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeCrewRole(idx)}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          color: 'var(--text-muted)',
                          padding: '4px',
                          cursor: 'pointer',
                          borderRadius: 'var(--radius-xs)'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                        title="Remove role"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Shift Schedule Section */}
          <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
            <label className="form-label" style={{ marginBottom: '12px' }}>
              <Clock size={15} style={{ color: 'var(--crew-color)' }} />
              <span>Shift Model & Working Hours</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
              <div>
                <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Shift Model</span>
                <select
                  className="form-select"
                  value={formData.crewDetails.shiftTimings.shiftType}
                  onChange={(e) =>
                    updateFormData({
                      crewDetails: {
                        ...formData.crewDetails,
                        shiftTimings: {
                          ...formData.crewDetails.shiftTimings,
                          shiftType: e.target.value as any
                        }
                      }
                    })
                  }
                >
                  <option value="morning">Morning Shift (08:00 - 16:00)</option>
                  <option value="evening">Evening Shift (15:00 - 23:00)</option>
                  <option value="night">Overnight Teardown (22:00 - 06:00)</option>
                  <option value="full_day">Full Day Production (10-14h)</option>
                  <option value="split">Split Shifts (Setup + Teardown)</option>
                </select>
              </div>

              <div>
                <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Call / Report Time</span>
                <input
                  type="time"
                  className="form-input"
                  value={formData.crewDetails.shiftTimings.startTime}
                  onChange={(e) =>
                    updateFormData({
                      crewDetails: {
                        ...formData.crewDetails,
                        shiftTimings: {
                          ...formData.crewDetails.shiftTimings,
                          startTime: e.target.value
                        }
                      }
                    })
                  }
                />
              </div>

              <div>
                <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Wrap-up Time</span>
                <input
                  type="time"
                  className="form-input"
                  value={formData.crewDetails.shiftTimings.endTime}
                  onChange={(e) =>
                    updateFormData({
                      crewDetails: {
                        ...formData.crewDetails,
                        shiftTimings: {
                          ...formData.crewDetails.shiftTimings,
                          endTime: e.target.value
                        }
                      }
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
