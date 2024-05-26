

/* ADD YAOIYOR
import AdminAppBarFunction from './AdminAppBar';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ListItemButton from "@mui/material/ListItemButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import PetsIcon from '@mui/icons-material/Pets';

import {
    Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid,
    Box, Typography, Container, Dialog, IconButton, Tooltip, DialogActions, DialogContent, DialogTitle,
    TextField
} from '@mui/material';

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

export default function AdminVeterinary() {
  const [vetsList, setVetsList] = React.useState([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedVet, setSelectedVet] = React.useState(null);
  const [addVetDialogOpen, setAddVetDialogOpen] = React.useState(false);
  const [newVet, setNewVet] = React.useState({
    clinicName: '',
    vetName: '',
    vetSurname: '',
    telNo: '',
    city: '',
    street: ''
  });

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/getVets');
      const data = await response.json();
      console.log('Fetched data:', data); // Debugging line
      if (response.ok) {
        setVetsList(data.vets);
      } else {
        console.error('Error fetching vets:', data.error);
        setVetsList([]); // Set vetsList to an empty array on error
      }
    } catch (error) {
      console.error('Error fetching vets:', error);
      setVetsList([]); // Set vetsList to an empty array on error
    }
  };

  React.useEffect(() => {
    fetchData();
    console.log("vetlist",vetsList)
  }, []);

  const handleDetailsClick = (vet) => {
    setSelectedVet(vet);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleAddVetDialogOpen = () => {
    setAddVetDialogOpen(true);
  };

  const handleAddVetDialogClose = () => {
    setAddVetDialogOpen(false);
    setNewVet({
      clinicName: '',
      vetName: '',
      vetSurname: '',
      telNo: '',
      city: '',
      street: ''
    });
  };

  const handleAddVet = async () => {
    try {
      const response = await fetch('http://localhost:5000/addvet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVet),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Veterinarian added successfully:', data);
        handleAddVetDialogClose();
        fetchData(); // Refresh the veterinarians list
      } else {
        console.error('Failed to add veterinarian:', data.error);
      }
    } catch (error) {
      console.error('Error adding veterinarian:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVet(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <ListItemButton component={Link} to="/adminanimal">
            <ListItemIcon>
              <PetsIcon />
            </ListItemIcon>
            <ListItemText primary="Animals" />
          </ListItemButton>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItemButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Box sx={{ pt: 3, pb: 10 }}>
          <Toolbar />
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Veterinarians
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddVetDialogOpen}
            sx={{ mx: 'auto', mb: 2, display: 'block' }}
          >
            Add Veterinary
          </Button>
          {vetsList ? (
            <Grid container spacing={2} justifyContent="center">
              {vetsList.map((vet) => (
                <Grid item key={vet.vetId} xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                        {vet.clinicName}
                      </Typography>
                      <Typography color="textSecondary" sx={{ mb: 1 }}>
                        {vet.vetName} {vet.vetSurname}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary" onClick={() => handleDetailsClick(vet)}>
                        Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" align="center">
              No veterinarians found.
            </Typography>
          )}
        </Box>
      </Container>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Details for {selectedVet?.vetName} {selectedVet?.vetSurname}</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Clinic Name: {selectedVet?.clinicName}
          </Typography>
          <Typography gutterBottom>
            Tel No: {selectedVet?.telNo}
          </Typography>
          <Typography gutterBottom>
            City: {selectedVet?.city}
          </Typography>
          <Typography gutterBottom>
            Street: {selectedVet?.street}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={addVetDialogOpen} onClose={handleAddVetDialogClose}>
        <DialogTitle>Add Veterinary</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="clinicName"
            name="clinicName"
            label="Clinic Name"
            type="text"
            fullWidth
            value={newVet.clinicName}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="vetName"
            name="vetName"
            label="Veterinarian's Name"
            type="text"
            fullWidth
            value={newVet.vetName}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="vetSurname"
            name="vetSurname"
            label="Veterinarian's Surname"
            type="text"
            fullWidth
            value={newVet.vetSurname}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="telNo"
            name="telNo"
            label="Telephone Number"
            type="text"
            fullWidth
            value={newVet.telNo}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="city"
            name="city"
            label="City"
            type="text"
            fullWidth
            value={newVet.city}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="street"
            name="street"
            label="Street"
            type="text"
            fullWidth
            value={newVet.street}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddVetDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddVet} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
*/

