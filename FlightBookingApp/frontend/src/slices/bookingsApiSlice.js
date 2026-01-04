import { apiSlice } from './apiSlice';
const BOOKINGS_URL = '/api/bookings';

export const bookingsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createBooking: builder.mutation({
            query: (order) => ({
                url: BOOKINGS_URL,
                method: 'POST',
                body: order,
            }),
        }),
        getMyBookings: builder.query({
            query: () => ({
                url: `${BOOKINGS_URL}/mybookings`,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useCreateBookingMutation, useGetMyBookingsQuery } = bookingsApiSlice;
