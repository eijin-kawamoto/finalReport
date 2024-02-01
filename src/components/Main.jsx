import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Gallery from "./Gallery";

export default function Main() {
  const [dogImages, setDogImages] = useState([]);
  const dogBreeds = ["beagle", "bulldog", "chihuahua", "dachshund", 
                     "germanshepherd", "goldenretriever", "poodle", "pug", 
                     "siberianhusky", "boxer"];

  useEffect(() => {
    const fetchDogImages = async (breed) => {
      try {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`Error fetching images for ${breed}:`, error);
        return { status: 'error' };
      }
    };

    const fetchAllDogImages = async () => {
      try {
        const dogImagesPromises = dogBreeds.map(fetchDogImages);
        const dogData = await Promise.all(dogImagesPromises);
        const validDogData = dogData.filter(data => data && data.status !== 'error');
        const formattedDogImages = validDogData.map(data => ({
          breed: data.message.split('/')[4],
          imageUrl: data.message
        }));
        setDogImages(formattedDogImages);
      } catch (error) {
        console.error("Error in fetchAllDogImages:", error);
      }
    };

    fetchAllDogImages();
  }, []);

  return (
    <main>
      <section className="section">
        <Typography variant="h4" gutterBottom>
          Dog Gallery
        </Typography>
        <Grid container spacing={2}>
          {dogImages.map((dogImage, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box>
                <img
                  src={dogImage.imageUrl}
                  alt={dogImage.breed}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <Typography variant="caption" align="center">
                  {dogImage.breed}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </section>
    </main>
  );
}

