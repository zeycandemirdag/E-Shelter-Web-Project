/*import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, CssBaseline, ThemeProvider, TableContainer, TableHead, TableRow, Paper, Typography, Container, Box } from '@mui/material';
import AdminAppBarFunction from './AdminAppBar';
import { createTheme } from '@mui/material/styles';

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

export default function OwnerDetails() {
    const [owners, setOwners] = useState([]);

    const fetchOwners = async () => {
        try {
            const response = await fetch('http://localhost:5000/getOwners');
            const data = await response.json();
            if (response.ok) {
                setOwners(data.owners);
            } else {
                console.error('Error fetching owners:', data.error);
            }
        } catch (error) {
            console.error('Error fetching owners:', error);
        }
    };

    useEffect(() => {
        fetchOwners();
    }, []);

    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline />
            <AdminAppBarFunction />
            <Container>
                <Box sx={{ pt: 3, pb: 2 }}>
                    <Typography variant="h5" component="h1" align="center" gutterBottom>
                        Owners
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Surname</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Tel No</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Animal Name</TableCell>
                                    <TableCell>Animal Age</TableCell>
                                    <TableCell>Animal Genus</TableCell>
                                    <TableCell>Animal Gender</TableCell>
                                    <TableCell>Adoption Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {owners && owners.map((owner) => (
                                    <TableRow key={owner.email}>
                                        <TableCell>{owner.name}</TableCell>
                                        <TableCell>{owner.surname}</TableCell>
                                        <TableCell>{owner.email}</TableCell>
                                        <TableCell>{owner.telNo}</TableCell>
                                        <TableCell>{owner.address}</TableCell>
                                        <TableCell>{owner.animalName}</TableCell>
                                        <TableCell>{owner.animalAge}</TableCell>
                                        <TableCell>{owner.animalGenus}</TableCell>
                                        <TableCell>{owner.animalGender}</TableCell>
                                        <TableCell>{owner.adoptionDate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
*/

import React, { useEffect, useState } from 'react';
import { 
    Table, TableBody, TableCell, CssBaseline, ThemeProvider, TableContainer, 
    TableHead, TableRow, Paper, Typography, Container, Box, Button, Dialog, 
    DialogActions, DialogContent, DialogTitle, TextField, MenuItem 
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import AdminAppBarFunction from './AdminAppBar';

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

export default function OwnerDetails() {
    const [owners, setOwners] = useState([]);
    const [availableAnimals, setAvailableAnimals] = useState([]);
    const [availableUsers, setAvailableUsers] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newOwner, setNewOwner] = useState({
        pid: '',
        telNo: '',
        address: '',
        animalId: ''
    });

    const fetchOwners = async () => {
        try {
            const response = await fetch('http://localhost:5000/getOwners');
            const data = await response.json();
            if (response.ok) {
                setOwners(data.owners || []); // Ensure owners is an array
            } else {
                console.error('Error fetching owners:', data.error);
            }
        } catch (error) {
            console.error('Error fetching owners:', error);
        }
    };

    const fetchAvailableAnimals = async () => {
        try {
            const response = await fetch('http://localhost:5000/getAvailableAnimals');
            const data = await response.json();
            if (response.ok) {
                setAvailableAnimals(data.animals || []); // Ensure animals is an array
            } else {
                console.error('Error fetching available animals:', data.error);
            }
        } catch (error) {
            console.error('Error fetching available animals:', error);
        }
    };

    const fetchAvailableUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/getAvailableUsers');
            const data = await response.json();
            if (response.ok) {
                setAvailableUsers(data.users || []); // Ensure users is an array
            } else {
                console.error('Error fetching available users:', data.error);
            }
        } catch (error) {
            console.error('Error fetching available users:', error);
        }
    };

    useEffect(() => {
        fetchOwners();
        fetchAvailableAnimals();
        fetchAvailableUsers();
    }, []);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setNewOwner({
            pid: '',
            telNo: '',
            address: '',
            animalId: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOwner(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddOwner = async () => {
        try {
            const response = await fetch('http://localhost:5000/addOwner', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newOwner),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Owner added successfully:', data);
                handleDialogClose();
                fetchOwners(); // Refresh the owners list
            } else {
                console.error('Failed to add owner:', data.error);
            }
        } catch (error) {
            console.error('Error adding owner:', error);
        }
    };

    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline />
            <AdminAppBarFunction />
            <Container>
                <Box sx={{ pt: 3, pb: 2 }}>
                    <Typography variant="h5" component="h1" align="center" gutterBottom>
                        Owners
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDialogOpen}
                    >
                        Add New Owner
                    </Button>
                    <TableContainer component={Paper} sx={{ mt: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Surname</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Tel No</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Animal Name</TableCell>
                                    <TableCell>Age</TableCell>
                                    <TableCell>Genus</TableCell>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>Adoption Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {owners && owners.map((owner) => (
                                    <TableRow key={owner.email}>
                                        <TableCell>{owner.name}</TableCell>
                                        <TableCell>{owner.surname}</TableCell>
                                        <TableCell>{owner.email}</TableCell>
                                        <TableCell>{owner.telNo}</TableCell>
                                        <TableCell>{owner.address}</TableCell>
                                        <TableCell>{owner.animalName}</TableCell>
                                        <TableCell>{owner.animalAge}</TableCell>
                                        <TableCell>{owner.animalGenus}</TableCell>
                                        <TableCell>{owner.animalGender}</TableCell>
                                        <TableCell>{owner.adoptionDate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container>

            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Add New Owner</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="pid"
                        label="User"
                        type="text"
                        select
                        fullWidth
                        value={newOwner.pid}
                        onChange={handleInputChange}
                    >
                        {availableUsers && availableUsers.map((user) => (
                            <MenuItem key={user.pid} value={user.pid}>
                                {`${user.name} ${user.surname} (${user.email})`}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        margin="dense"
                        name="telNo"
                        label="Tel No"
                        type="text"
                        fullWidth
                        value={newOwner.telNo}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="address"
                        label="Address"
                        type="text"
                        fullWidth
                        value={newOwner.address}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="animalId"
                        label="Animal"
                        type="text"
                        select
                        fullWidth
                        value={newOwner.animalId}
                        onChange={handleInputChange}
                    >
                        {availableAnimals && availableAnimals.map((animal) => (
                            <MenuItem key={animal.animalId} value={animal.animalId}>
                                {`${animal.animalName}`}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddOwner} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}
