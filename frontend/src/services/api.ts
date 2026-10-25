import {
  RequirementFormData,
  RequirementApiResponse,
  RequirementListApiResponse,
  RequirementStatsApiResponse,
  EventCategory
} from '../types/requirement';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const requirementApi = {
  async getHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`, { cache: 'no-store' });
      return await res.json();
    } catch {
      return { status: 'OFFLINE', error: 'Backend unreachable' };
    }
  },

  async getAll(category?: EventCategory | 'all', search?: string): Promise<RequirementListApiResponse> {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search && search.trim()) params.append('search', search.trim());

    const url = `${API_BASE_URL}/requirements${params.toString() ? `?${params.toString()}` : ''}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to fetch requirements');
    }
    return res.json();
  },

  async getById(id: string): Promise<RequirementApiResponse> {
    const res = await fetch(`${API_BASE_URL}/requirements/${id}`, { cache: 'no-store' });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Requirement not found');
    }
    return res.json();
  },

  async create(payload: RequirementFormData): Promise<RequirementApiResponse> {
    const res = await fetch(`${API_BASE_URL}/requirements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) {
      const errMsg = data.errors ? data.errors.join(', ') : data.message || 'Failed to create requirement';
      throw new Error(errMsg);
    }
    return data;
  },

  async delete(id: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE_URL}/requirements/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  async getStats(): Promise<RequirementStatsApiResponse> {
    const res = await fetch(`${API_BASE_URL}/requirements/stats`, { cache: 'no-store' });
    return res.json();
  },

  async seed(): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE_URL}/requirements/seed`, {
      method: 'POST'
    });
    return res.json();
  }
};

