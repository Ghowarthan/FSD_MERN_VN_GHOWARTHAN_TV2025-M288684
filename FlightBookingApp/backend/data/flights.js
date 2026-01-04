const flights = [
    {
        airline: 'Air India',
        flightNumber: 'AI-202',
        origin: 'Delhi',
        destination: 'Mumbai',
        departureTime: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days later
        arrivalTime: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
        price: 5000,
        seatsAvailable: 60,
    },
    {
        airline: 'IndiGo',
        flightNumber: '6E-554',
        origin: 'Mumbai',
        destination: 'Bangalore',
        departureTime: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
        arrivalTime: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000 + 1.5 * 60 * 60 * 1000),
        price: 3500,
        seatsAvailable: 120,
    },
    {
        airline: 'Vistara',
        flightNumber: 'UK-840',
        origin: 'Bangalore',
        destination: 'Delhi',
        departureTime: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
        arrivalTime: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000 + 2.5 * 60 * 60 * 1000),
        price: 6000,
        seatsAvailable: 40,
    },
];

module.exports = flights;
