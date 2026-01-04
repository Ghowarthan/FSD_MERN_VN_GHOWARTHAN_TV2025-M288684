const Flight = require('../models/Flight');

// @desc    Get all flights
// @route   GET /api/flights
// @access  Public
const getFlights = async (req, res) => {
    try {
        const keyword = req.query.keyword
            ? {
                $or: [
                    {
                        destination: {
                            $regex: req.query.keyword,
                            $options: 'i',
                        },
                    },
                    {
                        origin: {
                            $regex: req.query.keyword,
                            $options: 'i',
                        },
                    },
                ],
            }
            : {};

        const flights = await Flight.find({ ...keyword });
        res.json(flights);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single flight
// @route   GET /api/flights/:id
// @access  Public
const getFlightById = async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);

        if (flight) {
            res.json(flight);
        } else {
            res.status(404).json({ message: 'Flight not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a flight
// @route   POST /api/flights
// @access  Private/Admin
const createFlight = async (req, res) => {
    try {
        const { airline, flightNumber, origin, destination, departureTime, arrivalTime, price, seatsAvailable } = req.body;
        const flight = new Flight({
            airline,
            flightNumber,
            origin,
            destination,
            departureTime,
            arrivalTime,
            price,
            seatsAvailable
        });
        const createdFlight = await flight.save();
        res.status(201).json(createdFlight);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Delete a flight
// @route   DELETE /api/flights/:id
// @access  Private/Admin
const deleteFlight = async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);

        if (flight) {
            await flight.deleteOne();
            res.json({ message: 'Flight removed' });
        } else {
            res.status(404).json({ message: 'Flight not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getFlights,
    getFlightById,
    deleteFlight,
    createFlight
};
