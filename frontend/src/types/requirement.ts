export type EventCategory = 'planner' | 'performer' | 'crew';

export type EventType =
  | 'Wedding'
  | 'Corporate Conference'
  | 'Live Concert'
  | 'Birthday Celebration'
  | 'College Fest / Cultural'
  | 'Exhibition / Trade Show'
  | 'Private Gathering / Party'
  | 'Festival / Gala'
  | 'Other';

export interface LocationInfo {
  city: string;
  state: string;
  address: string;
  pincode: string;
}

export interface VenueInfo {
  hasSpecificVenue: boolean;
  name: string;
  hallDetails: string;
  landmark: string;
}

export interface PlannerDetails {
  services: string[];
  guestCount: 'under_50' | '50_150' | '150_300' | '300_700' | '700_plus' | '';
  themePreference: string;
  decorStyle: string;
  cateringCoordination: boolean;
  setupDaysNeeded: number;
  specialRequirements: string;
  plannerBudget: {
    min: number;
    max: number;
    currency: string;
  };
}

export interface PerformerDetails {
  performerType: string;
  genres: string[];
  performanceDuration: string;
  numberOfSets: number;
  soundAndStage: {
    paSystemRequired: boolean;
    stageSizeNeeded: string;
    micCount: number;
    inEarMonitors: boolean;
    instrumentDetails: string;
  };
  hospitality: {
    greenRoomRequired: boolean;
    mealsBeverages: boolean;
    accommodationNeeded: boolean;
    travelReimbursement: boolean;
  };
  sampleLinks: string[];
  feeBudget: {
    min: number;
    max: number;
    rateType: 'fixed' | 'hourly';
    currency: string;
  };
}

export interface CrewRoleItem {
  role: string;
  count: number;
  experienceLevel: 'junior' | 'mid' | 'senior' | 'lead';
}

export interface CrewDetails {
  roles: CrewRoleItem[];
  shiftTimings: {
    shiftType: 'morning' | 'evening' | 'night' | 'full_day' | 'split';
    startTime: string;
    endTime: string;
    totalHours: number;
  };
  equipment: {
    provideOwnGear: boolean;
    gearSpecifications: string;
    toolsRequired: string[];
  };
  dressCode: 'all_black' | 'formal' | 'smart_casual' | 'branded_tshirt' | 'safety_gear';
  amenities: {
    mealsProvided: boolean;
    travelAllowance: boolean;
    overtimePay: boolean;
  };
  crewBudget: {
    rateType: 'hourly' | 'daily' | 'project';
    amountPerCrew: number;
    totalEstimatedBudget: number;
    currency: string;
  };
  certifications: string[];
}

export interface OrganizerInfo {
  name: string;
  email: string;
  phone: string;
  organization: string;
}

export interface RequirementFormData {
  _id?: string;
  requirementCode?: string;
  title: string;
  eventType: EventType;
  dateType: 'single' | 'range';
  startDate: string;
  endDate: string;
  location: LocationInfo;
  venue: VenueInfo;
  category: EventCategory;
  plannerDetails: PlannerDetails;
  performerDetails: PerformerDetails;
  crewDetails: CrewDetails;
  organizer: OrganizerInfo;
  status?: 'draft' | 'published' | 'in_review' | 'completed';
  createdAt?: string;
  updatedAt?: string;
}

export interface RequirementApiResponse {
  success: boolean;
  message?: string;
  data: RequirementFormData;
}

export interface RequirementListApiResponse {
  success: boolean;
  count: number;
  categoryFilter: string;
  dbStatus: {
    mode: string;
    connected: boolean;
    uri: string;
  };
  data: RequirementFormData[];
}

export interface RequirementStatsApiResponse {
  success: boolean;
  data: {
    total: number;
    planner: number;
    performer: number;
    crew: number;
  };
}
