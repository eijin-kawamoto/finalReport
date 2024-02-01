import React from "react";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="md">
        <Toolbar>
          <img
            src="/dog_icon.png"
            alt="Dog Icon"
            style={{ marginRight: "10px", width: "30px", height: "30px" }}
          />
          <Typography variant="h1">犬</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}