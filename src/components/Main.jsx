import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

export default function Main() {
  const dogBreeds = ["akita", "beagle", "bulldog", "chihuahua", "husky", "poodle", "shiba"];
  const [dogImages, setDogImages] = useState({});

  useEffect(() => {
    const fetchDogImages = async (breed) => {
      try {
        const response = await fetch("https://dog.ceo/api/breed/${breed}/images/random");

        const data = await response.json();

        setDogImages((prevDogImages) => ({
            ...prevDogImages,
            [breed]: data.message,
        }));
      } catch (error) {
        console.error("Error fetching ${breed} image:", error);
      }
    };

    dogBreeds.forEach((breed) => fetchDogImages(breed));
  }, []);

  return (
    <main>
      <section className="section">
        <Typography variant="h4" gutterBottom>
          Dog Breed Images
        </Typography>
        {dogBreeds.map((breed) => (
            <Box key={breed} mb={2}>
                <Typography variant="h6">{breed}</Typography>
                {dogImages[breed] && (
                  <img
                    src={dogImages[breed]}
                    alt={`${breed} Dog`}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                )}
              </Box>
            ))}
      </section>
    </main>
  );
}


