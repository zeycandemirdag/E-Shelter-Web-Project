import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import ListItemButton from "@mui/material/ListItemButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import PetsIcon from '@mui/icons-material/Pets';
const customTheme = createTheme({
    palette: {
      primary: {
        main: '#ad1457', // Purple color
      },
    },
  });
  export default function AppBarFunction() {
   
    return (
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <AppBar position="static">
        <Toolbar>
       
        <ListItemButton component={Link} to="/userInfo">
          <ListItemIcon>
            <SentimentSatisfiedAltOutlinedIcon/>
          </ListItemIcon>
          <ListItemText primary="User" />
        </ListItemButton>
  
        <ListItemButton component={Link} to="/animal">
          <ListItemIcon>
            <PetsIcon/>
          </ListItemIcon>
          <ListItemText primary="Animals" />
        </ListItemButton>
       
        <ListItemButton component={Link} to="/userveterinaries">
          <ListItemIcon>
            <PetsIcon/>
          </ListItemIcon>
          <ListItemText primary="Veterinars" />
        </ListItemButton>

        <ListItemButton component={Link} to="/donationform">
          <ListItemIcon>
            <VolunteerActivismOutlinedIcon/>
          </ListItemIcon>
          <ListItemText primary="Donation Form" />
        </ListItemButton>
  
        
  
        <ListItemButton component={Link} to="/">
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItemButton>
        </Toolbar>
      </AppBar>
      </ThemeProvider>
      );
}