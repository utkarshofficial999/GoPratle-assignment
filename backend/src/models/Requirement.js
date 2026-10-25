const mongoose = require('mongoose');
const { getDBMode, inMemoryStore } = require('../config/db');

const RequirementSchema = new mongoose.Schema(
  {
    requirementCode: {
      type: String,
      unique: true,
      index: true
    },
    // Step 1: Event Basics
    title: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true
    },
    eventType: {
      type: String,
      required: [true, 'Event type is required'],
      enum: [
        'Wedding',
        'Corporate Conference',
        'Live Concert',
        'Birthday Celebration',
        'College Fest / Cultural',
        'Exhibition / Trade Show',
        'Private Gathering / Party',
        'Festival / Gala',
        'Other'
      ],
      default: 'Corporate Conference'
    },
    dateType: {
      type: String,
      enum: ['single', 'range'],
      default: 'single'
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    endDate: {
      type: Date
    },
    location: {
      city: { type: String, required: true },
      state: { type: String, default: '' },
      address: { type: String, default: '' },
      pincode: { type: String, default: '' }
    },
    venue: {
      hasSpecificVenue: { type: Boolean, default: false },
      name: { type: String, default: '' },
      hallDetails: { type: String, default: '' },
      landmark: { type: String, default: '' }
    },
    // Category Selector
    category: {
      type: String,
      required: [true, 'Requirement category is required'],
      enum: ['planner', 'performer', 'crew']
    },

    // Step 2 & 3: Category-Specific Fields
    // Category A: Event Planner
    plannerDetails: {
      services: [{ type: String }],
      guestCount: {
        type: String,
        enum: ['under_50', '50_150', '150_300', '300_700', '700_plus', ''],
        default: '150_300'
      },
      themePreference: { type: String, default: '' },
      decorStyle: { type: String, default: '' },
      cateringCoordination: { type: Boolean, default: false },
      setupDaysNeeded: { type: Number, default: 1 },
      specialRequirements: { type: String, default: '' },
      plannerBudget: {
        min: { type: Number, default: 0 },
        max: { type: Number, default: 0 },
        currency: { type: String, default: 'INR' }
      }
    },

    // Category B: Performer
    performerDetails: {
      performerType: {
        type: String,
        default: 'Live Band'
      },
      genres: [{ type: String }],
      performanceDuration: { type: String, default: '90 mins' },
      numberOfSets: { type: Number, default: 1 },
      soundAndStage: {
        paSystemRequired: { type: Boolean, default: true },
        stageSizeNeeded: { type: String, default: 'Medium (16x12 ft)' },
        micCount: { type: Number, default: 2 },
        inEarMonitors: { type: Boolean, default: false },
        instrumentDetails: { type: String, default: '' }
      },
      hospitality: {
        greenRoomRequired: { type: Boolean, default: true },
        mealsBeverages: { type: Boolean, default: true },
        accommodationNeeded: { type: Boolean, default: false },
        travelReimbursement: { type: Boolean, default: false }
      },
      sampleLinks: [{ type: String }],
      feeBudget: {
        min: { type: Number, default: 0 },
        max: { type: Number, default: 0 },
        rateType: { type: String, enum: ['fixed', 'hourly'], default: 'fixed' },
        currency: { type: String, default: 'INR' }
      }
    },

    // Category C: Crew
    crewDetails: {
      roles: [
        {
          role: { type: String },
          count: { type: Number, default: 1 },
          experienceLevel: {
            type: String,
            enum: ['junior', 'mid', 'senior', 'lead'],
            default: 'mid'
          }
        }
      ],
      shiftTimings: {
        shiftType: {
          type: String,
          enum: ['morning', 'evening', 'night', 'full_day', 'split'],
          default: 'full_day'
        },
        startTime: { type: String, default: '09:00' },
        endTime: { type: String, default: '21:00' },
        totalHours: { type: Number, default: 12 }
      },
      equipment: {
        provideOwnGear: { type: Boolean, default: false },
        gearSpecifications: { type: String, default: '' },
        toolsRequired: [{ type: String }]
      },
      dressCode: {
        type: String,
        enum: ['all_black', 'formal', 'smart_casual', 'branded_tshirt', 'safety_gear'],
        default: 'all_black'
      },
      amenities: {
        mealsProvided: { type: Boolean, default: true },
        travelAllowance: { type: Boolean, default: false },
        overtimePay: { type: Boolean, default: true }
      },
      crewBudget: {
        rateType: { type: String, enum: ['hourly', 'daily', 'project'], default: 'daily' },
        amountPerCrew: { type: Number, default: 0 },
        totalEstimatedBudget: { type: Number, default: 0 },
        currency: { type: String, default: 'INR' }
      },
      certifications: [{ type: String }]
    },

    // Organizer Contact Information
    organizer: {
      name: { type: String, required: [true, 'Organizer name is required'] },
      email: { type: String, required: [true, 'Organizer email is required'] },
      phone: { type: String, default: '' },
      organization: { type: String, default: '' }
    },

    // Workflow status
    status: {
      type: String,
      enum: ['draft', 'published', 'in_review', 'completed'],
      default: 'published'
    }
  },
  {
    timestamps: true
  }
);

