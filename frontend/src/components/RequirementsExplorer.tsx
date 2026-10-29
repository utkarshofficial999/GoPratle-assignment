'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Calendar,
  MapPin,
  Eye,
  Trash2,
  X,
  Code,
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
      setFeedbackMsg('Sample requirements seeded successfully.');
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
    <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
      {/* Explorer Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>
            Requirement Directory
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Live database view of all requirements saved in MongoDB, categorized by Planner, Performer, and Crew.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleSeedData}
            className="btn btn-secondary"
            style={{ fontSize: '0.813rem', padding: '6px 12px' }}
            title="Seed 3 sample requirements"
          >
            <RefreshCw size={13} />
            <span>Seed Sample Data</span>
          </button>

          <button
            onClick={onPostNew}
            className="btn btn-primary"
            style={{ fontSize: '0.813rem', padding: '6px 14px' }}
          >
            <Plus size={14} />
            <span>Post New</span>
          </button>
        </div>
      </div>

      {feedbackMsg && (
        <div
          style={{
            backgroundColor: 'var(--planner-subtle)',
            border: '1px solid var(--planner-border)',
            color: 'var(--planner-color)',
            padding: '8px 14px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '16px',
            fontSize: '0.813rem'
          }}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div
        className="card-panel"
        style={{
          padding: '12px 16px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        {/* Category Filter Tabs */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {[
            { id: 'all', label: 'All', count: requirements.length },
            { id: 'planner', label: 'Planners', count: plannerCount },
            { id: 'performer', label: 'Performers', count: performerCount },
            { id: 'crew', label: 'Crew', count: crewCount }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id as any)}
              style={{
                padding: '5px 10px',
                borderRadius: 'var(--radius-xs)',
                border: 'none',
                backgroundColor: filterCategory === tab.id ? 'var(--text-main)' : 'transparent',
                color: filterCategory === tab.id ? '#ffffff' : 'var(--text-muted)',
                fontSize: '0.813rem',
                fontWeight: filterCategory === tab.id ? 600 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all var(--transition-fast)'
              }}
            >
              <span>{tab.label}</span>
              <span
                style={{
                  fontSize: '0.688rem',
                  backgroundColor: filterCategory === tab.id ? 'rgba(255, 255, 255, 0.2)' : 'var(--bg-subtle)',
                  color: filterCategory === tab.id ? '#ffffff' : 'var(--text-muted)',
                  padding: '1px 5px',
                  borderRadius: '999px'
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '6px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search by title, city, or code..."
              className="form-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '30px', width: '240px', padding: '6px 10px 6px 30px', fontSize: '0.813rem' }}
            />
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '9px', color: 'var(--text-muted)' }} />
          </div>
          <button type="submit" className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.813rem' }}>
            Search
          </button>
        </form>
      </div>

      {/* Requirement Cards Grid */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-muted)' }}>
          <RefreshCw size={24} className="animate-spin" style={{ margin: '0 auto 8px auto' }} />
          <p style={{ fontSize: '0.875rem' }}>Loading requirements from database...</p>
        </div>
      ) : requirements.length === 0 ? (
        <div
          className="card-panel"
          style={{ padding: '40px 20px', textAlign: 'center', border: '1px dashed var(--border-default)' }}
        >
          <AlertCircle size={32} style={{ color: 'var(--text-dim)', margin: '0 auto 10px auto' }} />
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
            No Requirements Found
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.813rem', maxWidth: '380px', margin: '0 auto 16px auto' }}>
            There are no requirements matching the current filter. Seed realistic demo data or post a new requirement.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <button onClick={handleSeedData} className="btn btn-secondary">
              Seed Sample Requirements
            </button>
            <button onClick={onPostNew} className="btn btn-primary">
              Post First Requirement
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '14px' }}>
          {requirements.map((req) => {
            const { category } = req;
            return (
              <div
                key={req._id || req.requirementCode}
                onClick={() => setSelectedReq(req)}
                className="card-panel"
                style={{
                  padding: '18px',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: `3px solid var(--${category}-color)`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#94a3b8';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <div>
                  {/* Top Bar: Code & Category Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--text-muted)',
                        letterSpacing: '0.02em'
                      }}
                    >
                      {req.requirementCode || 'GP-REQ-DRAFT'}
                    </span>
                    <span className={`badge badge-${category}`}>
                      {category.toUpperCase()}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px', lineHeight: 1.35 }}>
                    {req.title}
                  </h2>

                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    {req.eventType}
                  </div>

                  {/* Date & Location Info */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.813rem', color: 'var(--text-body)', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={13} style={{ color: 'var(--text-muted)' }} />
                      <span>
                        {req.startDate ? new Date(req.startDate).toLocaleDateString() : 'Date pending'}
                        {req.dateType === 'range' && req.endDate && ` - ${new Date(req.endDate).toLocaleDateString()}`}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={13} style={{ color: 'var(--text-muted)' }} />
                      <span>
                        {req.location?.city || 'Flexible'}, {req.location?.state || ''}
                      </span>
                    </div>
                  </div>

                  {/* Category Highlights */}
                  <div style={{ backgroundColor: 'var(--bg-subtle)', padding: '8px 10px', borderRadius: 'var(--radius-xs)', marginBottom: '14px', fontSize: '0.75rem' }}>
                    {category === 'planner' && (
                      <div>
                        <strong style={{ color: 'var(--text-main)' }}>Scope: </strong>
                        <span style={{ color: 'var(--text-body)' }}>
                          {req.plannerDetails?.services?.slice(0, 2).join(', ') || 'Full Event Planning'}
                          {(req.plannerDetails?.services?.length || 0) > 2 && ` +${(req.plannerDetails?.services?.length || 0) - 2} more`}
                        </span>
                      </div>
                    )}
                    {category === 'performer' && (
                      <div>
                        <strong style={{ color: 'var(--text-main)' }}>Act: </strong>
                        <span style={{ color: 'var(--text-body)' }}>
                          {req.performerDetails?.performerType} • {req.performerDetails?.performanceDuration}
                        </span>
                      </div>
                    )}
                    {category === 'crew' && (
                      <div>
                        <strong style={{ color: 'var(--text-main)' }}>Team: </strong>
                        <span style={{ color: 'var(--text-body)' }}>
                          {req.crewDetails?.roles?.reduce((acc, r) => acc + (r.count || 1), 0) || 0} crew members across {req.crewDetails?.roles?.length || 0} roles
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Bar */}
                <div
                  style={{
                    paddingTop: '10px',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {req.organizer?.name || 'Organizer'}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={(e) => handleDelete(req._id || req.requirementCode || '', e)}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                      title="Delete requirement"
                    >
                      <Trash2 size={13} />
                    </button>

                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ padding: '4px 8px', fontSize: '0.75rem', height: '26px' }}
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

      {/* Requirement Details Modal */}
      {selectedReq && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(4px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setSelectedReq(null)}
        >
          <div
            className="animate-fade-in"
            style={{
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-modal)',
              padding: '24px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <span className={`badge badge-${selectedReq.category}`}>
                    {selectedReq.category.toUpperCase()}
                  </span>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {selectedReq.requirementCode}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>
                  {selectedReq.title}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.813rem' }}>
                  {selectedReq.eventType} • Stored in MongoDB
                </p>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => setShowRawJson(!showRawJson)}
                  className="btn btn-secondary"
                  style={{ padding: '5px 10px', fontSize: '0.75rem', height: '28px' }}
                >
                  <Code size={13} /> {showRawJson ? 'Formatted View' : 'Raw JSON'}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedReq(null)}
                  style={{ backgroundColor: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {showRawJson ? (
              <div style={{ marginTop: '12px' }}>
                <pre className="code-block" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {JSON.stringify(selectedReq, null, 2)}
                </pre>
              </div>
            ) : (
              <div>
                {/* Event Schedule & Location */}
                <div style={{ backgroundColor: 'var(--bg-subtle)', padding: '14px', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', fontSize: '0.813rem' }}>
                    <div>
                      <span className="form-hint">Schedule</span>
                      <p style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                        {selectedReq.startDate ? new Date(selectedReq.startDate).toLocaleDateString() : 'TBD'}
                        {selectedReq.dateType === 'range' && selectedReq.endDate && ` to ${new Date(selectedReq.endDate).toLocaleDateString()}`}
                      </p>
                    </div>

                    <div>
                      <span className="form-hint">Location</span>
                      <p style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                        {selectedReq.location?.city}, {selectedReq.location?.state || 'India'}
                      </p>
                    </div>

                    <div>
                      <span className="form-hint">Venue</span>
                      <p style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                        {selectedReq.venue?.hasSpecificVenue ? selectedReq.venue.name : 'Flexible / TBD'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Category Specific Sections */}
                {selectedReq.category === 'planner' && selectedReq.plannerDetails && (
                  <div style={{ marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
                      Event Planner Scope
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
                      {selectedReq.plannerDetails.services?.map((s) => (
                        <span key={s} className="badge badge-planner">{s}</span>
                      ))}
                    </div>
                    <div style={{ fontSize: '0.813rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                      <div><strong>Guest Count Tier: </strong> {selectedReq.plannerDetails.guestCount || 'Flexible'}</div>
                      <div><strong>Theme Concept: </strong> {selectedReq.plannerDetails.themePreference || 'Open'}</div>
                      <div><strong>Budget: </strong> ₹ {selectedReq.plannerDetails.plannerBudget?.min?.toLocaleString()} - ₹ {selectedReq.plannerDetails.plannerBudget?.max?.toLocaleString()}</div>
                    </div>
                  </div>
                )}

                {selectedReq.category === 'performer' && selectedReq.performerDetails && (
                  <div style={{ marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
                      Performer Specifications
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
                      {selectedReq.performerDetails.genres?.map((g) => (
                        <span key={g} className="badge badge-performer">{g}</span>
                      ))}
                    </div>
                    <div style={{ fontSize: '0.813rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                      <div><strong>Act: </strong> {selectedReq.performerDetails.performerType}</div>
                      <div><strong>Duration: </strong> {selectedReq.performerDetails.performanceDuration} ({selectedReq.performerDetails.numberOfSets} sets)</div>
                      <div><strong>Stage & Sound: </strong> {selectedReq.performerDetails.soundAndStage?.stageSizeNeeded}, {selectedReq.performerDetails.soundAndStage?.micCount} Mics</div>
                      <div><strong>Honorarium Budget: </strong> ₹ {selectedReq.performerDetails.feeBudget?.min?.toLocaleString()} - ₹ {selectedReq.performerDetails.feeBudget?.max?.toLocaleString()}</div>
                    </div>
                  </div>
                )}

                {selectedReq.category === 'crew' && selectedReq.crewDetails && (
                  <div style={{ marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
                      Crew Positions
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '10px' }}>
                      {selectedReq.crewDetails.roles?.map((r, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'var(--bg-subtle)', padding: '5px 10px', borderRadius: 'var(--radius-xs)', fontSize: '0.813rem' }}>
                          <span>{r.role} ({r.experienceLevel})</span>
                          <strong style={{ color: 'var(--text-main)' }}>{r.count} member(s)</strong>
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize: '0.813rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                      <div><strong>Shift: </strong> {selectedReq.crewDetails.shiftTimings?.shiftType} ({selectedReq.crewDetails.shiftTimings?.startTime} - {selectedReq.crewDetails.shiftTimings?.endTime})</div>
                      <div><strong>Dress Code: </strong> {selectedReq.crewDetails.dressCode}</div>
                      <div><strong>Estimated Budget: </strong> ₹ {selectedReq.crewDetails.crewBudget?.totalEstimatedBudget?.toLocaleString()}</div>
                    </div>
                  </div>
                )}

                {/* Organizer Info */}
                <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', fontSize: '0.813rem', color: 'var(--text-muted)' }}>
                  <div><strong>Contact: </strong> {selectedReq.organizer?.name} ({selectedReq.organizer?.organization || 'Individual'})</div>
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
