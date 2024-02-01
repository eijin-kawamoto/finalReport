import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

export default function Main() {
  const [dogImageUrl, setDogImageUrl] = useState("");

  useEffect(() => {
    const getDogImage = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");

        const data = await response.json();

        setDogImageUrl(data.message);
      } catch (error) {
        console.error("Error fetching dog image:", error);
      }
    };

    getDogImage();
  }, []);

  return (
    <main>
      <section className="section">
        <Typography variant="h4" gutterBottom>
          Random Dog Image
        </Typography>
        {dogImageUrl && (
          <Box>
            <img
              src={dogImageUrl}
              alt="Random Dog"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>
        )}
      </section>
    </main>
  );
}


