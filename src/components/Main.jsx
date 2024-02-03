import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";

const breedTranslations = {
  akita: "秋田犬",
  beagle: "ビーグル",
  chihuahua: "チワワ",
  husky: "シベリアンハスキー",
  pug: "パグ",
  shihtzu: "シーズー",
};

const dogBreeds = ["akita", "beagle", "chihuahua", "husky", "pug", "shihtzu"];

export default function Main() {
  const [dogImages, setDogImages] = useState([]);
  const [randomImage, setRandomImage] = useState(null);

  const getDogImages = async () => {
    const dogImagesPromises = dogBreeds.map(async (breed) => {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
      const data = await response.json();
      return { breed, imageUrl: data.message };
    });

    const resolvedDogImages = await Promise.all(dogImagesPromises);
    setDogImages(resolvedDogImages);
  };

  const getRandomImage = async () => {
    const randomBreed = dogBreeds[Math.floor(Math.random() * dogBreeds.length)];
    const response = await fetch(`https://dog.ceo/api/breed/${randomBreed}/images/random`);
    const data = await response.json();
    setRandomImage({ breed: randomBreed, imageUrl: data.message });
  }

    useEffect(() => {
      getDogImages();
      getRandomImage();
  }, []);

  return (
    <main>
      <section className="section" style={{ textAlign: "right"}}>
        <Typography variant="h5" gutterBottom>
          6つの犬種のフリー画像を表示
        </Typography>
        
        <Grid container spacing={2}>
          {dogImages.map((dogImage, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <img
                  src={dogImage.imageUrl}
                  alt={`Random ${breedTranslations[dogImage.breed]}`}
                  style={{ width: "auto", maxWidth: "250px", height: "auto", maxHeight: "250px" }}
                />
                <Typography variant="h4">{breedTranslations[dogImage.breed]}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box display="flex" flexDirection="column" alignItems="center" marginTop={2}>
          {randomImage && (
            <>
              <img
                src={randomImage.imageUrl}
                alt={`Random ${breedTranslations[randomImage.breed]}`}
                style={{ width: "auto", maxWidth: "250px", height: "auto", maxHeight: "250px" }}
              />
              <Typography variant="h4">{breedTranslations[randomImage.breed]}</Typography>
            </>
          )}
        </Box>
        
        <Button variant="contained" color="primary" onClick={getDogImages}>
          違う画像にする
        </Button>
      </section>
    </main>
  );
}
