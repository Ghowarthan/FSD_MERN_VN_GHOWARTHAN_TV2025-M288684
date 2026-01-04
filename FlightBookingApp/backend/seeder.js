const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');
const flights = require('./data/flights');
const User = require('./models/User');
const Flight = require('./models/Flight');
const Booking = require('./models/Booking');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Booking.deleteMany();
        await Flight.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        // Flights typically don't belong to a user, but we can store who added them? 
        // Schema doesn't have 'user' field. So just insert.
        await Flight.insertMany(flights);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Booking.deleteMany();
        await Flight.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
