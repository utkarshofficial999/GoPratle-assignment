'use client';

import React, { useState } from 'react';
import {
  DollarSign,
  Radio,
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
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
          Step 3: {category === 'planner' && 'Logistics, Compliance & Budget'}
          {category === 'performer' && 'Stage Rider, Hospitality & Fee'}
          {category === 'crew' && 'Gear, Perks & Compensation'}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Finalize technical specifications, hospitality riders, budget boundaries, and organizer contact details.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* CASE A: PLANNER LOGISTICS & BUDGET                                        */}
      {/* ========================================================================= */}
      {category === 'planner' && (
        <div className="glass-panel" style={{ padding: '28px', marginBottom: '24px', borderLeft: '4px solid var(--planner-color)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
            Setup Timelines & Logistics Scope
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>
                On-site Setup Days Prior
              </span>
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
                <option value={2}>2 Days Prior (Heavy Staging & Truss)</option>
                <option value={3}>3+ Days Prior (Mega Production / Expo)</option>
                <option value={0}>Same Day Morning Only</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
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
                  style={{ width: '18px', height: '18px', accentColor: 'var(--planner-color)' }}
                />
                <span>Include Catering & F&B Tasting Management</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>
              Permits, Compliance & Special Instructions
            </span>
            <textarea
              className="form-textarea"
              placeholder="e.g. Organizer requires Police NOC, Fire Safety Clearance, Sound limiter compliance past 10 PM"
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

          {/* Dedicated Planner Budget */}
          <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
            <label className="form-label" style={{ marginBottom: '12px' }}>
              <DollarSign size={16} color="var(--planner-color)" />
              Dedicated Planning & Management Budget (INR ₹)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Minimum Budget (₹)</span>
                <input
                  type="number"
                  className="form-input"
                  placeholder="e.g. 150000"
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
                  placeholder="e.g. 350000"
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
      {/* CASE B: PERFORMER STAGE RIDER & FEE                                      */}
      {/* ========================================================================= */}
      {category === 'performer' && (
        <div className="glass-panel" style={{ padding: '28px', marginBottom: '24px', borderLeft: '4px solid var(--performer-color)' }}>
          {/* Sound & Stage Tech */}
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
            <Volume2 size={18} color="var(--performer-color)" style={{ verticalAlign: 'middle', marginRight: '6px' }} />
            Stage & Audio Technical Rider
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '18px' }}>
            <div>
              <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Stage Dimensions Needed</span>
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
                <option value="Compact (12x10 ft)">Compact (12x10 ft - Solo / Acoustic)</option>
                <option value="Medium (16x12 ft)">Medium (16x12 ft - 4 Piece Band)</option>
                <option value="Large (32x24 ft or larger)">Large (32x24 ft - Big Ensemble / Dance Troupe)</option>
              </select>
            </div>

            <div>
              <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Vocal & Instrument Mics Needed</span>
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

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '18px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
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
                style={{ width: '16px', height: '16px', accentColor: 'var(--performer-color)' }}
              />
              PA Sound System Provided by Organizer
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
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
                style={{ width: '16px', height: '16px', accentColor: 'var(--performer-color)' }}
              />
              In-Ear Monitor (IEM) Transmitters Required
            </label>
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Instruments & Gear Brought</span>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Roland Keyboard, Gibson Les Paul, Pioneer DJ Console, Acoustic Guitar"
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

          {/* Hospitality Rider */}
          <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>
              <Coffee size={16} color="var(--performer-color)" style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              Hospitality & Comfort Rider
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.82rem' }}>
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
                  style={{ width: '16px', height: '16px', accentColor: 'var(--performer-color)' }}
                />
                Private AC Green Room
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.82rem' }}>
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
                  style={{ width: '16px', height: '16px', accentColor: 'var(--performer-color)' }}
                />
                Hot Meals & Beverages
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.82rem' }}>
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
                  style={{ width: '16px', height: '16px', accentColor: 'var(--performer-color)' }}
                />
                Hotel Stay (Outstation)
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.82rem' }}>
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
                  style={{ width: '16px', height: '16px', accentColor: 'var(--performer-color)' }}
                />
                Travel / Flight Support
              </label>
            </div>
          </div>

          {/* Sample Links / Portfolio */}
          <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
            <label className="form-label" style={{ marginBottom: '8px' }}>
              <Link2 size={16} color="var(--performer-color)" />
              Sample Video / Audio Links
            </label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <input
                type="url"
                className="form-input"
                placeholder="https://youtube.com/... or https://soundcloud.com/..."
                value={newSampleLink}
                onChange={(e) => setNewSampleLink(e.target.value)}
              />
              <button
                type="button"
                onClick={addSampleLink}
                className="btn btn-secondary"
                style={{ padding: '0 16px', whiteSpace: 'nowrap' }}
              >
                <Plus size={16} /> Add Link
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
                      background: 'rgba(13, 18, 30, 0.6)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    <span style={{ fontSize: '0.82rem', color: '#818cf8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '85%' }}>
                      {link}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeSampleLink(idx)}
                      style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Fee Budget */}
          <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
            <label className="form-label" style={{ marginBottom: '12px' }}>
              <DollarSign size={16} color="var(--performer-color)" />
              Performer Honorarium / Budget Range (INR ₹)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>Minimum Fee (₹)</span>
                <input
                  type="number"
                  className="form-input"
                  placeholder="e.g. 100000"
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
                  placeholder="e.g. 250000"
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
        <div className="glass-panel" style={{ padding: '28px', marginBottom: '24px', borderLeft: '4px solid var(--crew-color)' }}>
          {/* Equipment Provisioning */}
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
            <Wrench size={18} color="var(--crew-color)" style={{ verticalAlign: 'middle', marginRight: '6px' }} />
            Equipment & Tools Policy
          </h3>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
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
                style={{ width: '16px', height: '16px', accentColor: 'var(--crew-color)' }}
              />
              Crew must bring their own professional toolkits / test gear (BYOE)
            </label>
          </div>

          <div className="form-group" style={{ marginBottom: '18px' }}>
            <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>
              Tools & Accessories Required
            </span>
            <div className="chip-grid">
              {crewToolChips.map((tool) => {
                const isSelected = formData.crewDetails.equipment.toolsRequired?.includes(tool);
                return (
                  <div
                    key={tool}
                    onClick={() => toggleCrewTool(tool)}
                    className={`chip ${isSelected ? 'active' : ''}`}
                    style={isSelected ? { background: 'rgba(245, 158, 11, 0.15)', borderColor: 'var(--crew-color)' } : {}}
                  >
                    {tool}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dress Code & Uniform */}
          <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', marginBottom: '20px' }}>
            <label className="form-label" style={{ marginBottom: '12px' }}>
              <Shirt size={16} color="var(--crew-color)" />
              Dress Code & Uniform Standard
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
              {[
                { value: 'all_black', label: 'All Black (Standard Stage)' },
                { value: 'formal', label: 'Formal / Suit & Tie' },
                { value: 'smart_casual', label: 'Smart Casual / Polo' },
                { value: 'branded_tshirt', label: 'Event Branded T-Shirt' },
                { value: 'safety_gear', label: 'Safety Hi-Vis & Helmet' }
              ].map((dc) => {
                const isSelected = formData.crewDetails.dressCode === dc.value;
                return (
                  <div
                    key={dc.value}
                    onClick={() =>
                      updateFormData({
                        crewDetails: {
                          ...formData.crewDetails,
                          dressCode: dc.value as any
                        }
                      })
                    }
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      background: isSelected ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-dark-card)',
                      border: isSelected ? '1px solid var(--crew-color)' : '1px solid var(--border-subtle)',
                      textAlign: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      color: isSelected ? '#ffffff' : 'var(--text-muted)'
                    }}
                  >
                    {dc.label}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Safety Certifications */}
          <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', marginBottom: '20px' }}>
            <label className="form-label" style={{ marginBottom: '10px' }}>
              <ShieldCheck size={16} color="var(--crew-color)" />
              Mandatory Safety Certifications
            </label>
            <div className="chip-grid">
              {crewCertChips.map((cert) => {
                const isSelected = formData.crewDetails.certifications?.includes(cert);
                return (
                  <div
                    key={cert}
                    onClick={() => toggleCrewCert(cert)}
                    className={`chip ${isSelected ? 'active' : ''}`}
                    style={isSelected ? { background: 'rgba(245, 158, 11, 0.15)', borderColor: 'var(--crew-color)' } : {}}
                  >
                    {cert}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Crew Budget Calculation */}
          <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
            <label className="form-label" style={{ marginBottom: '12px' }}>
              <DollarSign size={16} color="var(--crew-color)" />
              Crew Compensation Model
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
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
                <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>
                  Rate per Crew Member (₹)
                </span>
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
                <span className="form-hint" style={{ marginBottom: '4px', display: 'block' }}>
                  Calculated Total Budget
                </span>
                <div style={{
                  padding: '12px 16px',
                  background: 'rgba(245, 158, 11, 0.1)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  fontWeight: 700,
                  color: 'var(--crew-color)',
                  fontSize: '1rem'
                }}>
                  ₹ {estimatedTotalCrewBudget.toLocaleString('en-IN')}{' '}
                  <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-dim)' }}>
                    ({totalCrewCount} crew members)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* UNIVERSAL ORGANIZER INFORMATION CARD                                      */}
      {/* ========================================================================= */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
          Organizer & Point of Contact
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
          This information will be associated with the requirement so applicants and agency partners can reach out.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">
              <User size={15} color="#818cf8" />
              Contact Name <span className="required">*</span>
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
              <Mail size={15} color="#818cf8" />
              Email Address <span className="required">*</span>
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
              <Phone size={15} color="#818cf8" />
              Phone / WhatsApp
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
              <Briefcase size={15} color="#818cf8" />
              Organization / Client Name
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
