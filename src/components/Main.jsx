import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Button, Select, InputLabel, FormControl, MenuItem } from "@mui/material";

const breedTranslations = {
  akita: "秋田犬",
  beagle: "ビーグル",
  chihuahua: "チワワ",
  husky: "シベリアンハスキー",
  pug: "パグ",
  shihtzu: "シーズー",
  doberman: "ドーベルマン",
  chow: "チャウチャウ",
  dachshund: "ダックスフンド",
  dalmatian: "ダルメシアン",
  labrador: "ラブラドールレトリバー",
};

const defaultBreeds = ["akita", "beagle", "chihuahua", "husky", "pug", "shihtzu"];
const selectableBreeds = ["doberman", "chow", "dachshund", "dalmatian", "labrador"];

export default function Main() {
  const [dogImages, setDogImages] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("akita");

  const getDogImages = async () => {
    const dogImagesPromises = defaultBreeds.map(async (breed) => {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
      const data = await response.json();
      return { breed, imageUrl: data.message };
    });

    const resolvedDogImages = await Promise.all(dogImagesPromises);
    setDogImages(resolvedDogImages);
  };

  const getRandomImage = async () => {
    const response = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`);
    const data = await response.json();
    setDogImages([...dogImages, { breed: selectedBreed, imageUrl: data.message }]);
  };

  useEffect(() => {
    getDogImages();
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
          <FormControl variant="outlined">
            <InputLabel id="select-breed-label">犬種を選択</InputLabel>
            <Select
              labelId="select-breed-label"
              id="select-breed"
              value={selectedBreed}
              onChange={(e) => setSelectedBreed(e.target.value)}
              label="犬種を選択"
            >
              {selectableBreeds.map((breed) => (
                <MenuItem key={breed} value={breed}>
                  {breedTranslations[breed]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" onClick={getRandomImage} style={{ marginTop: 2 }}>
            選択された犬種の画像を表示
          </Button>
        </Box>
      </section>
    </main>
  );
}
