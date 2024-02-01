import React from "react";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";

export default function Footer() {
    return (
      <AppBar position="static" className="footer" style={{ backgroundColor: "rgba(200,200,200,0.8)" }}>
        <Toolbar style={{ justifyContent: "center" }}>
          <Typography variant="h5" style={{ margin: 0, color: "#333" }}>
            日本大学文理学部情報科学科Webプログラミングの演習課題 
          </Typography>
          <Typography variant="h5" style={{ margin: 0, color: "#332" }}>
            5422057 川元瑛仁
          </Typography>
        </Toolbar>
      </AppBar>
    );
}