// Ready-to-use Sample Presets for instantaneous 1-click evaluation
export const samplePresets: Record<EventCategory, RequirementFormData> = {
  planner: {
    title: 'NexGen Fintech Summit 2026',
    eventType: 'Corporate Conference',
    dateType: 'range',
    startDate: '2026-11-20',
    endDate: '2026-11-22',
    location: {
      city: 'Mumbai',
      state: 'Maharashtra',
      address: 'Jio World Convention Centre, G Block BKC',
      pincode: '400051'
    },
    venue: {
      hasSpecificVenue: true,
      name: 'Lotus Ballroom & Pavilion 3',
      hallDetails: 'Tiered seating for 850 attendees, VIP networking breakout rooms',
      landmark: 'Next to Maker Maxity'
    },
    category: 'planner',
    plannerDetails: {
      services: [
        'Full Event Planning',
        'Vendor Sourcing & Management',
        'Decor & Theme Styling',
        'Budget Tracking & Auditing',
        'Logistics & Security Coordination'
      ],
      guestCount: '700_plus',
      themePreference: 'Modern Tech Minimalist with Cyberpunk Blue Lighting',
      decorStyle: 'Matte black stages with 8K curved LED walls and interactive badge scanners',
      cateringCoordination: true,
      setupDaysNeeded: 2,
      specialRequirements: 'Dedicated speaker lounge with green screen recording and high-speed Wi-Fi 7.',
      plannerBudget: {
        min: 350000,
        max: 650000,
        currency: 'INR'
      }
    },
    performerDetails: {
      performerType: 'Live Band',
      genres: ['Bollywood'],
      performanceDuration: '90 mins',
      numberOfSets: 1,
      soundAndStage: {
        paSystemRequired: true,
        stageSizeNeeded: 'Medium (16x12 ft)',
        micCount: 2,
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
      feeBudget: { min: 0, max: 0, rateType: 'fixed', currency: 'INR' }
    },
    crewDetails: {
      roles: [],
      shiftTimings: { shiftType: 'full_day', startTime: '09:00', endTime: '21:00', totalHours: 12 },
      equipment: { provideOwnGear: false, gearSpecifications: '', toolsRequired: [] },
      dressCode: 'all_black',
      amenities: { mealsProvided: true, travelAllowance: false, overtimePay: true },
      crewBudget: { rateType: 'daily', amountPerCrew: 0, totalEstimatedBudget: 0, currency: 'INR' },
      certifications: []
    },
    organizer: {
      name: 'Aditi Deshmukh',
      email: 'aditi.d@nexgenfintech.io',
      phone: '+91 98200 11223',
      organization: 'NexGen Media & Conferences'
    }
  },
  performer: {
    title: 'Echoes of Bollywood Neon Nights',
    eventType: 'Live Concert',
    dateType: 'single',
    startDate: '2026-12-18',
    endDate: '',
    location: {
      city: 'Delhi NCR',
      state: 'Delhi',
      address: 'Major Dhyan Chand National Stadium Grounds',
      pincode: '110001'
    },
    venue: {
      hasSpecificVenue: true,
      name: 'Open Air Amphitheatre',
      hallDetails: 'Standing arena for 3,500 music enthusiasts',
      landmark: 'Near India Gate Circle'
    },
    category: 'performer',
    plannerDetails: {
      services: [],
      guestCount: '150_300',
      themePreference: '',
      decorStyle: '',
      cateringCoordination: false,
      setupDaysNeeded: 1,
      specialRequirements: '',
      plannerBudget: { min: 0, max: 0, currency: 'INR' }
    },
    performerDetails: {
      performerType: 'Live Fusion Band (6-piece)',
      genres: ['Sufi Rock', 'Bollywood Acoustic', 'Indie Pop', 'Fusion'],
      performanceDuration: '2 hours',
      numberOfSets: 2,
      soundAndStage: {
        paSystemRequired: true,
        stageSizeNeeded: 'Large (32x24 ft or larger)',
        micCount: 6,
        inEarMonitors: true,
        instrumentDetails: 'Lead acoustic guitar, Bass, Drum kit (Pearl/Yamaha), Keyboards, Tabla & Percussions'
      },
      hospitality: {
        greenRoomRequired: true,
        mealsBeverages: true,
        accommodationNeeded: true,
        travelReimbursement: true
      },
      sampleLinks: [
        'https://youtube.com/watch?v=fusion-band-live',
        'https://instagram.com/reel/bollywood-sufi-set'
      ],
      feeBudget: {
        min: 200000,
        max: 350000,
        rateType: 'fixed',
        currency: 'INR'
      }
    },
    crewDetails: {
      roles: [],
      shiftTimings: { shiftType: 'full_day', startTime: '09:00', endTime: '21:00', totalHours: 12 },
      equipment: { provideOwnGear: false, gearSpecifications: '', toolsRequired: [] },
      dressCode: 'all_black',
      amenities: { mealsProvided: true, travelAllowance: false, overtimePay: true },
      crewBudget: { rateType: 'daily', amountPerCrew: 0, totalEstimatedBudget: 0, currency: 'INR' },
      certifications: []
    },
    organizer: {
      name: 'Vikram Sengupta',
      email: 'vikram@delhiconcerts.live',
      phone: '+91 98111 88776',
      organization: 'Delhi Live Music Guild'
    }
  },
  crew: {
    title: 'Vogue Couture Fashion Week 2026',
    eventType: 'Exhibition / Trade Show',
    dateType: 'range',
    startDate: '2026-11-28',
    endDate: '2026-11-30',
    location: {
      city: 'Bangalore',
      state: 'Karnataka',
      address: 'Palace Grounds, Bellary Road',
      pincode: '560006'
    },
    venue: {
      hasSpecificVenue: true,
      name: 'Sheesh Mahal Pavilion & Rampway',
      hallDetails: '80-meter elevated rampway with 1,200 front-row media seats',
      landmark: 'Near Mehkri Circle'
    },
    category: 'crew',
    plannerDetails: {
      services: [],
      guestCount: '150_300',
      themePreference: '',
      decorStyle: '',
      cateringCoordination: false,
      setupDaysNeeded: 1,
      specialRequirements: '',
      plannerBudget: { min: 0, max: 0, currency: 'INR' }
    },
    performerDetails: {
      performerType: 'Live Band',
      genres: [],
      performanceDuration: '90 mins',
      numberOfSets: 1,
      soundAndStage: {
        paSystemRequired: true,
        stageSizeNeeded: 'Medium (16x12 ft)',
        micCount: 2,
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
      feeBudget: { min: 0, max: 0, rateType: 'fixed', currency: 'INR' }
    },
    crewDetails: {
      roles: [
        { role: 'Lighting Console Operator (Avolites)', count: 2, experienceLevel: 'senior' },
        { role: 'Sound Engineer & FOH Mixer', count: 2, experienceLevel: 'senior' },
        { role: 'Camera Operators (Ramp 4K PTZ & Jib)', count: 4, experienceLevel: 'mid' },
        { role: 'Stage Hands & Ramp Coordinators', count: 8, experienceLevel: 'mid' },
        { role: 'Backstage Wardrobe Assistants & Ushers', count: 6, experienceLevel: 'junior' }
      ],
      shiftTimings: {
        shiftType: 'full_day',
        startTime: '08:30',
        endTime: '22:30',
        totalHours: 14
      },
      equipment: {
        provideOwnGear: false,
        gearSpecifications: 'Complete lighting grid, Clay Paky moving heads, and Sony FX6 cameras provided on site.',
        toolsRequired: ['Lighting wrenches', 'Cable testers', 'Multi-tool', 'Walkie-talkie headsets with earpieces']
      },
      dressCode: 'all_black',
      amenities: {
        mealsProvided: true,
        travelAllowance: true,
        overtimePay: true
      },
      crewBudget: {
        rateType: 'daily',
        amountPerCrew: 4000,
        totalEstimatedBudget: 176000,
        currency: 'INR'
      },
      certifications: ['Electrical Safety Compliance', 'Truss & Rigging Safety']
    },
    organizer: {
      name: 'Natasha Kapoor',
      email: 'natasha@vogueproduction.in',
      phone: '+91 97312 34567',
      organization: 'Vogue India Events'
    }
  }
};
