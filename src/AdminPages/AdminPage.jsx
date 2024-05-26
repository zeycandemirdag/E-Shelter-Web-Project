import React, { useState } from "react";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AdminAppBarFunction from "./AdminAppBar";
import {useNavigate} from "react-router-dom";
import axios  from 'axios';
//The Admin Page is a page that displays all adoption forms received by users with the admin role. 
//On this page, the admin can view all the forms and either approve or reject them.

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#ad1457',
     
    },
  },

});

const AdminPage = () => {
  const [fIds, setFIds] = useState([]);
  const [fNames, setFnames] = useState([]);
  const [lNames, setLnames] = useState([]);
  const [emails, setEmails] = useState([]);
  const [phoneNums, setPnums] = useState([]);
  const [adrs, setAddrs] = useState([]);
  const [aIds, setAids] = useState([]);
  const [responseM, setRm] = useState([]);

  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/apply');
      console.log(response.data);
  
      setFIds(response.data.formId);
      setAddrs(response.data.address);
      setFnames(response.data.firstName);
      setLnames(response.data.lastName);
      setEmails(response.data.userEmail);
      setPnums(response.data.phoneNum);
      setAids(response.data.petID);
    } catch (error) {
      console.log(error.response);
      alert(error.response.data.message);
    }
  };
  
  React.useEffect(() => {
    fetchData();
  }, []);
  React.useEffect(() => {
    fetchData();
  }, [responseM]);
 
 
  

 
   
  const handleReject = (formId) => {
    
    const data = {
      delId: formId,
    };
    axios.post('http://localhost:5000/deleteForm',data)
    .then(function (response) {
      console.log(response);
      setRm(response.data.message)
      alert(response.data.message)
    })
    .catch(function (error) {
      console.log(error.response.data);
      alert(error.response.data.message)
    });

   
 };

 const handleAccept = (pId) => {

  const data = {
    pId: pId,
  };
  axios.post('http://localhost:5000/deleteanimal',data)
  .then(function (response) {
    console.log(response);
    setRm(response.data.message)
    alert(response.data.message)
    navigate("/adminanimal");
  })
  .catch(function (error) {
    console.log(error.response.data);
    alert(error.response.data.message)
  });

   
 };
  return (
    <ThemeProvider theme={customTheme}>
      <Box>
      <AdminAppBarFunction />
           
          <Container component="main" maxWidth="lg">
            <Box
              sx={{
                marginTop: 8,
              }}
            >
        <TableContainer component={Paper} style={{ width: '100%', margin: 'auto', marginTop: '20px'}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Form Id:</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>First Name:</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Last Name:</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Email:</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Phone Number:</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Address:</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Pet ID:</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emails.map((email,index) => (
                <TableRow key={index}>
                  <TableCell>{fIds[index]}</TableCell>
                  <TableCell>{fNames[index]}</TableCell>
                  <TableCell>{lNames[index]}</TableCell>
                  <TableCell>{emails[index]}</TableCell>
                  <TableCell>{phoneNums[index]}</TableCell>
                  <TableCell>{adrs[index]}</TableCell>
                  <TableCell>{aIds[index]}</TableCell>
                
            
                  <TableCell>
                    <Button variant="contained" size="small" sx={{ mt: 3, mb: 2, ":hover": { bgcolor: "#66bb6a" } }} onClick={() => handleAccept(aIds[index])}>
                      Accept  
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" size="small" sx={{ mt: 3, mb: 2, ":hover": { bgcolor: "#d50000" } }}  onClick={() => handleReject(fIds[index])}>
                      Reject
                    </Button>
                  </TableCell>
            
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
         
            </Box>
          </Container>
         
        
      </Box>
    </ThemeProvider>
  );
};



export default AdminPage;
