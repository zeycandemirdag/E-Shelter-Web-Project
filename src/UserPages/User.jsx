/*// ColumnGroupingTable.js

import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AppBarFunction from './AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#ad1457', // Purple color
    },
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

export default function User() {
  const [userInfo, setUserInfo] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/getUser');
      console.log(response.data.message);
      setUserInfo(response.data.message);

      
    } catch (error) {
      console.log(error.response);
      alert(error.response.data.message);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ backgroundImage: 'url("https://s.tmimgcdn.com/scr/800x500/296200/premium-vektor-arkaplan-resimleri--yuksek-kaliteli-arkaplan--modern-hd-arka-plan-goruntuleri_296286-original.jpg")', backgroundSize: 'cover', minHeight: '1000px' }}>
        <div style={{ textAlign: 'center' }}>
          <AppBarFunction />
          <Box sx={{ pt: 4, pb: 6 }}>
            <Container maxWidth="md">
              <Typography style={{ marginBottom: '-8rem' }} component="h2" variant="h3" align="center" color="#ad1457" gutterBottom>
                User Information
              </Typography>
            </Container>
          </Box>
          <TableContainer component={Paper} style={{ width: '50%', margin: 'auto', marginTop: '80px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>User Email</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>User Username</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>User Name</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>User Surname</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>User Password</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={userInfo.email}>
                  <TableCell>{userInfo[0]}</TableCell>
                  <TableCell>{userInfo[1]}</TableCell>
                  <TableCell>{userInfo[2]}</TableCell>
                  <TableCell>{userInfo[3]}</TableCell>
                  <TableCell>{userInfo[4]}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          
        </div>
      </Box>
    </ThemeProvider>
  );
}*/

import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AppBarFunction from './AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#ad1457', // Purple color
    },
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

export default function User() {
  const [userInfo, setUserInfo] = useState({});
  const [editable, setEditable] = useState(false);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    email: '',
    name: '',
    surname: '',
    password: ''
  });

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/getUser');
      const user = response.data.message;
      setUserInfo(user);
      setUpdatedUserInfo({
        email: user[0],
        name: user[2],
        surname: user[3],
        password: user[4]
      });
    } catch (error) {
      console.log(error.response);
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:5000/updateUser', updatedUserInfo);
      setUserInfo((prev) => ({
        ...prev,
        email: updatedUserInfo.email,
        name: updatedUserInfo.name,
        surname: updatedUserInfo.surname,
        password: updatedUserInfo.password,
      }));
      setEditable(false);
    } catch (error) {
      console.log(error.response);
      alert(error.response.data.message);
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ backgroundImage: 'url("https://s.tmimgcdn.com/scr/800x500/296200/premium-vektor-arkaplan-resimleri--yuksek-kaliteli-arkaplan--modern-hd-arka-plan-goruntuleri_296286-original.jpg")', backgroundSize: 'cover', minHeight: '1000px' }}>
        <div style={{ textAlign: 'center' }}>
          <AppBarFunction />
          <Box sx={{ pt: 4, pb: 6 }}>
            <Container maxWidth="md">
              <Typography style={{ marginBottom: '-8rem' }} component="h2" variant="h3" align="center" color="#ad1457" gutterBottom>
                User Information
              </Typography>
            </Container>
          </Box>
          <TableContainer component={Paper} style={{ width: '50%', margin: 'auto', marginTop: '80px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>User Email</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>User Username</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>User Name</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>User Surname</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>User Password</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={userInfo.email}>
                  <TableCell>
                    {editable ? (
                      <TextField
                        name="email"
                        value={updatedUserInfo.email}
                        onChange={handleChange}
                      />
                    ) : (
                      userInfo[0]
                    )}
                  </TableCell>
                  <TableCell>{userInfo[1]}</TableCell>
                  <TableCell>
                    {editable ? (
                      <TextField
                        name="name"
                        value={updatedUserInfo.name}
                        onChange={handleChange}
                      />
                    ) : (
                      userInfo[2]
                    )}
                  </TableCell>
                  <TableCell>
                    {editable ? (
                      <TextField
                        name="surname"
                        value={updatedUserInfo.surname}
                        onChange={handleChange}
                      />
                    ) : (
                      userInfo[3]
                    )}
                  </TableCell>
                  <TableCell>
                    {editable ? (
                      <TextField
                        name="password"
                        type="password"
                        value={updatedUserInfo.password}
                        onChange={handleChange}
                      />
                    ) : (
                      userInfo[4]
                    )}
                  </TableCell>
                  <TableCell>
                    {editable ? (
                      <Button variant="contained" color="primary" onClick={handleSave}>
                        Save
                      </Button>
                    ) : (
                      <Button variant="contained" color="primary" onClick={() => setEditable(true)}>
                        Edit
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Box>
    </ThemeProvider>
  );
}

