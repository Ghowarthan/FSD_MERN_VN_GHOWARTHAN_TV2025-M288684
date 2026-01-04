import { useParams, useNavigate } from 'react-router-dom';
import { useGetFlightDetailsQuery } from '../slices/flightsApiSlice';
import { useCreateBookingMutation } from '../slices/bookingsApiSlice';
import { useState } from 'react';
import { Container, Typography, Button, TextField, Box, Card, CardContent } from '@mui/material';
import { toast } from 'react-toastify';

const BookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [seats, setSeats] = useState(1);

    const { data: flight, isLoading, error } = useGetFlightDetailsQuery(id);
    const [createBooking, { isLoading: isBookingLoading }] = useCreateBookingMutation();

    const handleBooking = async () => {
        try {
            await createBooking({
                flightId: flight._id,
                seats,
                totalPrice: flight.price * seats
            }).unwrap();
            toast.success('Booking Successful');
            navigate('/profile');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    if (isLoading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">Error loading flight</Typography>;

    return (
        <Container sx={{ mt: 4 }}>
            <Card>
                <CardContent>
                    <Typography variant="h4">{flight.airline} - {flight.flightNumber}</Typography>
                    <Typography variant="h6">From: {flight.origin}</Typography>
                    <Typography variant="h6">To: {flight.destination}</Typography>
                    <Typography variant="h5" color="secondary" sx={{ mt: 2 }}>Price: ${flight.price}</Typography>

                    <Box sx={{ mt: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                        <TextField
                            label="Seats"
                            type="number"
                            InputProps={{ inputProps: { min: 1, max: 10 } }}
                            value={seats}
                            onChange={(e) => setSeats(Number(e.target.value))}
                        />
                        <Typography variant="h6">Total: ${flight.price * seats}</Typography>
                    </Box>

                    <Button
                        variant="contained"
                        size="large"
                        sx={{ mt: 3 }}
                        onClick={handleBooking}
                        disabled={isBookingLoading}
                    >
                        Confirm Booking
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default BookingPage;
