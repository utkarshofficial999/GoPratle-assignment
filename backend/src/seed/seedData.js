const sampleRequirements = [
  {
    title: 'Grand Tech Symposium 2026',
    eventType: 'Corporate Conference',
    dateType: 'range',
    startDate: new Date('2026-11-15T09:00:00Z'),
    endDate: new Date('2026-11-17T18:00:00Z'),
    location: {
      city: 'Bangalore',
      state: 'Karnataka',
      address: 'Whitefield Convention Center',
      pincode: '560066'
    },
    venue: {
      hasSpecificVenue: true,
      name: 'Main Auditorium Hall A & B',
      hallDetails: 'Capacity 1,200 seats, fully air-conditioned with VIP lounge',
      landmark: 'Opposite ITPL Main Gate'
    },
    category: 'planner',
    plannerDetails: {
      services: [
        'Full Event Planning',
        'Vendor Sourcing & Management',
        'Decor & Theme Styling',
        'Logistics & Security Coordination'
      ],
      guestCount: '700_plus',
      themePreference: 'Modern Minimalist with Tech Neon Accents',
      decorStyle: 'Futuristic glassmorphism stages with interactive LED screens',
      cateringCoordination: true,
      setupDaysNeeded: 2,
      specialRequirements: 'High-speed fiber connectivity, VIP greenroom coordination, eco-friendly badge printing.',
      plannerBudget: {
        min: 250000,
        max: 500000,
        currency: 'INR'
      }
    },
    organizer: {
      name: 'Priya Sharma',
      email: 'priya.sharma@techfest.org',
      phone: '+91 98765 43210',
      organization: 'InnovateIndia Foundation'
    },
    status: 'published'
  },
  {
    title: 'Sunburn Arena Live Fest',
    eventType: 'Live Concert',
    dateType: 'single',
    startDate: new Date('2026-12-20T17:00:00Z'),
    endDate: null,
    location: {
      city: 'Mumbai',
      state: 'Maharashtra',
      address: 'BKC Ground, Bandra Kurla Complex',
      pincode: '400051'
    },
    venue: {
      hasSpecificVenue: true,
      name: 'Open Air Grounds Stage 1',
      hallDetails: 'Stage 40x30 ft, elevated DJ deck',
      landmark: 'Near MMRDA Grounds'
    },
    category: 'performer',
    performerDetails: {
      performerType: 'DJ & Electronic Live Act',
      genres: ['EDM', 'Progressive House', 'Bollywood Remixes'],
      performanceDuration: '2 hours',
      numberOfSets: 2,
      soundAndStage: {
        paSystemRequired: true,
        stageSizeNeeded: 'Large (32x24 ft or larger)',
        micCount: 2,
        inEarMonitors: true,
        instrumentDetails: 'Pioneer CDJ-3000 x 3, DJM-900NXS2 mixer, wireless handheld shure mic'
      },
      hospitality: {
        greenRoomRequired: true,
        mealsBeverages: true,
        accommodationNeeded: true,
        travelReimbursement: true
      },
      sampleLinks: [
        'https://soundcloud.com/example/live-set-2025',
        'https://youtube.com/watch?v=example-festival'
      ],
      feeBudget: {
        min: 150000,
        max: 300000,
        rateType: 'fixed',
        currency: 'INR'
      }
    },
    organizer: {
      name: 'Rohan Mehra',
      email: 'rohan@pulseevents.in',
      phone: '+91 91234 56789',
      organization: 'Pulse Live Entertainment'
    },
    status: 'published'
  },
  {
    title: 'Heritage Royal Wedding & Sangeet',
    eventType: 'Wedding',
    dateType: 'range',
    startDate: new Date('2026-12-05T10:00:00Z'),
    endDate: new Date('2026-12-07T23:00:00Z'),
    location: {
      city: 'Jaipur',
      state: 'Rajasthan',
      address: 'Amer Palace Heritage Resort',
      pincode: '302028'
    },
    venue: {
      hasSpecificVenue: true,
      name: 'Courtyard & Banquet Lawns',
      hallDetails: 'Lawn capacity 800 people, historical architecture backdrop',
      landmark: 'Near Maota Lake'
    },
    category: 'crew',
    crewDetails: {
      roles: [
        { role: 'Senior Sound Engineer', count: 2, experienceLevel: 'senior' },
        { role: 'Lighting Console Operator', count: 2, experienceLevel: 'senior' },
        { role: 'Stage Hands & Cable Runners', count: 6, experienceLevel: 'mid' },
        { role: 'Camera Operators (Multi-cam)', count: 4, experienceLevel: 'mid' },
        { role: 'VIP Hospitality Ushers', count: 8, experienceLevel: 'junior' }
      ],
      shiftTimings: {
        shiftType: 'full_day',
        startTime: '10:00',
        endTime: '23:00',
        totalHours: 13
      },
      equipment: {
        provideOwnGear: false,
        gearSpecifications: 'Organizer provides digital console Allen & Heath, Line array JBL V20, Martin Moving lights.',
        toolsRequired: ['Gaffer tape', 'Cable testers', 'Walkie-talkie headsets', 'Multi-tool kit']
      },
      dressCode: 'all_black',
      amenities: {
        mealsProvided: true,
        travelAllowance: true,
        overtimePay: true
      },
      crewBudget: {
        rateType: 'daily',
        amountPerCrew: 3500,
        totalEstimatedBudget: 154000,
        currency: 'INR'
      },
      certifications: ['Electrical Safety', 'Rigging & Trussing Certified']
    },
    organizer: {
      name: 'Kavita Singhania',
      email: 'kavita@singhaniaweddings.com',
      phone: '+91 99887 76655',
      organization: 'Singhania Family Office'
    },
    status: 'published'
  }
];

module.exports = { sampleRequirements };
