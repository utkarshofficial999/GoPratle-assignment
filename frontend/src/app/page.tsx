'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { ProgressBar } from '../components/ProgressBar';
import { Step1EventBasics } from '../components/steps/Step1EventBasics';
import { Step2CategoryDetails } from '../components/steps/Step2CategoryDetails';
import { Step3LogisticsBudget } from '../components/steps/Step3LogisticsBudget';
import { Step4ReviewSubmit } from '../components/steps/Step4ReviewSubmit';
import { SuccessModal } from '../components/SuccessModal';
import { RequirementsExplorer } from '../components/RequirementsExplorer';
import { RequirementFormData, EventCategory } from '../types/requirement';
import { requirementApi, samplePresets } from '../services/api';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const initialFormData: RequirementFormData = {
  title: '',
  eventType: 'Corporate Conference',
  dateType: 'single',
  startDate: '',
  endDate: '',
  location: {
    city: '',
    state: '',
    address: '',
    pincode: ''
  },
  venue: {
    hasSpecificVenue: false,
    name: '',
    hallDetails: '',
    landmark: ''
  },
  category: 'planner',
  plannerDetails: {
    services: ['Full Event Planning & Curation', 'Decor & Theme Styling'],
    guestCount: '150_300',
    themePreference: '',
    decorStyle: '',
    cateringCoordination: false,
    setupDaysNeeded: 1,
    specialRequirements: '',
    plannerBudget: { min: 100000, max: 250000, currency: 'INR' }
  },
  performerDetails: {
    performerType: 'Live Band (4-6 piece)',
    genres: ['Bollywood', 'Commercial Pop'],
    performanceDuration: '90 mins',
    numberOfSets: 1,
    soundAndStage: {
      paSystemRequired: true,
      stageSizeNeeded: 'Medium (16x12 ft)',
      micCount: 3,
      inEarMonitors: false,
      instrumentDetails: ''
    },
    hospitality: {
      greenRoomRequired: true,
      mealsBeverages: true,
      accommodationNeeded: false,
      travelReimbursement: false
    },
    sampleLinks: [],
    feeBudget: { min: 80000, max: 150000, rateType: 'fixed', currency: 'INR' }
  },
  crewDetails: {
    roles: [
      { role: 'FOH Sound Engineer', count: 1, experienceLevel: 'senior' },
      { role: 'Lighting Console Operator', count: 1, experienceLevel: 'mid' },
      { role: 'Stage Hands & Cable Runners', count: 3, experienceLevel: 'junior' }
    ],
    shiftTimings: {
      shiftType: 'full_day',
      startTime: '09:00',
      endTime: '21:00',
      totalHours: 12
    },
    equipment: {
      provideOwnGear: false,
      gearSpecifications: '',
      toolsRequired: ['Walkie-talkie Radio Headsets', 'Heavy Duty Gaffer Tape']
    },
    dressCode: 'all_black',
    amenities: {
      mealsProvided: true,
      travelAllowance: true,
      overtimePay: true
    },
    crewBudget: {
      rateType: 'daily',
      amountPerCrew: 3000,
      totalEstimatedBudget: 15000,
      currency: 'INR'
    },
    certifications: []
  },
  organizer: {
    name: '',
    email: '',
    phone: '',
    organization: ''
  }
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<'wizard' | 'explorer'>('wizard');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [maxReachedStep, setMaxReachedStep] = useState<number>(1);
  const [formData, setFormData] = useState<RequirementFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [createdRequirement, setCreatedRequirement] = useState<RequirementFormData | null>(null);
  const [requirementCount, setRequirementCount] = useState<number>(0);

  // Sync total count
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const stats = await requirementApi.getStats();
        if (stats.data) {
          setRequirementCount(stats.data.total);
        }
      } catch (err) {
        // ignore on boot
      }
    };
    fetchCount();
  }, [createdRequirement, activeTab]);

  const updateFormData = (fields: Partial<RequirementFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
    // Clear relevant errors
    if (fields.title && errors.title) setErrors((e) => ({ ...e, title: '' }));
    if (fields.startDate && errors.startDate) setErrors((e) => ({ ...e, startDate: '' }));
    if (fields.location?.city && errors.city) setErrors((e) => ({ ...e, city: '' }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.title || !formData.title.trim()) {
        newErrors.title = 'Please enter an event title';
      }
      if (!formData.startDate) {
        newErrors.startDate = 'Start date is required';
      }
      if (formData.dateType === 'range' && !formData.endDate) {
        newErrors.endDate = 'End date is required for a date range';
      }
      if (!formData.location.city || !formData.location.city.trim()) {
        newErrors.city = 'Please enter the event city';
      }
      if (!formData.category) {
        newErrors.category = 'Please select a category';
      }
    }

    if (step === 2) {
      if (formData.category === 'crew' && formData.crewDetails.roles.length === 0) {
        newErrors.crewRoles = 'Please add at least one crew role';
      }
    }

    if (step === 3) {
      if (!formData.organizer.name || !formData.organizer.name.trim()) {
        newErrors.organizerName = 'Organizer name is required';
      }
      if (!formData.organizer.email || !formData.organizer.email.trim()) {
        newErrors.organizerEmail = 'Organizer email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.organizer.email)) {
        newErrors.organizerEmail = 'Please provide a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setMaxReachedStep((prev) => Math.max(prev, nextStep));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepClick = (step: number) => {
    if (step <= maxReachedStep) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleApplyPreset = (presetData: RequirementFormData) => {
    setFormData(presetData);
    setCurrentStep(1);
    setMaxReachedStep(4);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      setSubmissionError('Please resolve all validation errors in previous steps before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const response = await requirementApi.create(formData);
      if (response.success && response.data) {
        setCreatedRequirement(response.data);
      } else {
        throw new Error(response.message || 'Failed to submit requirement');
      }
    } catch (err: any) {
      setSubmissionError(err.message || 'An unexpected error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePostAnother = () => {
    setCreatedRequirement(null);
    setFormData(initialFormData);
    setCurrentStep(1);
    setMaxReachedStep(1);
    setErrors({});
    setActiveTab('wizard');
  };

  const handleViewInExplorer = () => {
    setCreatedRequirement(null);
    setActiveTab('explorer');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Global Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onApplyPreset={handleApplyPreset}
        requirementCount={requirementCount}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '28px 0 48px 0' }}>
        <div className="container">
          {activeTab === 'explorer' ? (
            <RequirementsExplorer onPostNew={() => setActiveTab('wizard')} />
          ) : (
            <div>
              {/* Wizard Multi-Step Progress Indicator */}
              <ProgressBar
                currentStep={currentStep}
                totalSteps={4}
                category={formData.category}
                onStepClick={handleStepClick}
                maxReachedStep={maxReachedStep}
              />

              {/* Step 1: Event Basics & Category Selector */}
              {currentStep === 1 && (
                <Step1EventBasics
                  formData={formData}
                  updateFormData={updateFormData}
                  errors={errors}
                />
              )}

              {/* Step 2: Category Details */}
              {currentStep === 2 && (
                <Step2CategoryDetails
                  formData={formData}
                  updateFormData={updateFormData}
                  errors={errors}
                />
              )}

              {/* Step 3: Logistics, Riders & Budget */}
              {currentStep === 3 && (
                <Step3LogisticsBudget
                  formData={formData}
                  updateFormData={updateFormData}
                  errors={errors}
                />
              )}

              {/* Step 4: Review & Final Submission */}
              {currentStep === 4 && (
                <Step4ReviewSubmit
                  formData={formData}
                  goToStep={setCurrentStep}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  submissionError={submissionError}
                />
              )}

              {/* Bottom Step Navigation Bar (for Steps 1, 2, 3) */}
              {currentStep < 4 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '20px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-subtle)'
                }}>
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="btn btn-secondary"
                    >
                      <ArrowLeft size={14} />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn btn-primary"
                    style={{ padding: '9px 20px' }}
                  >
                    <span>
                      Continue to Step {currentStep + 1}:{' '}
                      {currentStep === 1 &&
                        (formData.category === 'planner'
                          ? 'Planning Scope'
                          : formData.category === 'performer'
                          ? 'Performance Details'
                          : 'Crew Roles')}
                      {currentStep === 2 && 'Logistics & Budget'}
                      {currentStep === 3 && 'Final Review'}
                    </span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Success Confirmation Modal */}
      {createdRequirement && (
        <SuccessModal
          requirement={createdRequirement}
          onPostAnother={handlePostAnother}
          onViewInExplorer={handleViewInExplorer}
        />
      )}

      {/* Clean Minimalist Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        backgroundColor: '#ffffff',
        padding: '16px 0',
        fontSize: '0.813rem',
        color: 'var(--text-muted)'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            GoPratle Talent Flow • Event Requirement Engine
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span>Next.js 15 & Node.js + Express + MongoDB</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              API Ready
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
