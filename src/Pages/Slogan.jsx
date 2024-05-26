import React from "react";
import { Box, Container } from "@mui/material";


const Slogan = () => {
  return (
    <Container
      sx={{
        mt: 25,
        padding: "0 30px 0 30px",
        maxWidth: {
          xs: "400px",
          md: "1200px",
        },
      }}
      disableGutters
    >
      <Box
        sx={{
          backgroundColor: "#f8bbd0",
          borderRadius: "20px",
          p: 3,
          textAlign: "center",
          fontSize: "2.5rem",
          fontFamily:"Apple Color Emoji",
          color:"#880e4f",
        }}
      >
        Welcome To Find Your Furry Friend: Adopt Today!
      
      </Box>
    </Container>
  );
};

export default Slogan;