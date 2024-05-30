import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid,
  Box, Typography, Container, Dialog, IconButton, Tooltip, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, InputLabel, FormControl, ThemeProvider
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import AppBarFunction from './AppBar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MedicalHistoryDialog from '../AdminPages/MedicalHistoryDialog';

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

const animalStatusOptions = [
  { value: true, label: 'True' },
  { value: false, label: 'False' },
];

export default function Animal() {
  const [petsList, setPetsList] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [animalDetails, setAnimalDetails] = useState(null); // State for selected animal details
  const [animalName, setAnimalName] = useState('');
  const [status, setStatus] = useState(false);
  const [age, setAge] = useState('');
  const [genus, setGenus] = useState('');
  const [gender, setGender] = useState('');
  const [photo, setPhoto] = useState('');
  const [vetId, setVetId] = useState('');
  const [medicalHistory, setMedicalHistory] = useState({
    medication: '',
    height: '',
    weight: '',
    medicalCondition: '',
    note: '',
  });

  const [veterinarians, setVeterinarians] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/showanimals');
      setPetsList(response.data.pets || []); // petsList'i güncelle
    } catch (error) {
      console.log(error.response);
      setPetsList([]); // Hata durumunda boş dizi ile petsList'i güncelle
    }
  };

  const fetchVeterinarians = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getVets');
      setVeterinarians(response.data.vets || []); // Veterinarians listesini güncelle
    } catch (error) {
      console.log(error.response);
      setVeterinarians([]); // Hata durumunda boş dizi ile veterinarians listesini güncelle
    }
  };

  useEffect(() => {
    fetchData();
    fetchVeterinarians();
  }, []);

  const handleDetailsClick = (pet) => {
    setAnimalDetails(pet);
    setDialogOpen(true);
    setMedicalHistory(pet.medical_history);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setMedicalHistory({
      medication: '',
      height: '',
      weight: '',
      medicalCondition: '',
      note: '',
    });
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Box>
        <AppBarFunction />
        <br></br>
        <br></br>
        <br></br>
        <main>
          <Box sx={{ pt: 2, pb: 6 }}>
            <Container maxWidth="md">
              <Typography style={{ marginBottom: '-8rem' }} component="h1" variant="h2" align="center" color="#ad1457" gutterBottom>
                Animals
              </Typography>
              {petsList.length === 0 ? ( // petsList yüklenene kadar loading göster
                <Typography>Loading...</Typography>
              ) : (
                <>
                  {petsList.length > 0 ? (
                    <Grid container spacing={4}>
                      {petsList.map((pet) => (
                        <Grid item key={pet.animalId} xs={12} sm={6} md={4}>
                          <Card>
                            <CardMedia
                              component="img"
                              height="300"
                              image={pet.photo ? pet.photo : 'https://gemootest.s3.us-east-2.amazonaws.com/s/res/644344281576136704/b58aad5c1f18d9b97027bf66cf012814.jpeg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARLZICB6QQHKRCV7K%2F20240525%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20240525T213047Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=ed112792400c4932db4815fa1c4b350813e5616057bd7c3d2498fc7179d9e913'}
                              alt={pet.animalName}
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="div">{pet.animalName}</Typography>
                              <Typography variant="body2" color="text.secondary">{pet.genus} - {pet.age} years old</Typography>
                            </CardContent>
                            <CardActions>
                              <Tooltip title="Details">
                                <IconButton color="primary" onClick={() => handleDetailsClick(pet)}>
                                  <VisibilityIcon />
                                  <Typography variant="body2" color="text.primary" style={{ marginLeft: '5px' }}>Details</Typography>
                                </IconButton>
                              </Tooltip>

                            </CardActions>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography variant="body1">No pets found.</Typography>
                  )}
                </>
              )}
  
            </Container>
          </Box>
        </main>
      </Box>
      {/* Details Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        {animalDetails && (
          <>
            <DialogTitle>{animalDetails.animalName}</DialogTitle>
            <DialogContent>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={animalDetails.photo ? animalDetails.photo : 'https://gemootest.s3.us-east-2.amazonaws.com/s/res/644344281576136704/b58aad5c1f18d9b97027bf66cf012814.jpeg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARLZICB6QQHKRCV7K%2F20240525%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20240525T213047Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=ed112792400c4932db4815fa1c4b350813e5616057bd7c3d2498fc                  .jpeg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARLZICB6QQHKRCV7K%2F20240525%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20240525T213047Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=ed112792400c4932db4815fa1c4b350813e5616057bd7c3d2498fc7179d9e913'}
                  alt={animalDetails.animalName}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">{animalDetails.animalName}</Typography>
                  <Typography variant="body2" color="text.secondary">{animalDetails.genus} - {animalDetails.age} years old</Typography>
                </CardContent>
                <CardActions>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                    <strong>Medication:</strong> {medicalHistory.medication}<br />
                    <strong>Height:</strong> {medicalHistory.height}<br />
                    <strong>Weight:</strong> {medicalHistory.weight}<br />
                    <strong>Medical Condition:</strong> {medicalHistory.medicalCondition}<br />
                    <strong>Note:</strong> {medicalHistory.note}<br />
                    <strong>Clinic Name:</strong> {medicalHistory.veterinary?.clinicName}<br />
                    <strong>Vet Name:</strong> {medicalHistory.veterinary?.vetName} {medicalHistory.veterinary?.vetSurname} <br />
                   
                  </Typography>
                </CardActions>
              </Card>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>


    </ThemeProvider>
  );
}