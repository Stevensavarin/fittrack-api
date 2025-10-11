const express = require('express');
const router = express.Router();

const membershipsController = require('../controllers/memberships');
const validation = require('../middleware/membershipValidate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', membershipsController.getAll);
router.get('/:id', membershipsController.getSingle);
router.post('/', validation.saveMembership, isAuthenticated, membershipsController.createMembership);
router.put('/:id', validation.saveMembership, isAuthenticated, membershipsController.updateMembership);
router.delete('/:id', isAuthenticated, membershipsController.deleteMembership);

module.exports = router;