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
  Layers,
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
  const updateCrewRoleCount = (index: number, delta: number) => {
    const roles = [...formData.crewDetails.roles];
    if (roles[index]) {
      const newCount = Math.max(1, (roles[index].count || 1) + delta);
      roles[index] = { ...roles[index], count: newCount };
      updateFormData({
        crewDetails: { ...formData.crewDetails, roles }
      });
    }
  };

  const updateCrewRoleExp = (index: number, exp: 'junior' | 'mid' | 'senior' | 'lead') => {
    const roles = [...formData.crewDetails.roles];
    if (roles[index]) {
      roles[index] = { ...roles[index], experienceLevel: exp };
      updateFormData({
        crewDetails: { ...formData.crewDetails, roles }
      });
    }
  };

  const addCrewRole = (roleName: string) => {
    const roles = [...formData.crewDetails.roles];
    if (!roles.some((r) => r.role === roleName)) {
      roles.push({ role: roleName, count: 1, experienceLevel: 'mid' });
      updateFormData({
        crewDetails: { ...formData.crewDetails, roles }
      });
    }
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>
              Step 2: {category === 'planner' && 'Planning Scope & Scale'}
              {category === 'performer' && 'Performance Style & Set Details'}
              {category === 'crew' && 'Crew Headcount & Roles'}
            </h2>
            <span
              className={`badge badge-${category}`}
              style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            >
              {category.toUpperCase()}
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {category === 'planner' && 'Define the deliverables, guest size, and styling scope expected from your Event Planner.'}
            {category === 'performer' && 'Specify the performer genre, act duration, and performance style needed for your stage.'}
            {category === 'crew' && 'Add production crew roles, assign quantities and experience tiers needed for the event.'}
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CASE A: PLANNER ADAPTIVE FIELDS                                          */}
      {/* ========================================================================= */}
      {category === 'planner' && (
        <div className="glass-panel" style={{ padding: '28px', borderLeft: '4px solid var(--planner-color)' }}>
          {/* Services Checklist */}
          <div style={{ marginBottom: '24px' }}>
            <label className="form-label" style={{ marginBottom: '10px' }}>
              <Sparkles size={16} color="var(--planner-color)" />
              Planning Services Required
            </label>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '12px' }}>
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
                    style={isSelected ? { background: 'rgba(16, 185, 129, 0.15)', borderColor: 'var(--planner-color)' } : {}}
                  >
                    {service}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Guest Count Tier */}
          <div style={{ marginBottom: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
            <label className="form-label" style={{ marginBottom: '10px' }}>
              <Users size={16} color="var(--planner-color)" />
              Expected Guest Count Tier
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '12px'
            }}>
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
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      background: isSelected ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-dark-card)',
                      border: isSelected ? '1.5px solid var(--planner-color)' : '1px solid var(--border-subtle)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: isSelected ? '#ffffff' : 'var(--text-main)', marginBottom: '2px' }}>
                      {tier.label}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                      {tier.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Theme & Decor Preferences */}
          <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Theme / Aesthetic Concept</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Traditional Royal Rajputana, Cyberpunk Neon, Classic White Elegance"
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
                  placeholder="e.g. Floral arches, fairy lights canopy, LED wall with live streaming"
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
        <div className="glass-panel" style={{ padding: '28px', borderLeft: '4px solid var(--performer-color)' }}>
          {/* Performer Act Selection */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">
                <Music size={16} color="var(--performer-color)" />
                Performer Role / Type of Act <span className="required">*</span>
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
                <Clock size={16} color="var(--performer-color)" />
                Performance Duration & Sets
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
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
                  <option value="Multiple sets">Multiple Sets throughout evening</option>
                </select>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(13, 18, 30, 0.8)', padding: '0 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sets:</span>
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
                      width: '45px',
                      background: 'transparent',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      fontWeight: 700,
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
            <label className="form-label" style={{ marginBottom: '10px' }}>
              <Layers size={16} color="var(--performer-color)" />
              Musical / Act Genres & Style
            </label>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '12px' }}>
              Select all genres suitable for your audience:
            </p>
            <div className="chip-grid">
              {genreChips.map((genre) => {
                const isSelected = formData.performerDetails.genres?.includes(genre);
                return (
                  <div
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    className={`chip ${isSelected ? 'active' : ''}`}
                    style={isSelected ? { background: 'rgba(168, 85, 247, 0.15)', borderColor: 'var(--performer-color)' } : {}}
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
        <div className="glass-panel" style={{ padding: '28px', borderLeft: '4px solid var(--crew-color)' }}>
          {/* Roles List */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <label className="form-label" style={{ margin: 0 }}>
                <Users size={16} color="var(--crew-color)" />
                Crew Roles & Headcount Builder
              </label>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                Total Crew Members:{' '}
                <strong style={{ color: 'var(--crew-color)' }}>
                  {formData.crewDetails.roles.reduce((acc, r) => acc + (r.count || 1), 0)}
                </strong>
              </span>
            </div>

            {/* Quick Add Presets */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                Quick add:
              </span>
              {defaultCrewRoleTemplates.map((tpl) => (
                <button
                  key={tpl}
                  type="button"
                  onClick={() => addCrewRole(tpl)}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.74rem', padding: '4px 10px', borderRadius: '6px' }}
                >
                  <Plus size={12} />
                  {tpl}
                </button>
              ))}
            </div>

            {/* Active Crew Roles Table/Card List */}
            {formData.crewDetails.roles.length === 0 ? (
              <div style={{
                padding: '24px',
                textAlign: 'center',
                background: 'rgba(13, 18, 30, 0.6)',
                borderRadius: 'var(--radius-md)',
                border: '1px dashed var(--border-subtle)'
              }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '8px' }}>
                  No crew roles added yet. Click on any quick add button above to add roles!
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {formData.crewDetails.roles.map((roleItem, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'rgba(13, 18, 30, 0.8)',
                      padding: '12px 18px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    {/* Role Title */}
                    <div style={{ flex: 1, minWidth: '180px' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#ffffff' }}>
                        {roleItem.role}
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                        Position #{idx + 1}
                      </span>
                    </div>

                    {/* Experience Tier Selector */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: '20px' }}>
                      <Award size={14} color="var(--text-dim)" />
                      <select
                        value={roleItem.experienceLevel}
                        onChange={(e) => updateCrewRoleExp(idx, e.target.value as any)}
                        style={{
                          background: 'var(--bg-dark-card)',
                          color: 'var(--text-main)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          fontSize: '0.78rem',
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
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'var(--bg-dark-card)',
                        borderRadius: '8px',
                        border: '1px solid var(--border-subtle)',
                        overflow: 'hidden'
                      }}>
                        <button
                          type="button"
                          onClick={() => updateCrewRoleCount(idx, -1)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-muted)',
                            padding: '6px 10px',
                            cursor: 'pointer'
                          }}
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{ minWidth: '28px', textAlign: 'center', fontWeight: 700, fontSize: '0.88rem' }}>
                          {roleItem.count}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCrewRoleCount(idx, 1)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-muted)',
                            padding: '6px 10px',
                            cursor: 'pointer'
                          }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeCrewRole(idx)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#f43f5e',
                          padding: '6px',
                          cursor: 'pointer'
                        }}
                        title="Remove role"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Shift Schedule Section */}
          <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
            <label className="form-label" style={{ marginBottom: '14px' }}>
              <Clock size={16} color="var(--crew-color)" />
              Shift Timings & Working Hours
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
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
                  <option value="morning">Morning Shift (e.g. 08:00 - 16:00)</option>
                  <option value="evening">Evening Shift (e.g. 15:00 - 23:00)</option>
                  <option value="night">Overnight / Teardown (22:00 - 06:00)</option>
                  <option value="full_day">Full Day Production (10-14 hours)</option>
                  <option value="split">Split Shifts (Setup + Teardown)</option>
                </select>
              </div>

              <div>
                <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Report Time</span>
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
