import React, { useEffect, useState } from "react";
import { Grid, Box, Typography } from "@mui/material";

const dogBreeds = ["akita", "beagle", "chihuahua", "husky", "pug", "shihtzu"];

export default function Main() {
  const [dogImages, setDogImages] = useState([]);

  useEffect(() => {
    const getDogImages = async () => {
      try {
        const dogImagesPromises = dogBreeds.map(async (breed) => {
          const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
          const data = await response.json();
          return { breed, imageUrl: data.message };
        });

        const resolvedDogImages = await Promise.all(dogImagesPromises);
        setDogImages(resolvedDogImages);
      } catch (error) {
        console.error("Error fetching dog images:", error);
      }
    };

    getDogImages();
  }, []);

  return (
    <main>
      <section className="section">
        <Typography variant="h4" gutterBottom>
          Random Dog Images
        </Typography>
        <Grid container spacing={2}>
          {dogImages.map((dogImage, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <img
                  src={dogImage.imageUrl}
                  alt={`Random ${dogImage.breed}`}
                  style={{ maxWidth: "auto", height: "auto" }}
                />
                <Typography variant="h4">{dogImage.breed}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </section>
    </main>
  );
}
