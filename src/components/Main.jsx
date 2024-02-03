import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

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
  const [selectedBreed, setSelectedBreed] = useState("");
  const [randomImage, setRandomImage] = useState(null);

  const getDogImage = async (breed) => {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    const data = await response.json();
    return { breed, imageUrl: data.message };
  };

  const handleBreedChange = (event) => {
    setSelectedBreed(event.target.value);
  };

  const getRandomImage = async () => {
    if (selectedBreed) {
      const dogImage = await getDogImage(selectedBreed);
      setRandomImage(dogImage);
    }
  };

  useEffect(() => {
    const initialDogImagesPromises = dogBreeds.map(async (breed) => getDogImage(breed));
    Promise.all(initialDogImagesPromises).then((resolvedDogImages) => setDogImages(resolvedDogImages));
  }, []);

  return (
    <main>
      <section className="section" style={{ textAlign: "right" }}>
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
          <FormControl variant="outlined" style={{ minWidth: 200 }}>
            <InputLabel id="breed-select-label">犬種を選択</InputLabel>
            <Select
              labelId="breed-select-label"
              id="breed-select"
              value={selectedBreed}
              onChange={handleBreedChange}
              label="犬種を選択"
            >
              {dogBreeds.map((breed) => (
                <MenuItem key={breed} value={breed}>
                  {breedTranslations[breed]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" onClick={getRandomImage} style={{ marginTop: 2 }}>
            選択された犬種の画像を表示する
          </Button>

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

        <Button variant="contained" color="primary" onClick={() => getDogImages()}>
          違う画像にする
        </Button>
      </section>
    </main>
  );
}

