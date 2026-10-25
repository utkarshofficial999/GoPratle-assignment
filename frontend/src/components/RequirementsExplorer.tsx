'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Sparkles,
  Music,
  Users,
  Eye,
  Trash2,
  X,
  Code,
  CheckCircle2,
  RefreshCw,
  Plus,
  AlertCircle
} from 'lucide-react';
import { requirementApi } from '../services/api';
import { RequirementFormData, EventCategory } from '../types/requirement';

interface RequirementsExplorerProps {
  onPostNew: () => void;
}

export const RequirementsExplorer: React.FC<RequirementsExplorerProps> = ({ onPostNew }) => {
  const [requirements, setRequirements] = useState<RequirementFormData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<EventCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReq, setSelectedReq] = useState<RequirementFormData | null>(null);
  const [showRawJson, setShowRawJson] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const loadRequirements = async () => {
    setIsLoading(true);
    try {
      const res = await requirementApi.getAll(filterCategory, searchQuery);
      setRequirements(res.data || []);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRequirements();
  }, [filterCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadRequirements();
  };

  const handleSeedData = async () => {
    try {
      await requirementApi.seed();
      setFeedbackMsg('Sample requirements seeded successfully!');
      setTimeout(() => setFeedbackMsg(null), 3000);
      loadRequirements();
    } catch (err: any) {
      setFeedbackMsg(`Seed failed: ${err.message}`);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this requirement?')) {
      setIsDeleting(id);
      try {
        await requirementApi.delete(id);
        setRequirements((prev) => prev.filter((r) => r._id !== id && r.requirementCode !== id));
        if (selectedReq && (selectedReq._id === id || selectedReq.requirementCode === id)) {
          setSelectedReq(null);
        }
      } catch (err: any) {
        alert(err.message);
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const plannerCount = requirements.filter((r) => r.category === 'planner').length;
  const performerCount = requirements.filter((r) => r.category === 'performer').length;
  const crewCount = requirements.filter((r) => r.category === 'crew').length;

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '60px' }}>
      {/* Explorer Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
            Requirement Directory & Explorer
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Live database view of all requirements saved in MongoDB, categorized by Planner, Performer, and Crew.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSeedData}
            className="btn btn-secondary"
            style={{ fontSize: '0.82rem', padding: '8px 14px' }}
            title="Seed 3 sample requirements (Planner, Performer, Crew)"
          >
            <RefreshCw size={14} /> Seed Sample Data
          </button>

          <button
            onClick={onPostNew}
            className="btn btn-primary"
            style={{ fontSize: '0.82rem', padding: '8px 16px' }}
          >
            <Plus size={16} /> Post New Requirement
          </button>
        </div>
      </div>

      {feedbackMsg && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          color: '#6ee7b7',
          padding: '10px 16px',
          borderRadius: '8px',
          marginBottom: '20px',
          fontSize: '0.85rem'
        }}>
          {feedbackMsg}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div
        className="glass-panel"
        style={{
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px'
        }}
      >
        {/* Category Filter Tabs */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { id: 'all', label: 'All Requirements', count: requirements.length },
            { id: 'planner', label: 'Planners', count: plannerCount },
            { id: 'performer', label: 'Performers', count: performerCount },
            { id: 'crew', label: 'Crew', count: crewCount }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id as any)}
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                border: 'none',
                background: filterCategory === tab.id ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                color: filterCategory === tab.id ? '#ffffff' : 'var(--text-muted)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{tab.label}</span>
              <span style={{
                fontSize: '0.7rem',
                background: filterCategory === tab.id ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.3)',
                padding: '1px 6px',
                borderRadius: '999px'
              }}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search by title, city or code..."
              className="form-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '34px', width: '260px', padding: '8px 12px 8px 34px', fontSize: '0.84rem' }}
            />
            <Search size={15} color="var(--text-dim)" style={{ position: 'absolute', left: '11px', top: '11px' }} />
          </div>
          <button type="submit" className="btn btn-secondary" style={{ padding: '8px 14px', fontSize: '0.82rem' }}>
            Search
          </button>
        </form>
      </div>

      {/* Requirement Cards Grid */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
          <RefreshCw size={28} className="animate-spin" style={{ margin: '0 auto 12px auto' }} />
          <p>Querying requirements from database...</p>
        </div>
      ) : requirements.length === 0 ? (
        <div
          className="glass-panel"
          style={{ padding: '50px 20px', textAlign: 'center', border: '1px dashed var(--border-subtle)' }}
        >
          <AlertCircle size={40} color="var(--text-dim)" style={{ margin: '0 auto 14px auto' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
            No Requirements Found
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: '420px', margin: '0 auto 20px auto' }}>
            There are no requirements matching the current category filter. Click below to seed realistic demo data or post a new requirement!
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <button onClick={handleSeedData} className="btn btn-secondary">
              Seed Sample Requirements
            </button>
            <button onClick={onPostNew} className="btn btn-primary">
              Post First Requirement
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {requirements.map((req) => {
            const { category } = req;
            return (
              <div
                key={req._id || req.requirementCode}
                onClick={() => setSelectedReq(req)}
                className="glass-panel"
                style={{
                  padding: '22px',
                  borderRadius: 'var(--radius-lg)',
                  borderLeft: `4px solid var(--${category}-color)`,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = `0 10px 25px rgba(0,0,0,0.4), 0 0 20px var(--${category}-glow)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
              >
                <div>
                  {/* Top Bar: Code & Category Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#818cf8',
                      letterSpacing: '0.04em'
                    }}>
                      {req.requirementCode || 'GP-REQ-DRAFT'}
                    </span>
                    <span className={`badge badge-${category}`}>
                      {category.toUpperCase()}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px', lineHeight: 1.3 }}>
                    {req.title}
                  </h3>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '14px' }}>
                    {req.eventType}
                  </div>

                  {/* Date & Location Info */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} color="#818cf8" />
                      <span>
                        {req.startDate ? new Date(req.startDate).toLocaleDateString() : 'Date pending'}
                        {req.dateType === 'range' && req.endDate && ` - ${new Date(req.endDate).toLocaleDateString()}`}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={14} color="#818cf8" />
                      <span>
                        {req.location?.city || 'Flexible'}, {req.location?.state || ''}
                      </span>
                    </div>
                  </div>

                  {/* Category Highlights */}
                  <div style={{ background: 'rgba(10, 13, 20, 0.5)', padding: '10px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.78rem' }}>
                    {category === 'planner' && (
                      <div>
                        <strong style={{ color: 'var(--planner-color)' }}>Planner Scope: </strong>
                        <span>
                          {req.plannerDetails?.services?.slice(0, 2).join(', ') || 'Full Event Planning'}
                          {req.plannerDetails?.services?.length > 2 && ` +${req.plannerDetails.services.length - 2} more`}
                        </span>
                      </div>
                    )}
                    {category === 'performer' && (
                      <div>
                        <strong style={{ color: 'var(--performer-color)' }}>Act: </strong>
                        <span>
                          {req.performerDetails?.performerType} • {req.performerDetails?.performanceDuration}
                        </span>
                      </div>
                    )}
                    {category === 'crew' && (
                      <div>
                        <strong style={{ color: 'var(--crew-color)' }}>Crew Team: </strong>
                        <span>
                          {req.crewDetails?.roles?.reduce((acc, r) => acc + (r.count || 1), 0) || 0} crew members across {req.crewDetails?.roles?.length || 0} roles
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Bar */}
                <div style={{
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    By {req.organizer?.name || 'Organizer'}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={(e) => handleDelete(req._id || req.requirementCode || '', e)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-dim)',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                      title="Delete requirement"
                    >
                      <Trash2 size={14} />
                    </button>

                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ padding: '5px 10px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Eye size={12} /> Inspect
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Requirement Details Modal / Drawer */}
      {selectedReq && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(5, 7, 12, 0.85)',
            backdropFilter: 'blur(10px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setSelectedReq(null)}
        >
          <div
            className="glass-panel animate-fade-in"
            style={{
              maxWidth: '750px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '30px',
              border: `1px solid var(--${selectedReq.category}-color)`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span className={`badge badge-${selectedReq.category}`}>
                    {selectedReq.category.toUpperCase()}
                  </span>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#818cf8' }}>
                    {selectedReq.requirementCode}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>
                  {selectedReq.title}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {selectedReq.eventType} • Posted to MongoDB
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShowRawJson(!showRawJson)}
                  className="btn btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                >
                  <Code size={14} /> {showRawJson ? 'View Formatted' : 'View Raw MongoDB JSON'}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedReq(null)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {showRawJson ? (
              <div style={{ marginTop: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                    Direct Mongoose Document representation from database:
                  </span>
                </div>
                <pre className="code-block" style={{ maxHeight: '450px', overflowY: 'auto' }}>
                  {JSON.stringify(selectedReq, null, 2)}
                </pre>
              </div>
            ) : (
              <div>
                {/* Event Schedule & Location */}
                <div style={{ background: 'rgba(10, 13, 20, 0.6)', padding: '16px', borderRadius: '12px', marginBottom: '18px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '0.85rem' }}>
                    <div>
                      <span className="form-hint">Date / Schedule</span>
                      <p style={{ fontWeight: 600, color: '#ffffff' }}>
                        {selectedReq.startDate ? new Date(selectedReq.startDate).toLocaleDateString() : 'TBD'}
                        {selectedReq.dateType === 'range' && selectedReq.endDate && ` to ${new Date(selectedReq.endDate).toLocaleDateString()}`}
                      </p>
                    </div>

                    <div>
                      <span className="form-hint">City & State</span>
                      <p style={{ fontWeight: 600, color: '#ffffff' }}>
                        {selectedReq.location?.city}, {selectedReq.location?.state || 'India'}
                      </p>
                    </div>

                    <div>
                      <span className="form-hint">Venue</span>
                      <p style={{ fontWeight: 600, color: '#ffffff' }}>
                        {selectedReq.venue?.hasSpecificVenue ? selectedReq.venue.name : 'Flexible venue'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Category Specific Sections */}
                {selectedReq.category === 'planner' && selectedReq.plannerDetails && (
                  <div style={{ marginBottom: '18px' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--planner-color)', marginBottom: '10px' }}>
                      Event Planner Scope & Requirements
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                      {selectedReq.plannerDetails.services?.map((s) => (
                        <span key={s} className="badge badge-planner">{s}</span>
                      ))}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      <div><strong>Expected Guest Count: </strong> {selectedReq.plannerDetails.guestCount || 'Flexible'}</div>
                      <div><strong>Theme / Concept: </strong> {selectedReq.plannerDetails.themePreference || 'Not specified'}</div>
                      <div><strong>Budget Range: </strong> ₹ {selectedReq.plannerDetails.plannerBudget?.min?.toLocaleString()} - ₹ {selectedReq.plannerDetails.plannerBudget?.max?.toLocaleString()}</div>
                    </div>
                  </div>
                )}

                {selectedReq.category === 'performer' && selectedReq.performerDetails && (
                  <div style={{ marginBottom: '18px' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--performer-color)', marginBottom: '10px' }}>
                      Performer & Stage Rider Specifications
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                      {selectedReq.performerDetails.genres?.map((g) => (
                        <span key={g} className="badge badge-performer">{g}</span>
                      ))}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      <div><strong>Act Type: </strong> {selectedReq.performerDetails.performerType}</div>
                      <div><strong>Duration: </strong> {selectedReq.performerDetails.performanceDuration} ({selectedReq.performerDetails.numberOfSets} sets)</div>
                      <div><strong>Stage & Sound: </strong> {selectedReq.performerDetails.soundAndStage?.stageSizeNeeded}, {selectedReq.performerDetails.soundAndStage?.micCount} Mics required</div>
                      <div><strong>Honorarium Budget: </strong> ₹ {selectedReq.performerDetails.feeBudget?.min?.toLocaleString()} - ₹ {selectedReq.performerDetails.feeBudget?.max?.toLocaleString()}</div>
                    </div>
                  </div>
                )}

                {selectedReq.category === 'crew' && selectedReq.crewDetails && (
                  <div style={{ marginBottom: '18px' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--crew-color)', marginBottom: '10px' }}>
                      Production Crew Positions & Operational Logistics
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                      {selectedReq.crewDetails.roles?.map((r, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(10, 13, 20, 0.4)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.82rem' }}>
                          <span>{r.role} ({r.experienceLevel})</span>
                          <strong style={{ color: 'var(--crew-color)' }}>{r.count} member(s)</strong>
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      <div><strong>Shift: </strong> {selectedReq.crewDetails.shiftTimings?.shiftType} ({selectedReq.crewDetails.shiftTimings?.startTime} - {selectedReq.crewDetails.shiftTimings?.endTime})</div>
                      <div><strong>Dress Code: </strong> {selectedReq.crewDetails.dressCode}</div>
                      <div><strong>Total Estimated Budget: </strong> ₹ {selectedReq.crewDetails.crewBudget?.totalEstimatedBudget?.toLocaleString()}</div>
                    </div>
                  </div>
                )}

                {/* Organizer Info */}
                <div style={{ paddingTop: '14px', borderTop: '1px solid var(--border-subtle)', fontSize: '0.83rem', color: 'var(--text-muted)' }}>
                  <div><strong>Organizer: </strong> {selectedReq.organizer?.name} ({selectedReq.organizer?.organization || 'Individual'})</div>
                  <div><strong>Email: </strong> {selectedReq.organizer?.email} • <strong>Phone: </strong> {selectedReq.organizer?.phone || 'N/A'}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
