const mongoose = require('mongoose');

const flightSchema = mongoose.Schema(
    {
        airline: { type: String, required: true },
        flightNumber: { type: String, required: true },
        origin: { type: String, required: true },
        destination: { type: String, required: true },
        departureTime: { type: Date, required: true },
        arrivalTime: { type: Date, required: true },
        price: { type: Number, required: true },
        seatsAvailable: { type: Number, required: true },
        class: { type: String, default: 'Economy' },
    },
    {
        timestamps: true,
    }
);

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
