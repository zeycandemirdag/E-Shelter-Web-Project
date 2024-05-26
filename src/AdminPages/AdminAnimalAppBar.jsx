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
import PetsIcon from '@mui/icons-material/Pets';
//It creates a bar that will be displayed on the aniaml page that the admin can see and directs to the necessary pages.
const customTheme = createTheme({
    palette: {
      primary: {
        main: '#ad1457', // Purple color
      },
    },
  });
  export default function AdminAnimalAppBarFunction() {
   
    return (
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <AppBar position="static">
        <Toolbar>
    
        <ListItemButton component={Link} to="/admin">
          <ListItemIcon>
            <PetsIcon/>
          </ListItemIcon>
          <ListItemText primary="Admin" />
        </ListItemButton>
   
        <ListItemButton >
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
