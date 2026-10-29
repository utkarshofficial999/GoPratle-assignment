'use client';

import React from 'react';
import {
  Sparkles,
  Music,
  Users,
  Check,
  MapPin,
  Building,
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
      {/* Step Header */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>
          Event Basics & Role Category
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Provide the foundational details of your event and choose the category of talent or crew you need.
        </p>
      </div>

      {/* Main Details Card */}
      <div className="card-panel" style={{ padding: '24px', marginBottom: '20px' }}>
        {/* Row 1: Title and Event Type */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">
              Event Title <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Annual Tech Leadership Summit 2026"
              value={formData.title}
              onChange={(e) => updateFormData({ title: e.target.value })}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

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

        {/* Row 2: Date Schedule */}
        <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <label className="form-label" style={{ margin: 0 }}>
              Event Schedule <span className="required">*</span>
            </label>
            {/* Segmented Date Type Selector */}
            <div className="segmented-control">
              <button
                type="button"
                onClick={() => updateFormData({ dateType: 'single', endDate: '' })}
                className={`segmented-control-item ${formData.dateType === 'single' ? 'active' : ''}`}
              >
                Single Day
              </button>
              <button
                type="button"
                onClick={() => updateFormData({ dateType: 'range' })}
                className={`segmented-control-item ${formData.dateType === 'range' ? 'active' : ''}`}
              >
                Date Range
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: formData.dateType === 'range' ? 'repeat(auto-fit, minmax(200px, 1fr))' : '1fr', gap: '16px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>
                {formData.dateType === 'range' ? 'Start Date' : 'Event Date'}
              </span>
              <input
                type="date"
                className="form-input"
                value={formData.startDate ? formData.startDate.substring(0, 10) : ''}
                onChange={(e) => updateFormData({ startDate: e.target.value })}
              />
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

        {/* Row 3: Location */}
        <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', marginBottom: '20px' }}>
          <label className="form-label" style={{ marginBottom: '12px' }}>
            <MapPin size={15} style={{ color: 'var(--text-muted)' }} />
            <span>Event Location</span>
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>
                City <span className="required">*</span>
              </span>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Bengaluru, Mumbai"
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
                placeholder="e.g. Karnataka"
                value={formData.location.state}
                onChange={(e) =>
                  updateFormData({
                    location: { ...formData.location, state: e.target.value }
                  })
                }
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Street / Area Address</span>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Outer Ring Road, Bellandur"
                value={formData.location.address}
                onChange={(e) =>
                  updateFormData({
                    location: { ...formData.location, address: e.target.value }
                  })
                }
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Postal Code (Optional)</span>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 560103"
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

        {/* Row 4: Venue Details */}
        <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Building size={15} style={{ color: 'var(--text-muted)' }} />
              <span style={{ fontSize: '0.813rem', fontWeight: 600, color: 'var(--text-main)' }}>Venue Information</span>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.813rem', color: 'var(--text-body)' }}>
              <input
                type="checkbox"
                checked={formData.venue.hasSpecificVenue}
                onChange={(e) =>
                  updateFormData({
                    venue: { ...formData.venue, hasSpecificVenue: e.target.checked }
                  })
                }
                style={{ width: '15px', height: '15px', cursor: 'pointer', accentColor: 'var(--primary)' }}
              />
              <span>I have already secured a specific venue</span>
            </label>
          </div>

          {formData.venue.hasSpecificVenue ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', backgroundColor: 'var(--bg-subtle)', padding: '14px', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Venue Name</span>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. JW Marriott Ballroom"
                  value={formData.venue.name}
                  onChange={(e) =>
                    updateFormData({
                      venue: { ...formData.venue, name: e.target.value }
                    })
                  }
                />
              </div>

              <div>
                <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Hall / Lawn / Stage Spec</span>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Grand Pavilion, Hall B"
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
                  placeholder="e.g. Opp. Cubbon Park"
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
            <div
              style={{
                backgroundColor: 'var(--bg-subtle)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Info size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <p style={{ fontSize: '0.781rem', color: 'var(--text-muted)', margin: 0 }}>
                Venue is flexible or to be finalized during planning. Check the box above if you already have a venue confirmed.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Category Selection Deck */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '2px' }}>
            Select Category <span className="required">*</span>
          </h2>
          <p style={{ fontSize: '0.813rem', color: 'var(--text-muted)' }}>
            The following steps adapt specifically to the requirements of the chosen category.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '12px'
          }}
        >
          {/* Card 1: Event Planner */}
          <div
            onClick={() => handleCategorySelect('planner')}
            style={{
              padding: '18px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#ffffff',
              border: formData.category === 'planner'
                ? '2px solid var(--planner-color)'
                : '1px solid var(--border-default)',
              boxShadow: formData.category === 'planner'
                ? 'var(--shadow-sm)'
                : 'var(--shadow-xs)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--planner-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Sparkles size={16} style={{ color: 'var(--planner-color)' }} />
              </div>

              {formData.category === 'planner' ? (
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--planner-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff'
                  }}
                >
                  <Check size={12} strokeWidth={3} />
                </div>
              ) : (
                <span className="badge badge-neutral">Category</span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <h3 style={{ fontSize: '0.938rem', fontWeight: 600, color: 'var(--text-main)' }}>
                Event Planner
              </h3>
              <span className="badge badge-planner">Coordination</span>
            </div>

            <p style={{ fontSize: '0.813rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '12px' }}>
              Full-scale curation, theme styling, vendor management, permits, and day-of run execution.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              <span style={{ fontSize: '0.688rem', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--bg-subtle)', color: 'var(--text-muted)' }}>
                Decor & Staging
              </span>
              <span style={{ fontSize: '0.688rem', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--bg-subtle)', color: 'var(--text-muted)' }}>
                Vendor Management
              </span>
              <span style={{ fontSize: '0.688rem', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--bg-subtle)', color: 'var(--text-muted)' }}>
                Guest Hospitality
              </span>
            </div>
          </div>

          {/* Card 2: Performer */}
          <div
            onClick={() => handleCategorySelect('performer')}
            style={{
              padding: '18px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#ffffff',
              border: formData.category === 'performer'
                ? '2px solid var(--performer-color)'
                : '1px solid var(--border-default)',
              boxShadow: formData.category === 'performer'
                ? 'var(--shadow-sm)'
                : 'var(--shadow-xs)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--performer-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Music size={16} style={{ color: 'var(--performer-color)' }} />
              </div>

              {formData.category === 'performer' ? (
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--performer-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff'
                  }}
                >
                  <Check size={12} strokeWidth={3} />
                </div>
              ) : (
                <span className="badge badge-neutral">Category</span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <h3 style={{ fontSize: '0.938rem', fontWeight: 600, color: 'var(--text-main)' }}>
                Performer
              </h3>
              <span className="badge badge-performer">Artist / Act</span>
            </div>

            <p style={{ fontSize: '0.813rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '12px' }}>
              Live bands, solo singers, DJs, standup comedians, anchors, and specialized stage artists.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              <span style={{ fontSize: '0.688rem', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--bg-subtle)', color: 'var(--text-muted)' }}>
                Sound Riders
              </span>
              <span style={{ fontSize: '0.688rem', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--bg-subtle)', color: 'var(--text-muted)' }}>
                Set Schedules
              </span>
              <span style={{ fontSize: '0.688rem', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--bg-subtle)', color: 'var(--text-muted)' }}>
                Hospitality
              </span>
            </div>
          </div>

          {/* Card 3: Crew */}
          <div
            onClick={() => handleCategorySelect('crew')}
            style={{
              padding: '18px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#ffffff',
              border: formData.category === 'crew'
                ? '2px solid var(--crew-color)'
                : '1px solid var(--border-default)',
              boxShadow: formData.category === 'crew'
                ? 'var(--shadow-sm)'
                : 'var(--shadow-xs)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--crew-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Users size={16} style={{ color: 'var(--crew-color)' }} />
              </div>

              {formData.category === 'crew' ? (
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--crew-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff'
                  }}
                >
                  <Check size={12} strokeWidth={3} />
                </div>
              ) : (
                <span className="badge badge-neutral">Category</span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <h3 style={{ fontSize: '0.938rem', fontWeight: 600, color: 'var(--text-main)' }}>
                Production Crew
              </h3>
              <span className="badge badge-crew">Crew & Tech</span>
            </div>

            <p style={{ fontSize: '0.813rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '12px' }}>
              Audio engineers, lighting techs, stagehands, camera operators, ushers, and security staff.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              <span style={{ fontSize: '0.688rem', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--bg-subtle)', color: 'var(--text-muted)' }}>
                Role Headcount
              </span>
              <span style={{ fontSize: '0.688rem', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--bg-subtle)', color: 'var(--text-muted)' }}>
                Shift Timing
              </span>
              <span style={{ fontSize: '0.688rem', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--bg-subtle)', color: 'var(--text-muted)' }}>
                Equipment Tooling
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
