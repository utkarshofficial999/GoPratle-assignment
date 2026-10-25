const express = require('express');
const router = express.Router();
const {
  createRequirement,
  getRequirements,
  getRequirementById,
  deleteRequirement,
  getRequirementStats,
  seedRequirements
} = require('../controllers/requirementController');

// Stats route (must be before :id to prevent capturing 'stats' as id)
router.get('/stats', getRequirementStats);

// Seed sample requirements
router.post('/seed', seedRequirements);

// Collection routes
router.route('/')
  .get(getRequirements)
  .post(createRequirement);

// Item routes
router.route('/:id')
  .get(getRequirementById)
  .delete(deleteRequirement);

module.exports = router;
