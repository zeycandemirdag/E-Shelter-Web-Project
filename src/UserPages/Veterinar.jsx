import * as React from 'react';
import AppBarFunction from './AppBar';
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

const Veterinary = () => {
  const [vetsList, setVetsList] = React.useState([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedVet, setSelectedVet] = React.useState(null);
  


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













  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <AppBarFunction/>
      <Container maxWidth="md">
        <Box sx={{ pt: 1, pb: 10 }}>
          <Toolbar />
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Veterinarians
          </Typography>
       
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
      
  
    </ThemeProvider>
  );
};

export default Veterinary;

