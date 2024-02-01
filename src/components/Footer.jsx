import React from "react";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";

export default function Footer() {
    return (
      <footer className="footer" 
      style={{textAlign: "center", padding: "20px"}}>
        <Typography variant="h5" style={{ margin: 0, color: "#333" }}>
         日本大学文理学部情報科学科Webプログラミングの演習課題 
        </Typography>
        <Typography variant="h5" style={{ margin: 0, color: "#333" }}>
         5422057 川元瑛仁
        </Typography>
      </footer>
    );
}