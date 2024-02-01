import React from "react";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";

export default function Header() {
    return (
      <header className="header" 
      style={{textAlign: "center", padding: "20px"}}>
        <Typography variant="h1" style={{ margin: 0, color: "#333" }}>
          犬
        </Typography>
      </header>
    );
}