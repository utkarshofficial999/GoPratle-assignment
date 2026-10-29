'use client';

import React, { useState } from 'react';
import {
  DollarSign,
  Coffee,
  ShieldCheck,
  User,
  Mail,
  Phone,
  Briefcase,
  Link2,
  Plus,
  Trash2,
  Wrench,
  Shirt,
  Volume2
} from 'lucide-react';
import { RequirementFormData } from '../../types/requirement';

interface Step3Props {
  formData: RequirementFormData;
  updateFormData: (fields: Partial<RequirementFormData>) => void;
  errors: Record<string, string>;
}

const crewToolChips = [
  'Walkie-talkie Radio Headsets',
  'Cable Testers & Multimeters',
  'Heavy Duty Gaffer Tape',
  'Leatherman / Multi-tool Kit',
  'Safety Harness & Lanyard',
  'High-luminance Work Flashlight',
  'PPE Gloves & Steel-toe Boots'
];

const crewCertChips = [
  'Electrical Safety Certified',
  'Rigging & Working at Heights',
  'Fire Safety & Evacuation',
  'First Aid & CPR Certified'
];

export const Step3LogisticsBudget: React.FC<Step3Props> = ({
  formData,
  updateFormData,
  errors
}) => {
  const { category } = formData;
  const [newSampleLink, setNewSampleLink] = useState('');

  // Performer links handler
  const addSampleLink = () => {
    if (newSampleLink.trim()) {
      const current = formData.performerDetails.sampleLinks || [];
      updateFormData({
        performerDetails: {
          ...formData.performerDetails,
          sampleLinks: [...current, newSampleLink.trim()]
        }
      });
      setNewSampleLink('');
    }
  };

  const removeSampleLink = (idx: number) => {
    const current = formData.performerDetails.sampleLinks || [];
    updateFormData({
      performerDetails: {
        ...formData.performerDetails,
        sampleLinks: current.filter((_, i) => i !== idx)
      }
    });
  };

  // Crew tools handler
  const toggleCrewTool = (tool: string) => {
    const current = formData.crewDetails.equipment.toolsRequired || [];
    const exists = current.includes(tool);
    const updated = exists ? current.filter((t) => t !== tool) : [...current, tool];
    updateFormData({
      crewDetails: {
        ...formData.crewDetails,
        equipment: {
          ...formData.crewDetails.equipment,
          toolsRequired: updated
        }
      }
    });
  };

  // Crew certs handler
  const toggleCrewCert = (cert: string) => {
    const current = formData.crewDetails.certifications || [];
    const exists = current.includes(cert);
    const updated = exists ? current.filter((c) => c !== cert) : [...current, cert];
    updateFormData({
      crewDetails: {
        ...formData.crewDetails,
        certifications: updated
      }
    });
  };

  // Calculate estimated total crew budget
  const totalCrewCount = formData.crewDetails.roles.reduce((acc, r) => acc + (r.count || 1), 0);
  const ratePerCrew = formData.crewDetails.crewBudget.amountPerCrew || 0;
  const estimatedTotalCrewBudget = totalCrewCount * ratePerCrew;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>
          Step 3: {category === 'planner' && 'Logistics, Compliance & Budget'}
          {category === 'performer' && 'Stage Rider, Hospitality & Fee'}
          {category === 'crew' && 'Gear, Perks & Compensation'}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Define operational logistics, rider provisions, budget range, and primary contact details.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* CASE A: PLANNER LOGISTICS & BUDGET                                        */}
      {/* ========================================================================= */}
      {category === 'planner' && (
        <div className="card-panel" style={{ padding: '24px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '14px' }}>
            Setup Timelines & Logistics Scope
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">On-site Setup Days Required</label>
              <select
                className="form-select"
                value={formData.plannerDetails.setupDaysNeeded}
                onChange={(e) =>
                  updateFormData({
                    plannerDetails: {
                      ...formData.plannerDetails,
                      setupDaysNeeded: parseInt(e.target.value) || 1
                    }
                  })
                }
              >
                <option value={1}>1 Day Prior (Standard Setup)</option>
                <option value={2}>2 Days Prior (Stage & Heavy Decor)</option>
                <option value={3}>3+ Days Prior (Mega Production / Trussing)</option>
                <option value={0}>Same Day Morning Only</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">F&B & Menu Coordination</label>
              <div style={{ marginTop: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.813rem', color: 'var(--text-body)' }}>
                  <input
                    type="checkbox"
                    checked={formData.plannerDetails.cateringCoordination}
                    onChange={(e) =>
                      updateFormData({
                        plannerDetails: {
                          ...formData.plannerDetails,
                          cateringCoordination: e.target.checked
                        }
                      })
                    }
                    style={{ width: '15px', height: '15px', accentColor: 'var(--primary)', cursor: 'pointer' }}
                  />
                  <span>Planner should manage catering vendor & tasting sessions</span>
                </label>
              </div>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label">Special Permits, NOCs & Compliance</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Police NOC, Sound permit up to 10 PM, Fire safety clearance"
              value={formData.plannerDetails.specialRequirements}
              onChange={(e) =>
                updateFormData({
                  plannerDetails: {
                    ...formData.plannerDetails,
                    specialRequirements: e.target.value
                  }
                })
              }
            />
          </div>

          {/* Planning Fee Budget */}
          <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
            <label className="form-label" style={{ marginBottom: '6px' }}>
              <DollarSign size={15} style={{ color: 'var(--planner-color)' }} />
              <span>Dedicated Planning Fee Budget Range (₹)</span>
            </label>
            <p style={{ fontSize: '0.813rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Agency/consultant coordination fee (excluding raw third-party vendor expenses):
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
              <div>
                <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Minimum Budget (₹)</span>
                <input
                  type="number"
                  className="form-input"
                  placeholder="e.g. 100000"
                  value={formData.plannerDetails.plannerBudget.min || ''}
                  onChange={(e) =>
                    updateFormData({
                      plannerDetails: {
                        ...formData.plannerDetails,
                        plannerBudget: {
                          ...formData.plannerDetails.plannerBudget,
                          min: parseInt(e.target.value) || 0
                        }
                      }
                    })
                  }
                />
              </div>

              <div>
                <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Maximum Budget (₹)</span>
                <input
                  type="number"
                  className="form-input"
                  placeholder="e.g. 250000"
                  value={formData.plannerDetails.plannerBudget.max || ''}
                  onChange={(e) =>
                    updateFormData({
                      plannerDetails: {
                        ...formData.plannerDetails,
                        plannerBudget: {
                          ...formData.plannerDetails.plannerBudget,
                          max: parseInt(e.target.value) || 0
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

      {/* ========================================================================= */}
      {/* CASE B: PERFORMER STAGE & RIDERS                                          */}
      {/* ========================================================================= */}
      {category === 'performer' && (
        <div className="card-panel" style={{ padding: '24px', marginBottom: '20px' }}>
          {/* Sound & Stage Technical Rider */}
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '14px' }}>
            <Volume2 size={16} style={{ color: 'var(--performer-color)', verticalAlign: 'middle', marginRight: '6px' }} />
            Sound & Stage Technical Rider
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '16px' }}>
            <div>
              <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Stage Footprint Needed</span>
              <select
                className="form-select"
                value={formData.performerDetails.soundAndStage.stageSizeNeeded}
                onChange={(e) =>
                  updateFormData({
                    performerDetails: {
                      ...formData.performerDetails,
                      soundAndStage: {
                        ...formData.performerDetails.soundAndStage,
                        stageSizeNeeded: e.target.value
                      }
                    }
                  })
                }
              >
                <option value="Small (12x8 ft)">Small (12x8 ft) - Solo / Acoustic</option>
                <option value="Medium (16x12 ft)">Medium (16x12 ft) - 4-piece Band</option>
                <option value="Large (24x16 ft)">Large (24x16 ft) - Full Band / Troupe</option>
                <option value="Concert Rig (32x24 ft)">Concert Rig (32x24 ft)</option>
              </select>
            </div>

            <div>
              <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Mics Needed</span>
              <input
                type="number"
                min={1}
                max={16}
                className="form-input"
                value={formData.performerDetails.soundAndStage.micCount}
                onChange={(e) =>
                  updateFormData({
                    performerDetails: {
                      ...formData.performerDetails,
                      soundAndStage: {
                        ...formData.performerDetails.soundAndStage,
                        micCount: parseInt(e.target.value) || 1
                      }
                    }
                  })
                }
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.813rem', color: 'var(--text-body)' }}>
              <input
                type="checkbox"
                checked={formData.performerDetails.soundAndStage.paSystemRequired}
                onChange={(e) =>
                  updateFormData({
                    performerDetails: {
                      ...formData.performerDetails,
                      soundAndStage: {
                        ...formData.performerDetails.soundAndStage,
                        paSystemRequired: e.target.checked
                      }
                    }
                  })
                }
                style={{ width: '15px', height: '15px', accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
              <span>Organizer must provide full PA sound system</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.813rem', color: 'var(--text-body)' }}>
              <input
                type="checkbox"
                checked={formData.performerDetails.soundAndStage.inEarMonitors}
                onChange={(e) =>
                  updateFormData({
                    performerDetails: {
                      ...formData.performerDetails,
                      soundAndStage: {
                        ...formData.performerDetails.soundAndStage,
                        inEarMonitors: e.target.checked
                      }
                    }
                  })
                }
                style={{ width: '15px', height: '15px', accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
              <span>Wireless In-Ear Monitor (IEM) channels required</span>
            </label>
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Backline & Instrument Notes</span>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Drum kit required on-site, 2 DI boxes, Guitar amp (Fender/Marshall)"
              value={formData.performerDetails.soundAndStage.instrumentDetails}
              onChange={(e) =>
                updateFormData({
                  performerDetails: {
                    ...formData.performerDetails,
                    soundAndStage: {
                      ...formData.performerDetails.soundAndStage,
                      instrumentDetails: e.target.value
                    }
                  }
                })
              }
            />
          </div>

          {/* Hospitality & Comfort Rider */}
          <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '12px' }}>
              <Coffee size={15} style={{ color: 'var(--performer-color)', verticalAlign: 'middle', marginRight: '6px' }} />
              Hospitality & Travel Provisions
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.813rem', color: 'var(--text-body)' }}>
                <input
                  type="checkbox"
                  checked={formData.performerDetails.hospitality.greenRoomRequired}
                  onChange={(e) =>
                    updateFormData({
                      performerDetails: {
                        ...formData.performerDetails,
                        hospitality: {
                          ...formData.performerDetails.hospitality,
                          greenRoomRequired: e.target.checked
                        }
                      }
                    })
                  }
                  style={{ width: '15px', height: '15px', accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
                <span>Private Air-conditioned Green Room</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.813rem', color: 'var(--text-body)' }}>
                <input
                  type="checkbox"
                  checked={formData.performerDetails.hospitality.mealsBeverages}
                  onChange={(e) =>
                    updateFormData({
                      performerDetails: {
                        ...formData.performerDetails,
                        hospitality: {
                          ...formData.performerDetails.hospitality,
                          mealsBeverages: e.target.checked
                        }
                      }
                    })
                  }
                  style={{ width: '15px', height: '15px', accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
                <span>Artist Meals & Refreshments</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.813rem', color: 'var(--text-body)' }}>
                <input
                  type="checkbox"
                  checked={formData.performerDetails.hospitality.accommodationNeeded}
                  onChange={(e) =>
                    updateFormData({
                      performerDetails: {
                        ...formData.performerDetails,
                        hospitality: {
                          ...formData.performerDetails.hospitality,
                          accommodationNeeded: e.target.checked
                        }
                      }
                    })
                  }
                  style={{ width: '15px', height: '15px', accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
                <span>Outstation Hotel Stay Provided</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.813rem', color: 'var(--text-body)' }}>
                <input
                  type="checkbox"
                  checked={formData.performerDetails.hospitality.travelReimbursement}
                  onChange={(e) =>
                    updateFormData({
                      performerDetails: {
                        ...formData.performerDetails,
                        hospitality: {
                          ...formData.performerDetails.hospitality,
                          travelReimbursement: e.target.checked
                        }
                      }
                    })
                  }
                  style={{ width: '15px', height: '15px', accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
                <span>Flight / Local Travel Reimbursed</span>
              </label>
            </div>
          </div>

          {/* Sample Links */}
          <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', marginBottom: '20px' }}>
            <label className="form-label" style={{ marginBottom: '6px' }}>
              <Link2 size={15} style={{ color: 'var(--performer-color)' }} />
              <span>Sample Audio / Video References</span>
            </label>
            <p style={{ fontSize: '0.813rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
              Add links to past live performances or tracks you would like them to review:
            </p>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <input
                type="url"
                className="form-input"
                placeholder="https://youtube.com/watch?v=... or SoundCloud link"
                value={newSampleLink}
                onChange={(e) => setNewSampleLink(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSampleLink())}
              />
              <button
                type="button"
                onClick={addSampleLink}
                className="btn btn-secondary"
                style={{ flexShrink: 0 }}
              >
                <Plus size={14} /> Add
              </button>
            </div>

            {formData.performerDetails.sampleLinks && formData.performerDetails.sampleLinks.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {formData.performerDetails.sampleLinks.map((link, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: 'var(--bg-subtle)',
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.813rem'
                    }}
                  >
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--primary)', textDecoration: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '85%' }}
                    >
                      {link}
                    </a>
                    <button
                      type="button"
                      onClick={() => removeSampleLink(idx)}
                      style={{ backgroundColor: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Fee Budget */}
          <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
            <label className="form-label" style={{ marginBottom: '6px' }}>
              <DollarSign size={15} style={{ color: 'var(--performer-color)' }} />
              <span>Artist Performance Fee Budget Range (₹)</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
              <div>
                <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Minimum Fee (₹)</span>
                <input
                  type="number"
                  className="form-input"
                  placeholder="e.g. 80000"
                  value={formData.performerDetails.feeBudget.min || ''}
                  onChange={(e) =>
                    updateFormData({
                      performerDetails: {
                        ...formData.performerDetails,
                        feeBudget: {
                          ...formData.performerDetails.feeBudget,
                          min: parseInt(e.target.value) || 0
                        }
                      }
                    })
                  }
                />
              </div>

              <div>
                <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Maximum Fee (₹)</span>
                <input
                  type="number"
                  className="form-input"
                  placeholder="e.g. 150000"
                  value={formData.performerDetails.feeBudget.max || ''}
                  onChange={(e) =>
                    updateFormData({
                      performerDetails: {
                        ...formData.performerDetails,
                        feeBudget: {
                          ...formData.performerDetails.feeBudget,
                          max: parseInt(e.target.value) || 0
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

      {/* ========================================================================= */}
      {/* CASE C: CREW GEAR & LOGISTICS                                            */}
      {/* ========================================================================= */}
      {category === 'crew' && (
        <div className="card-panel" style={{ padding: '24px', marginBottom: '20px' }}>
          {/* Equipment Provisioning */}
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '14px' }}>
            <Wrench size={16} style={{ color: 'var(--crew-color)', verticalAlign: 'middle', marginRight: '6px' }} />
            Equipment & Tools Policy
          </h2>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.813rem', color: 'var(--text-body)' }}>
              <input
                type="checkbox"
                checked={formData.crewDetails.equipment.provideOwnGear}
                onChange={(e) =>
                  updateFormData({
                    crewDetails: {
                      ...formData.crewDetails,
                      equipment: {
                        ...formData.crewDetails.equipment,
                        provideOwnGear: e.target.checked
                      }
                    }
                  })
                }
                style={{ width: '15px', height: '15px', accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
              <span>Crew members must bring their own professional toolkits / personal gear</span>
            </label>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <span className="form-hint" style={{ marginBottom: '6px', display: 'block' }}>Required Tools & Safety Equipment:</span>
            <div className="chip-grid">
              {crewToolChips.map((tool) => {
                const isSelected = formData.crewDetails.equipment.toolsRequired?.includes(tool);
                return (
                  <div
                    key={tool}
                    onClick={() => toggleCrewTool(tool)}
                    className={`chip ${isSelected ? 'active' : ''}`}
                    style={
                      isSelected
                        ? {
                            backgroundColor: 'var(--crew-subtle)',
                            borderColor: 'var(--crew-color)',
                            color: 'var(--crew-color)'
                          }
                        : {}
                    }
                  >
                    {tool}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dress Code & Uniform */}
          <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', marginBottom: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">
                  <Shirt size={14} style={{ color: 'var(--crew-color)' }} />
                  <span>Uniform / Dress Code</span>
                </label>
                <select
                  className="form-select"
                  value={formData.crewDetails.dressCode}
                  onChange={(e) =>
                    updateFormData({
                      crewDetails: {
                        ...formData.crewDetails,
                        dressCode: e.target.value as any
                      }
                    })
                  }
                >
                  <option value="all_black">Standard All-Black Production Attire</option>
                  <option value="formal">Black Suit / Formal Corporate</option>
                  <option value="smart_casual">Smart Casual Collared</option>
                  <option value="branded_tee">Event Branded T-shirt (Provided on site)</option>
                  <option value="safety_hi_vis">Hi-Vis Safety Vest & Hard Hat</option>
                </select>
              </div>

              {/* Amenities */}
              <div>
                <label className="form-label" style={{ marginBottom: '8px' }}>
                  Perks & Welfare
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.813rem', color: 'var(--text-body)' }}>
                    <input
                      type="checkbox"
                      checked={formData.crewDetails.amenities.mealsProvided}
                      onChange={(e) =>
                        updateFormData({
                          crewDetails: {
                            ...formData.crewDetails,
                            amenities: {
                              ...formData.crewDetails.amenities,
                              mealsProvided: e.target.checked
                            }
                          }
                        })
                      }
                      style={{ width: '14px', height: '14px', accentColor: 'var(--primary)', cursor: 'pointer' }}
                    />
                    <span>Crew Meals & Bottled Water Provided</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.813rem', color: 'var(--text-body)' }}>
                    <input
                      type="checkbox"
                      checked={formData.crewDetails.amenities.travelAllowance}
                      onChange={(e) =>
                        updateFormData({
                          crewDetails: {
                            ...formData.crewDetails,
                            amenities: {
                              ...formData.crewDetails.amenities,
                              travelAllowance: e.target.checked
                            }
                          }
                        })
                      }
                      style={{ width: '14px', height: '14px', accentColor: 'var(--primary)', cursor: 'pointer' }}
                    />
                    <span>Travel / Fuel Reimbursement Included</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.813rem', color: 'var(--text-body)' }}>
                    <input
                      type="checkbox"
                      checked={formData.crewDetails.amenities.overtimePay}
                      onChange={(e) =>
                        updateFormData({
                          crewDetails: {
                            ...formData.crewDetails,
                            amenities: {
                              ...formData.crewDetails.amenities,
                              overtimePay: e.target.checked
                            }
                          }
                        })
                      }
                      style={{ width: '14px', height: '14px', accentColor: 'var(--primary)', cursor: 'pointer' }}
                    />
                    <span>Overtime Compensation for hours past wrap</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', marginBottom: '20px' }}>
            <label className="form-label" style={{ marginBottom: '6px' }}>
              <ShieldCheck size={15} style={{ color: 'var(--crew-color)' }} />
              <span>Safety Certifications Desired</span>
            </label>
            <div className="chip-grid">
              {crewCertChips.map((cert) => {
                const isSelected = formData.crewDetails.certifications?.includes(cert);
                return (
                  <div
                    key={cert}
                    onClick={() => toggleCrewCert(cert)}
                    className={`chip ${isSelected ? 'active' : ''}`}
                    style={
                      isSelected
                        ? {
                            backgroundColor: 'var(--crew-subtle)',
                            borderColor: 'var(--crew-color)',
                            color: 'var(--crew-color)'
                          }
                        : {}
                    }
                  >
                    {cert}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Compensation Structure */}
          <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
            <label className="form-label" style={{ marginBottom: '8px' }}>
              <DollarSign size={15} style={{ color: 'var(--crew-color)' }} />
              <span>Crew Rates & Budget Calculator</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
              <div>
                <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Rate Structure</span>
                <select
                  className="form-select"
                  value={formData.crewDetails.crewBudget.rateType}
                  onChange={(e) =>
                    updateFormData({
                      crewDetails: {
                        ...formData.crewDetails,
                        crewBudget: {
                          ...formData.crewDetails.crewBudget,
                          rateType: e.target.value as any
                        }
                      }
                    })
                  }
                >
                  <option value="daily">Per Day (Day Rate)</option>
                  <option value="hourly">Hourly Rate</option>
                  <option value="project">Total Project Lump Sum</option>
                </select>
              </div>

              <div>
                <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Rate per Member (₹)</span>
                <input
                  type="number"
                  className="form-input"
                  placeholder="e.g. 3500"
                  value={formData.crewDetails.crewBudget.amountPerCrew || ''}
                  onChange={(e) => {
                    const amt = parseInt(e.target.value) || 0;
                    updateFormData({
                      crewDetails: {
                        ...formData.crewDetails,
                        crewBudget: {
                          ...formData.crewDetails.crewBudget,
                          amountPerCrew: amt,
                          totalEstimatedBudget: amt * totalCrewCount
                        }
                      }
                    });
                  }}
                />
              </div>

              <div>
                <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Total Estimated Budget (₹)</span>
                <div
                  style={{
                    padding: '8px 12px',
                    backgroundColor: 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    fontSize: '0.938rem',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>₹ {estimatedTotalCrewBudget.toLocaleString('en-IN')}</span>
                  <span style={{ fontSize: '0.688rem', fontWeight: 500, color: 'var(--text-muted)' }}>
                    ({totalCrewCount} crew)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* UNIVERSAL ORGANIZER CONTACT CARD                                          */}
      {/* ========================================================================= */}
      <div className="card-panel" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>
          Organizer & Point of Contact
        </h2>
        <p style={{ fontSize: '0.813rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          This information will be associated with the requirement so applicants and agency partners can reach out.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">
              <User size={14} style={{ color: 'var(--text-muted)' }} />
              <span>Contact Name</span> <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Vikram Malhotra"
              value={formData.organizer.name}
              onChange={(e) =>
                updateFormData({
                  organizer: { ...formData.organizer, name: e.target.value }
                })
              }
            />
            {errors.organizerName && <span className="error-text">{errors.organizerName}</span>}
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">
              <Mail size={14} style={{ color: 'var(--text-muted)' }} />
              <span>Email Address</span> <span className="required">*</span>
            </label>
            <input
              type="email"
              className="form-input"
              placeholder="e.g. vikram@eventpro.com"
              value={formData.organizer.email}
              onChange={(e) =>
                updateFormData({
                  organizer: { ...formData.organizer, email: e.target.value }
                })
              }
            />
            {errors.organizerEmail && <span className="error-text">{errors.organizerEmail}</span>}
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">
              <Phone size={14} style={{ color: 'var(--text-muted)' }} />
              <span>Phone / WhatsApp</span>
            </label>
            <input
              type="tel"
              className="form-input"
              placeholder="e.g. +91 98765 43210"
              value={formData.organizer.phone}
              onChange={(e) =>
                updateFormData({
                  organizer: { ...formData.organizer, phone: e.target.value }
                })
              }
            />
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">
              <Briefcase size={14} style={{ color: 'var(--text-muted)' }} />
              <span>Organization / Client</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Google India / Pratle Media"
              value={formData.organizer.organization}
              onChange={(e) =>
                updateFormData({
                  organizer: { ...formData.organizer, organization: e.target.value }
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
