const express = require('express');
const router = express.Router();

const bookingsController = require('../controllers/bookings');
const validation = require('../middleware/bookingsValidate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', bookingsController.getAll);
router.get('/:id', bookingsController.getSingle);
router.post('/', validation.saveBooking, isAuthenticated, bookingsController.createBooking);
router.put('/:id', validation.saveBooking, isAuthenticated, bookingsController.updateBooking);
router.delete('/:id', isAuthenticated, bookingsController.deleteBooking);

module.exports = router;