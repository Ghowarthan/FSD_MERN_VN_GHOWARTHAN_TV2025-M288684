import { apiSlice } from './apiSlice';
const FLIGHTS_URL = '/api/flights';

export const flightsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFlights: builder.query({
            query: ({ keyword }) => ({
                url: FLIGHTS_URL,
                params: { keyword },
            }),
            keepUnusedDataFor: 5,
        }),
        getFlightDetails: builder.query({
            query: (flightId) => ({
                url: `${FLIGHTS_URL}/${flightId}`,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetFlightsQuery, useGetFlightDetailsQuery } = flightsApiSlice;
