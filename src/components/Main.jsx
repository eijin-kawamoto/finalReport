import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const dogBreeds = ["akita", "beagle", "frenchbulldog", "chihuahua", "husky"];

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
        {dogImages.map((dogImage, index) => (
          <Box key={index}>
            <img
              src={dogImage.imageUrl}
              alt={`Random ${dogImage.breed}`}
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <Typography variant="caption">{dogImage.breed}</Typography>
          </Box>
        ))}
      </section>
    </main>
  );
}