// Generate unique readable requirement code before saving
RequirementSchema.pre('save', function (next) {
  if (!this.requirementCode) {
    const year = new Date().getFullYear();
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const prefix = this.category ? this.category.substring(0, 3).toUpperCase() : 'REQ';
    this.requirementCode = `GP-${prefix}-${year}-${randomHex}`;
  }
  next();
});

const MongooseRequirement = mongoose.model('Requirement', RequirementSchema);

// Resilient wrapper providing uniform API for both MongoDB and in-memory store
class RequirementService {
  static async create(data) {
    if (getDBMode() === 'mongodb') {
      const doc = new MongooseRequirement(data);
      return await doc.save();
    } else {
      // In-Memory implementation
      const year = new Date().getFullYear();
      const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
      const prefix = data.category ? data.category.substring(0, 3).toUpperCase() : 'REQ';
      const requirementCode = `GP-${prefix}-${year}-${randomHex}`;
      
      const item = {
        _id: 'mem_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        requirementCode,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      inMemoryStore.requirements.unshift(item);
      return item;
    }
  }

  static async find(filter = {}) {
    if (getDBMode() === 'mongodb') {
      const query = {};
      if (filter.category) query.category = filter.category;
      if (filter.search) {
        query.$or = [
          { title: { $regex: filter.search, $options: 'i' } },
          { 'location.city': { $regex: filter.search, $options: 'i' } },
          { requirementCode: { $regex: filter.search, $options: 'i' } }
        ];
      }
      return await MongooseRequirement.find(query).sort({ createdAt: -1 });
    } else {
      let results = [...inMemoryStore.requirements];
      if (filter.category) {
        results = results.filter((r) => r.category === filter.category);
      }
      if (filter.search) {
        const s = filter.search.toLowerCase();
        results = results.filter(
          (r) =>
            (r.title && r.title.toLowerCase().includes(s)) ||
            (r.location?.city && r.location.city.toLowerCase().includes(s)) ||
            (r.requirementCode && r.requirementCode.toLowerCase().includes(s))
        );
      }
      return results;
    }
  }

  static async findById(id) {
    if (getDBMode() === 'mongodb') {
      if (mongoose.Types.ObjectId.isValid(id)) {
        return await MongooseRequirement.findById(id);
      }
      return await MongooseRequirement.findOne({ requirementCode: id });
    } else {
      return (
        inMemoryStore.requirements.find(
          (r) => r._id === id || r.requirementCode === id
        ) || null
      );
    }
  }

  static async deleteById(id) {
    if (getDBMode() === 'mongodb') {
      if (mongoose.Types.ObjectId.isValid(id)) {
        return await MongooseRequirement.findByIdAndDelete(id);
      }
      return await MongooseRequirement.findOneAndDelete({ requirementCode: id });
    } else {
      const idx = inMemoryStore.requirements.findIndex(
        (r) => r._id === id || r.requirementCode === id
      );
      if (idx !== -1) {
        const removed = inMemoryStore.requirements.splice(idx, 1);
        return removed[0];
      }
      return null;
    }
  }

  static async getStats() {
    if (getDBMode() === 'mongodb') {
      const total = await MongooseRequirement.countDocuments();
      const planner = await MongooseRequirement.countDocuments({ category: 'planner' });
      const performer = await MongooseRequirement.countDocuments({ category: 'performer' });
      const crew = await MongooseRequirement.countDocuments({ category: 'crew' });
      return { total, planner, performer, crew };
    } else {
      const total = inMemoryStore.requirements.length;
      const planner = inMemoryStore.requirements.filter((r) => r.category === 'planner').length;
      const performer = inMemoryStore.requirements.filter((r) => r.category === 'performer').length;
      const crew = inMemoryStore.requirements.filter((r) => r.category === 'crew').length;
      return { total, planner, performer, crew };
    }
  }
}

module.exports = {
  RequirementModel: MongooseRequirement,
  RequirementService
};