import * as React from 'react';
import AdminAppBarFunction from './AdminAppBar';
import {
  AppBar, Toolbar, ListItemButton, ListItemIcon, ListItemText, Button,
  Card, CardActions, CardContent, Typography, Container, Grid, Box, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField, CssBaseline, ThemeProvider
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import LogoutIcon from '@mui/icons-material/Logout';
import { createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

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

const AdminVeterinary = () => {
  const [vetsList, setVetsList] = React.useState([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedVet, setSelectedVet] = React.useState(null);
  const [addVetDialogOpen, setAddVetDialogOpen] = React.useState(false);
  const [editVetDialogOpen, setEditVetDialogOpen] = React.useState(false);
  const [newVet, setNewVet] = React.useState({
    clinicName: '',
    vetName: '',
    vetSurname: '',
    telNo: '',
    city: '',
    street: ''
  });
  const [editVet, setEditVet] = React.useState({
    vetId: '',
    clinicName: '',
    vetName: '',
    vetSurname: '',
    telNo: '',
    city: '',
    street: ''
  });

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/getVets');
      const data = await response.json();
      if (response.ok) {
        setVetsList(data.vets);
      } else {
        console.error('Error fetching vets:', data.error);
        setVetsList([]);
      }
    } catch (error) {
      console.error('Error fetching vets:', error);
      setVetsList([]);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleDetailsClick = (vet) => {
    setSelectedVet(vet);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleAddVetDialogOpen = () => {
    setAddVetDialogOpen(true);
  };

  const handleAddVetDialogClose = () => {
    setAddVetDialogOpen(false);
    setNewVet({
      clinicName: '',
      vetName: '',
      vetSurname: '',
      telNo: '',
      city: '',
      street: ''
    });
  };

  const handleAddVet = async () => {
    try {
      const response = await fetch('http://localhost:5000/addvet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVet),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Veterinarian added successfully:', data);
        handleAddVetDialogClose();
        fetchData();
      } else {
        console.error('Failed to add veterinarian:', data.error);
      }
    } catch (error) {
      console.error('Error adding veterinarian:', error);
    }
  };

  const handleEditVetDialogOpen = (vet) => {
    setEditVet({
      vetId: vet.vetId,
      clinicName: vet.clinicName,
      vetName: vet.vetName,
      vetSurname: vet.vetSurname,
      telNo: vet.telNo,
      city: vet.city,
      street: vet.street
    });
    setEditVetDialogOpen(true);
  };

  const handleEditVetDialogClose = () => {
    setEditVetDialogOpen(false);
    setEditVet({
      vetId: '',
      clinicName: '',
      vetName: '',
      vetSurname: '',
      telNo: '',
      city: '',
      street: ''
    });
  };

  const handleEditVet = async () => {
    try {
      const response = await fetch(`http://localhost:5000/editvet`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editVet),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Veterinarian edited successfully:', data);
        handleEditVetDialogClose();
        fetchData();
      } else {
        console.error('Failed to edit veterinarian:', data.error);
      }
    } catch (error) {
      console.error('Error editing veterinarian:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditVet(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <AdminAppBarFunction/>
      <Container maxWidth="md">
        <Box sx={{ pt: 1, pb: 10 }}>
          <Toolbar />
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Veterinarians
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddVetDialogOpen}
            sx={{ mx: 'auto', mb: 2, display: 'block' }}
          >
            Add Veterinary
          </Button>
          <Grid container spacing={2} justifyContent="center">
            {vetsList ? (
              vetsList.map((vet) => (
                <Grid item key={vet.vetId} xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                        {vet.clinicName}
                      </Typography>
                      <Typography color="textSecondary" sx={{ mb: 1 }}>
                        {vet.vetName} {vet.vetSurname}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary" onClick={() => handleDetailsClick(vet)}>
                        Details
                      </Button>
                      <Button size="small" color="primary" onClick={() => handleEditVetDialogOpen(vet)}>
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body1" align="center">
                No veterinarians found.
              </Typography>
            )}
          </Grid>
        </Box>
      </Container>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Details for {selectedVet?.vetName} {selectedVet?.vetSurname}</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Clinic Name: {selectedVet?.clinicName}
          </Typography>
          <Typography gutterBottom>
            Tel No: {selectedVet?.telNo}
          </Typography>
          <Typography gutterBottom>
            City: {selectedVet?.city}
          </Typography>
          <Typography gutterBottom>
            Street: {selectedVet?.street}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={addVetDialogOpen} onClose={handleAddVetDialogClose}>
        <DialogTitle>Add Veterinary</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="clinicName"
            name="clinicName"
            label="Clinic Name"
            type="text"
            fullWidth
            value={newVet.clinicName}
            onChange={(e) => setNewVet({ ...newVet, clinicName: e.target.value })}
          />
          <TextField
            margin="dense"
            id="vetName"
            name="vetName"
            label="Veterinarian's Name"
            type="text"
            fullWidth
            value={newVet.vetName}
            onChange={(e) => setNewVet({ ...newVet, vetName: e.target.value })}
          />
          <TextField
            margin="dense"
            id="vetSurname"
            name="vetSurname"
            label="Veterinarian's Surname"
            type="text"
            fullWidth
            value={newVet.vetSurname}
            onChange={(e) => setNewVet({ ...newVet, vetSurname: e.target.value })}
          />
          <TextField
            margin="dense"
            id="telNo"
            name="telNo"
            label="Telephone Number"
            type="text"
            fullWidth
            value={newVet.telNo}
            onChange={(e) => setNewVet({ ...newVet, telNo: e.target.value })}
          />
          <TextField
            margin="dense"
            id="city"
            name="city"
            label="City"
            type="text"
            fullWidth
            value={newVet.city}
            onChange={(e) => setNewVet({ ...newVet, city: e.target.value })}
          />
          <TextField
            margin="dense"
            id="street"
            name="street"
            label="Street"
            type="text"
            fullWidth
            value={newVet.street}
            onChange={(e) => setNewVet({ ...newVet, street: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddVetDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddVet} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editVetDialogOpen} onClose={handleEditVetDialogClose}>
        <DialogTitle>Edit Veterinary</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="editClinicName"
            name="clinicName"
            label="Clinic Name"
            type="text"
            fullWidth
            value={editVet.clinicName}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="editVetName"
            name="vetName"
            label="Veterinarian's Name"
            type="text"
            fullWidth
            value={editVet.vetName}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="editVetSurname"
            name="vetSurname"
            label="Veterinarian's Surname"
            type="text"
            fullWidth
            value={editVet.vetSurname}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="editTelNo"
            name="telNo"
            label="Telephone Number"
            type="text"
            fullWidth
            value={editVet.telNo}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="editCity"
            name="city"
            label="City"
            type="text"
            fullWidth
            value={editVet.city}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="editStreet"
            name="street"
            label="Street"
            type="text"
            fullWidth
            value={editVet.street}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditVetDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditVet} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default AdminVeterinary;

