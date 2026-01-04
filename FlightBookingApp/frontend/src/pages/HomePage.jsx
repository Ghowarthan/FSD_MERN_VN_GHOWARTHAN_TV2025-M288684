import { Container, Typography, Box, TextField, Button, Grid, Card, CardContent } from '@mui/material';
import { useState } from 'react';
import { useGetFlightsQuery } from '../slices/flightsApiSlice';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [keyword, setKeyword] = useState('');
    const { data: flights, isLoading, error } = useGetFlightsQuery({ keyword });
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        // Refetch automatically by updating state passed to hook
    };

    const handleBook = (id) => {
        navigate(`/booking/${id}`);
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom>Find Your Next Adventure</Typography>
                <form onSubmit={handleSearch}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <TextField
                            label="Where to?"
                            variant="outlined"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <Button variant="contained" size="large" type="submit">Search</Button>
                    </Box>
                </form>
            </Box>

            {isLoading ? (
                <Typography>Loading...</Typography>
            ) : error ? (
                <Typography color="error">{error?.data?.message || error.error}</Typography>
            ) : (
                <Grid container spacing={3}>
                    {flights && flights.map((flight) => (
                        <Grid item xs={12} md={4} key={flight._id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">{flight.airline}</Typography>
                                    <Typography color="textSecondary">{flight.flightNumber}</Typography>
                                    <Typography variant="body1">{flight.origin} to {flight.destination}</Typography>
                                    <Typography variant="h6" color="primary">${flight.price}</Typography>
                                    <Button variant="contained" sx={{ mt: 2 }} onClick={() => handleBook(flight._id)} fullWidth>
                                        Book Now
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default HomePage;
