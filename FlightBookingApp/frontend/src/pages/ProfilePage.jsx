import { Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
    const { userInfo } = useSelector((state) => state.auth);

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4">Profile</Typography>
            {userInfo && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">Name: {userInfo.name}</Typography>
                    <Typography variant="h6">Email: {userInfo.email}</Typography>
                </Box>
            )}
        </Container>
    );
};
import { Box } from '@mui/material';

export default ProfilePage;
