
import React from "react";
import { Button, Link } from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';
import { Link as RouterLink } from "react-router-dom";

const PageButton = ({ iconImg, text }) => {
  return (
    <Link component={RouterLink} to="/animal" underline="none">
      <Button
        variant="contained"
        sx={{
          width: {
            xs: "100%",
            md: "auto",
          },
          backgroundColor: "#ad1457",
          p: {
            xs: 1.5,
            md: 3,
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          borderRadius: "12px",
          fontFamily: "Apple Color Emoji",
          fontSize: "18px",
          fontWeight: "600",
          "&.MuiButtonBase-root:hover": {
            backgroundColor: "#f06292",
          },
        }}
      >
        <PetsIcon />
        {text}
        <PetsIcon />
      </Button>
    </Link>
  );
};

export default PageButton;
