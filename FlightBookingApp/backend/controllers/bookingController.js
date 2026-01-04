const Booking = require('../models/Booking');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const addBookingItems = async (req, res) => {
    try {
        const {
            flightId,
            seats,
            totalPrice,
        } = req.body;

        if (!flightId) {
            res.status(400).json({ message: 'No flight selected' });
            return;
        } else {
            const booking = new Booking({
                user: req.user._id,
                flight: flightId,
                seats,
                totalPrice,
            });

            const createdBooking = await booking.save();
            res.status(201).json(createdBooking);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).populate('flight');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addBookingItems,
    getMyBookings,
};
