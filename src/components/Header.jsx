import React from "react";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";

export default function Header() {
    return (
      <AppBar position="static" className="header" style={{ backgroundColor: "antiquewhite" }}>
        <Toolbar>
          <Typography variant="h1" style={{ margin: 0, color: "#333" }}>
            犬
          </Typography>
        </Toolbar>
      </AppBar>
    );
}
