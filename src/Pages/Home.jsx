
import React from "react";

import { Box, Container, Typography } from "@mui/material";

import Navbar from "./Navbar";
import Slogan from "./Slogan";

const Home = () => {
  return (
    <Container
      maxWidth="false"
      disableGutters
      sx={{
        p: {
          xs: 2,
          sm: 5,
          md: 2,
        },
        background: `url(${require("../assets/ezgif.com-animated-gif-maker.gif")}) center/cover no-repeat`,
        minHeight: "1000px",
        borderRadius: {
          xs: "0px 0px 27px 27px",
          md: "0px 0px 54px 54px",
        },
       
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Navbar />
        <Typography
          sx={{
            color: "#f8bbd0",
            marginTop: "196.5px",
            textAlign: "center",
            fontWeight: "600",
            fontSize: {
              xs: "38px",
              md: "48px",
            },
            lineHeight: "62px",
            mb: 4,
            fontFamily:"Apple Color Emoji",
          }}
        >
         E-SHELTER ANIMAL ADOPTION PLATFORM
        </Typography>
        
        <Slogan />
      </Box>
    </Container>
  );
};

export default Home;