/*import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid,
  Box, Typography, Container, Dialog, IconButton, Tooltip,DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AdminAppBarFunction from './AdminAppBar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

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

function MedicalHistoryDialog({ open, onClose, medicalHistory }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Medical History</DialogTitle>
      <DialogContent>
        <Typography>Medication: {medicalHistory.medication}</Typography>
        <Typography>Height: {medicalHistory.height}</Typography>
        <Typography>Weight: {medicalHistory.weight}</Typography>
        <Typography>Medical Condition: {medicalHistory.medicalCondition}</Typography>
        <Typography>Note: {medicalHistory.note}</Typography>
        {medicalHistory.veterinary && (
          <>
            <Typography>Clinic Name: {medicalHistory.veterinary.clinicName}</Typography>
            <Typography>Vet Name: {medicalHistory.veterinary.vetName} {medicalHistory.veterinary.vetSurname}</Typography>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function AdminAnimal() {
    const [petsList, setPetsList] = useState(undefined);


  const [selectedPet, setSelectedPet] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/showanimals');
      setPetsList(response.data.pets); // petsList'i güncelle
    } catch (error) {
      console.log(error.response);
      setPetsList([]); // Hata durumunda boş dizi ile petsList'i güncelle
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleDetailsClick = (pet) => {
    setSelectedPet(pet);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedPet(null);
  };

  const handleAdoptionClick = (animalId) => {
    navigate(`/adoption?animalId=${animalId}`);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Box>
        <AdminAppBarFunction />
        <br></br>
        <br></br>
        <br></br>
        <main>
          <Box sx={{ pt: 2, pb: 6 }}>
            <Container maxWidth="md">
              <Typography style={{ marginBottom: '-8rem' }} component="h1" variant="h2" align="center" color="#ad1457" gutterBottom>
                Animals
              </Typography>
              {petsList === undefined ? ( // petsList yüklenene kadar loading göster
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
      {selectedPet && (
        <MedicalHistoryDialog
          open={dialogOpen}
          onClose={handleDialogClose}
          medicalHistory={selectedPet.medical_history}
        />
      )}
    </ThemeProvider>
  );
  
}
*/
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid,
  Box, Typography, Container, Dialog, IconButton, Tooltip, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, InputLabel, FormControl, ThemeProvider
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import AdminAppBarFunction from './AdminAppBar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import MedicalHistoryDialog from './MedicalHistoryDialog';

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

export default function AdminAnimal() {
  const [petsList, setPetsList] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addAnimalDialogOpen, setAddAnimalDialogOpen] = useState(false); // State for Add Animal Dialog
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

  const handleDeleteAnimal = async (animalId) => {
    try {
      await axios.delete(`http://localhost:5000/deleteAnimal/${animalId}`);
      fetchData();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleAddAnimal = async () => {
    try {
      const response = await axios.post('http://localhost:5000/addAnimal', {
        animalName,
        status,
        age,
        genus,
        gender,
        photo,
        vetId,
        medication: medicalHistory.medication,
        height: medicalHistory.height,
        weight: medicalHistory.weight,
        medicalCondition: medicalHistory.medicalCondition,
        note: medicalHistory.note,
      });
      console.log(response.data.message);
      setAddAnimalDialogOpen(false);
      fetchData();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Box>
        <AdminAppBarFunction />
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
                              <Tooltip title="Delete">
                                <IconButton color="error" onClick={() => handleDeleteAnimal(pet.animalId)}>
                                  <DeleteIcon />
                                  <Typography variant="body2" color="error" style={{ marginLeft: '5px' }}>Delete</Typography>
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
              <Box mt={4} textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => setAddAnimalDialogOpen(true)} // Open Add Animal Dialog
                >
                  Add New Animal
                </Button>
              </Box>
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

      {/* Add New Animal Dialog */}
      <Dialog open={addAnimalDialogOpen} onClose={() => setAddAnimalDialogOpen(false)}>
        <DialogTitle>Add New Animal</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="animalName"
            label="Animal Name"
            type="text"
            fullWidth
            value={animalName}
            onChange={(e) => setAnimalName(e.target.value)}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              fullWidth
            >
              {animalStatusOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="age"
            label="Age"
            type="text"
            fullWidth
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <TextField
            margin="dense"
            id="genus"
            label="Genus"
            type="text"
            fullWidth
            value={genus}
            onChange={(e) => setGenus(e.target.value)}
          />
          <TextField
            margin="dense"
            id="gender"
            label="Gender"
            type="text"
            fullWidth
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <TextField
            margin="dense"
            id="photo"
            label="Animal Photo"
            type="text"
            fullWidth
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Veterinarian</InputLabel>
            <Select
              value={vetId}
              onChange={(e) => setVetId(e.target.value)}
              fullWidth
            >
              {veterinarians.map((vet) => (
                <MenuItem key={vet.vetId} value={vet.vetId}>
                  {vet.vetName} {vet.vetSurname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="h6" sx={{ mt: 2 }}>Medical History:</Typography>
          <TextField
            margin="dense"
            id="medication"
            label="Medication"
            type="text"
            fullWidth
            value={medicalHistory.medication}
            onChange={(e) => setMedicalHistory({ ...medicalHistory, medication: e.target.value })}
          />
          <TextField
            margin="dense"
            id="height"
            label="Height"
            type="text"
            fullWidth
            value={medicalHistory.height}
            onChange={(e) => setMedicalHistory({ ...medicalHistory, height: e.target.value })}
          />
          <TextField
            margin="dense"
            id="weight"
            label="Weight"
            type="text"
            fullWidth
            value={medicalHistory.weight}
            onChange={(e) => setMedicalHistory({ ...medicalHistory, weight: e.target.value })}
          />
          <TextField
            margin="dense"
            id="medicalCondition"
            label="Medical Condition"
            type="text"
            fullWidth
            value={medicalHistory.medicalCondition}
            onChange={(e) => setMedicalHistory({ ...medicalHistory, medicalCondition: e.target.value })}
          />
          <TextField
            margin="dense"
            id="note"
            label="Note"
            type="text"
            fullWidth
            value={medicalHistory.note}
            onChange={(e) => setMedicalHistory({ ...medicalHistory, note: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddAnimalDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddAnimal} color="primary">Add Animal</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

