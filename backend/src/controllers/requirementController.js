const { RequirementService } = require('../models/Requirement');
const { sampleRequirements } = require('../seed/seedData');
const { getDBStatus } = require('../config/db');

// Validation helper for payload
const validateRequirementPayload = (body) => {
  const errors = [];

  // Step 1 validations
  if (!body.title || typeof body.title !== 'string' || !body.title.trim()) {
    errors.push('Event title/name is required');
  }

  if (!body.eventType) {
    errors.push('Event type is required');
  }

  if (!body.startDate) {
    errors.push('Event start date is required');
  }

  if (body.dateType === 'range' && !body.endDate) {
    errors.push('End date is required when date range is selected');
  }

  if (!body.location || !body.location.city) {
    errors.push('Event location city is required');
  }

  if (!body.category || !['planner', 'performer', 'crew'].includes(body.category)) {
    errors.push('Valid requirement category (planner, performer, or crew) is required');
  }

  // Organizer validations
  if (!body.organizer || !body.organizer.name) {
    errors.push('Organizer contact name is required');
  }
  if (!body.organizer || !body.organizer.email) {
    errors.push('Organizer contact email is required');
  }

  // Step 2 & 3 Category specific validations
  if (body.category === 'planner') {
    if (!body.plannerDetails) {
      errors.push('Planner details are required for category "planner"');
    }
  } else if (body.category === 'performer') {
    if (!body.performerDetails) {
      errors.push('Performer details are required for category "performer"');
    }
  } else if (body.category === 'crew') {
    if (!body.crewDetails) {
      errors.push('Crew details are required for category "crew"');
    }
  }

  return errors;
};

// @desc    Create a new requirement
// @route   POST /api/requirements
const createRequirement = async (req, res, next) => {
  try {
    const validationErrors = validateRequirementPayload(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    const requirement = await RequirementService.create(req.body);

    res.status(201).json({
      success: true,
      message: `Requirement successfully created and categorized under "${requirement.category}"`,
      data: requirement
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all requirements (with filtering & search)
// @route   GET /api/requirements
const getRequirements = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category && ['planner', 'performer', 'crew'].includes(category.toLowerCase())) {
      filter.category = category.toLowerCase();
    }
    if (search) {
      filter.search = search.trim();
    }

    const items = await RequirementService.find(filter);

    res.status(200).json({
      success: true,
      count: items.length,
      categoryFilter: filter.category || 'all',
      dbStatus: getDBStatus(),
      data: items
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single requirement by ID or code
// @route   GET /api/requirements/:id
const getRequirementById = async (req, res, next) => {
  try {
    const item = await RequirementService.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Requirement not found with ID or code: ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete requirement
// @route   DELETE /api/requirements/:id
const deleteRequirement = async (req, res, next) => {
  try {
    const deleted = await RequirementService.deleteById(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Requirement not found with ID or code: ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Requirement successfully deleted',
      data: deleted
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get requirement statistics by category
// @route   GET /api/requirements/stats
const getRequirementStats = async (req, res, next) => {
  try {
    const stats = await RequirementService.getStats();
    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Seed sample requirements
// @route   POST /api/requirements/seed
const seedRequirements = async (req, res, next) => {
  try {
    const seeded = [];
    for (const sample of sampleRequirements) {
      const created = await RequirementService.create(sample);
      seeded.push(created);
    }

    res.status(201).json({
      success: true,
      message: `Successfully seeded ${seeded.length} sample requirements (Planner, Performer, and Crew)`,
      data: seeded
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRequirement,
  getRequirements,
  getRequirementById,
  deleteRequirement,
  getRequirementStats,
  seedRequirements
};
