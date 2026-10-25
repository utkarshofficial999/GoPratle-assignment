'use client';

import React from 'react';
import {
  Calendar,
  MapPin,
  Building,
  Sparkles,
  Music,
  Users,
  Check,
  CalendarRange,
  Info
} from 'lucide-react';
import {
  RequirementFormData,
  EventType,
  EventCategory
} from '../../types/requirement';

interface Step1Props {
  formData: RequirementFormData;
  updateFormData: (fields: Partial<RequirementFormData>) => void;
  errors: Record<string, string>;
}

const eventTypes: EventType[] = [
  'Wedding',
  'Corporate Conference',
  'Live Concert',
  'Birthday Celebration',
  'College Fest / Cultural',
  'Exhibition / Trade Show',
  'Private Gathering / Party',
  'Festival / Gala',
  'Other'
];

export const Step1EventBasics: React.FC<Step1Props> = ({
  formData,
  updateFormData,
  errors
}) => {
  const handleCategorySelect = (category: EventCategory) => {
    updateFormData({ category });
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
          Step 1: Event Basics & Role Category
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Specify your core event details and choose whether you are hiring an Event Planner, Performer, or Production Crew.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '28px', marginBottom: '28px' }}>
        {/* Section 1: Event Identity */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {/* Event Name */}
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">
              Event Name / Title <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Royal Heritage Wedding, TechCon Bangalore 2026"
              value={formData.title}
              onChange={(e) => updateFormData({ title: e.target.value })}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          {/* Event Type */}
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">
              Event Type <span className="required">*</span>
            </label>
            <select
              className="form-select"
              value={formData.eventType}
              onChange={(e) => updateFormData({ eventType: e.target.value as EventType })}
            >
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Section 2: Date Configuration */}
        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <label className="form-label" style={{ margin: 0 }}>
              Event Schedule & Dates <span className="required">*</span>
            </label>
            {/* Date Type Toggle */}
            <div style={{
              display: 'flex',
              background: 'var(--bg-dark-base)',
              padding: '3px',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)'
            }}>
              <button
                type="button"
                onClick={() => updateFormData({ dateType: 'single', endDate: '' })}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  background: formData.dateType === 'single' ? 'var(--primary)' : 'transparent',
                  color: formData.dateType === 'single' ? '#ffffff' : 'var(--text-muted)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Single Day
              </button>
              <button
                type="button"
                onClick={() => updateFormData({ dateType: 'range' })}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  background: formData.dateType === 'range' ? 'var(--primary)' : 'transparent',
                  color: formData.dateType === 'range' ? '#ffffff' : 'var(--text-muted)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Date Range
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: formData.dateType === 'range' ? '1fr 1fr' : '1fr', gap: '16px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>
                {formData.dateType === 'range' ? 'Start Date' : 'Event Date'}
              </span>
              <div style={{ position: 'relative' }}>
                <input
                  type="date"
                  className="form-input"
                  value={formData.startDate ? formData.startDate.substring(0, 10) : ''}
                  onChange={(e) => updateFormData({ startDate: e.target.value })}
                />
              </div>
              {errors.startDate && <span className="error-text">{errors.startDate}</span>}
            </div>

            {formData.dateType === 'range' && (
              <div className="form-group" style={{ margin: 0 }}>
                <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>
                  End Date
                </span>
                <input
                  type="date"
                  className="form-input"
                  min={formData.startDate ? formData.startDate.substring(0, 10) : undefined}
                  value={formData.endDate ? formData.endDate.substring(0, 10) : ''}
                  onChange={(e) => updateFormData({ endDate: e.target.value })}
                />
                {errors.endDate && <span className="error-text">{errors.endDate}</span>}
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Location Details */}
        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
          <label className="form-label" style={{ marginBottom: '14px' }}>
            <MapPin size={16} color="#818cf8" />
            Location & Geographic Details
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>City <span className="required">*</span></span>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Bangalore, Mumbai, Delhi"
                value={formData.location.city}
                onChange={(e) =>
                  updateFormData({
                    location: { ...formData.location, city: e.target.value }
                  })
                }
              />
              {errors.city && <span className="error-text">{errors.city}</span>}
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>State / Region</span>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Karnataka, Maharashtra"
                value={formData.location.state}
                onChange={(e) =>
                  updateFormData({
                    location: { ...formData.location, state: e.target.value }
                  })
                }
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Area / Address</span>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Whitefield, Indiranagar"
                value={formData.location.address}
                onChange={(e) =>
                  updateFormData({
                    location: { ...formData.location, address: e.target.value }
                  })
                }
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Pincode (Optional)</span>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 560066"
                value={formData.location.pincode}
                onChange={(e) =>
                  updateFormData({
                    location: { ...formData.location, pincode: e.target.value }
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Section 4: Optional Specific Venue */}
        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building size={16} color="#818cf8" />
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Venue Information</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', background: 'rgba(255, 255, 255, 0.05)', padding: '2px 6px', borderRadius: '4px' }}>
                Optional
              </span>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <input
                type="checkbox"
                checked={formData.venue.hasSpecificVenue}
                onChange={(e) =>
                  updateFormData({
                    venue: { ...formData.venue, hasSpecificVenue: e.target.checked }
                  })
                }
                style={{ width: '16px', height: '16px', accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
              I have a specific booked venue
            </label>
          </div>

          {formData.venue.hasSpecificVenue ? (
            <div style={{
              background: 'rgba(10, 13, 20, 0.6)',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '14px'
            }}>
              <div>
                <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Venue Name</span>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. ITC Gardenia, Bangalore Palace"
                  value={formData.venue.name}
                  onChange={(e) =>
                    updateFormData({
                      venue: { ...formData.venue, name: e.target.value }
                    })
                  }
                />
              </div>

              <div>
                <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Hall / Banquet / Lawn Details</span>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Grand Ballroom, 2nd Floor Lawn"
                  value={formData.venue.hallDetails}
                  onChange={(e) =>
                    updateFormData({
                      venue: { ...formData.venue, hallDetails: e.target.value }
                    })
                  }
                />
              </div>

              <div>
                <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Landmark</span>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Near Cubbon Park Metro"
                  value={formData.venue.landmark}
                  onChange={(e) =>
                    updateFormData({
                      venue: { ...formData.venue, landmark: e.target.value }
                    })
                  }
                />
              </div>
            </div>
          ) : (
            <div style={{
              background: 'rgba(99, 102, 241, 0.05)',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed rgba(99, 102, 241, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Info size={16} color="#818cf8" />
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Venue is currently flexible or to be finalized with your chosen Event Planner. Check the box above if you already have a venue confirmed.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Section 5: The Critical Category Selector */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>
              Select Requirement Category <span className="required" style={{ color: '#f43f5e' }}>*</span>
            </h3>
            <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)' }}>
              Steps 2 and 3 will automatically configure to capture fields bespoke to your chosen role.
            </p>
          </div>
        </div>

        {/* 3 Interactive Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px'
        }}>
          {/* Card 1: Event Planner */}
          <div
            onClick={() => handleCategorySelect('planner')}
            style={{
              padding: '22px',
              borderRadius: 'var(--radius-lg)',
              background: formData.category === 'planner'
                ? 'linear-gradient(145deg, rgba(16, 185, 129, 0.12) 0%, rgba(17, 23, 38, 0.9) 100%)'
                : 'var(--bg-dark-card)',
              border: formData.category === 'planner'
                ? '2px solid var(--planner-color)'
                : '1px solid var(--border-subtle)',
              boxShadow: formData.category === 'planner'
                ? '0 0 25px var(--planner-glow)'
                : 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative'
            }}
          >
            {formData.category === 'planner' && (
              <div style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'var(--planner-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px var(--planner-glow)'
              }}>
                <Check size={14} color="#ffffff" strokeWidth={3} />
              </div>
            )}

            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              <Sparkles size={22} color="var(--planner-color)" />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>Event Planner</h4>
              <span className="badge badge-planner">Coordination</span>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45, marginBottom: '14px' }}>
              For full event curation, theme design, vendor management, guest management, and day-of execution.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              <span style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-dim)' }}>
                Decor & Staging
              </span>
              <span style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-dim)' }}>
                Vendor Sourcing
              </span>
              <span style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-dim)' }}>
                Guest Hospitality
              </span>
            </div>
          </div>

          {/* Card 2: Performer */}
          <div
            onClick={() => handleCategorySelect('performer')}
            style={{
              padding: '22px',
              borderRadius: 'var(--radius-lg)',
              background: formData.category === 'performer'
                ? 'linear-gradient(145deg, rgba(168, 85, 247, 0.12) 0%, rgba(17, 23, 38, 0.9) 100%)'
                : 'var(--bg-dark-card)',
              border: formData.category === 'performer'
                ? '2px solid var(--performer-color)'
                : '1px solid var(--border-subtle)',
              boxShadow: formData.category === 'performer'
                ? '0 0 25px var(--performer-glow)'
                : 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative'
            }}
          >
            {formData.category === 'performer' && (
              <div style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'var(--performer-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px var(--performer-glow)'
              }}>
                <Check size={14} color="#ffffff" strokeWidth={3} />
              </div>
            )}

            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(168, 85, 247, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px',
              border: '1px solid rgba(168, 85, 247, 0.3)'
            }}>
              <Music size={22} color="var(--performer-color)" />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>Performer</h4>
              <span className="badge badge-performer">Artist / Act</span>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45, marginBottom: '14px' }}>
              For live music bands, solo vocalists, DJ headliners, standup comedians, emcees, and entertainers.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              <span style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-dim)' }}>
                Sound Riders
              </span>
              <span style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-dim)' }}>
                Set Times
              </span>
              <span style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-dim)' }}>
                Green Room
              </span>
            </div>
          </div>

          {/* Card 3: Crew */}
          <div
            onClick={() => handleCategorySelect('crew')}
            style={{
              padding: '22px',
              borderRadius: 'var(--radius-lg)',
              background: formData.category === 'crew'
                ? 'linear-gradient(145deg, rgba(245, 158, 11, 0.12) 0%, rgba(17, 23, 38, 0.9) 100%)'
                : 'var(--bg-dark-card)',
              border: formData.category === 'crew'
                ? '2px solid var(--crew-color)'
                : '1px solid var(--border-subtle)',
              boxShadow: formData.category === 'crew'
                ? '0 0 25px var(--crew-glow)'
                : 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative'
            }}
          >
            {formData.category === 'crew' && (
              <div style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'var(--crew-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px var(--crew-glow)'
              }}>
                <Check size={14} color="#ffffff" strokeWidth={3} />
              </div>
            )}

            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px',
              border: '1px solid rgba(245, 158, 11, 0.3)'
            }}>
              <Users size={22} color="var(--crew-color)" />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>Crew</h4>
              <span className="badge badge-crew">Production Staff</span>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45, marginBottom: '14px' }}>
              For technical sound/light engineers, stagehands, camera operators, riggers, ushers, and security staff.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              <span style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-dim)' }}>
                Headcounts
              </span>
              <span style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-dim)' }}>
                Shift Timings
              </span>
              <span style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-dim)' }}>
                Tool Requirements
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
