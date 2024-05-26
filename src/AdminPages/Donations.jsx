import React, { useEffect, useState } from 'react';
import { 
    Table, TableBody, TableCell, CssBaseline, ThemeProvider, TableContainer, 
    TableHead, TableRow, Paper, Typography, Container, Box, Button
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import AdminAppBarFunction from './AdminAppBar';
import axios from 'axios';

const customTheme = createTheme({
    palette: {
        primary: { main: '#ad1457' },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundImage: 'url("https://s.tmimgcdn.com/scr/800x500/296200/premium-vektor-arkaplan-resimleri--yuksek-kaliteli-arkaplan--modern-hd-arka-plan-goruntuleri_296286-original.jpg")',
                    backgroundSize: 'cover',
                    minHeight: '1000px',
                },
            },
        },
    },
});

export default function Donations() {
    const [donations, setDonations] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const fetchDonations = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getDonations');
            if (response.status === 200) {
                setDonations(response.data.donations || []);
                setTotalAmount(response.data.total_amount || 0);
            } else {
                console.error('Error fetching donations:', response.data.error);
            }
        } catch (error) {
            console.error('Error fetching donations:', error);
        }
    };

    const handleDelete = async (donationId) => {
        try {
            console.log("donation id",donationId)
            const response = await axios.delete(`http://localhost:5000/deleteDonation/${donationId}`);
            if (response.status === 200) {
                fetchDonations(); // Refresh the donations list and total amount
            } else {
                console.error('Failed to delete donation:', response.data.error);
            }
        } catch (error) {
            console.error('Error deleting donation:', error);
        }
    };

    useEffect(() => {
        fetchDonations();
    }, []);

    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline />
            <AdminAppBarFunction />
            <Container>
                <Box sx={{ pt: 3, pb: 2 }}>
                    <Typography variant="h5" component="h1" align="center" gutterBottom>
                        Donations
                    </Typography>
                    <TableContainer component={Paper} sx={{ mt: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Surname</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {donations && donations.map((donation) => (
                                    <TableRow key={donation.donationid}>
                                        <TableCell>{donation.name}</TableCell>
                                        <TableCell>{donation.surname}</TableCell>
                                        <TableCell>{donation.date}</TableCell>
                                        <TableCell>{donation.amount}</TableCell>
                                        <TableCell>
                                            <Button 
                                                variant="contained" 
                                                color="secondary"
                                                onClick={() => handleDelete(donation.donationid)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={3} align="right">Total Amount</TableCell>
                                    <TableCell>{totalAmount}</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
