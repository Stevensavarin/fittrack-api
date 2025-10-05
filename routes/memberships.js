const express = require('express');
const router = express.Router();

const membershipsController = require('../controllers/memberships');

router.get('/', membershipsController.getAll);
router.get('/:id', membershipsController.getSingle);
router.post('/', membershipsController.createMembership);
router.put('/:id', membershipsController.updateMembership);
router.delete('/:id', membershipsController.deleteMembership);

module.exports = router;