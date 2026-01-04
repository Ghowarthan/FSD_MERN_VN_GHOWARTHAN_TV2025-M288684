const express = require('express');
const router = express.Router();
const {
    getFlights,
    getFlightById,
    deleteFlight,
    createFlight,
} = require('../controllers/flightController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getFlights).post(protect, admin, createFlight);
router
    .route('/:id')
    .get(getFlightById)
    .delete(protect, admin, deleteFlight);

module.exports = router;
