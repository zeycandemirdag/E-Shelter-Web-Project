import React from 'react';
import { Avatar, Button, CssBaseline, TextField, Paper, Box, Grid, Typography, createTheme, ThemeProvider } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import { useState } from 'react';
import axios  from 'axios';
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#ad1457',
    },
  },
  
});

export default function SignInSide() {
 
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate();
  
  
    const handleUserName= (event) =>{
      event.preventDefault();
      setUserName(event.target.value)
      console.log("username",username)
      
    }
    const handlePassword = (event) =>{
      event.preventDefault();
      setPassword(event.target.value)
      console.log("pswrd",password)
     
    }
    React.useEffect(() => {
      console.log(username,password);
    }, [username,password]);
   
   
    const handleSubmit = (event) => {
     
      event.preventDefault();
  
      const data = {
        username: username,
        password: password,
      };
      console.log("data",data)
      axios.post('http://localhost:5000/login', data)
        .then(function (response) {
          console.log("response",response)
          console.log(response.data.message);
          if(response.data.message =="admin"){
            navigate("/adminanimal");}
          else{
            navigate("/animal")
          }
          //navigate("/animal")
        })
        .catch(function (error) {
          console.log(error.response);
          alert(error.response.data.message)
        });
     

  };

  return (
    <ThemeProvider theme={customTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://i.imgflip.com/5m9nzb.gif)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <PetsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={handleUserName}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePassword}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, ":hover": { bgcolor: "#f06292" } }}

              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item justifyContent="center">
                  <Link to="/register">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}