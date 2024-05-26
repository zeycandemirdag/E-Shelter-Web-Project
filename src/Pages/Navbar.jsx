import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import Link from "@mui/material/Link";




export const navLinks = [
    {
      id: 1,
      name: "Home",
      destination:"/",
    },
    {
      id: 2,
      name: "Animals",
      destination:"/animal",
    },
    {
      id: 3,
      name: "Login",
      destination:"/login",
    },
    {
      id: 4,
      name: "Register",
      destination:"/register",
    },
    
  ];
  

const Navbar = () => {
  
  return (
    <AppBar position="static" elevation={0} color="transparent">
      <Container
        maxWidth="xl"
        sx={{
          px: 60,
          pt: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
        disableGutters
      >
       
        <Box
  sx={{
    display: {
      xs: "none",
      lg: "flex",
    },
    alignItems: "center",
    justifyContent: "center", 
    gap: "84px",
  }}
>
  {navLinks.map((navLinks) => (
    <Link
      href={navLinks.destination}
      key={navLinks.id}
      underline="hover" 
      color="#ad1457"
      sx={{
        fontWeight: "300",
        fontSize: "28px",
        opacity: 2.0,
        ":hover": { bgcolor: "#f06292" },
        textAlign: "center", 
        textDecoration: "none", 
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          width: "100%",
          height: "2px",
          bottom: 0,
          left: 0,
          backgroundColor: "#ad1457",
          transform: "scaleX(0)", 
          transformOrigin: "bottom right",
          transition: "transform 0.3s ease-out", 
        },
        "&:hover::after": {
          transform: "scaleX(1)", 
          transformOrigin: "bottom left",
        },
      }}
    >
      {navLinks.name}
    </Link>
  ))}
</Box>

       
      </Container>
    </AppBar>
  );
};
export default Navbar;


