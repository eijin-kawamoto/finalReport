import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Button, Select, 
  InputLabel, FormControl, MenuItem } from "@mui/material";

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
  shiba: "柴犬",
  dalmatian: "ダルメシアン",
  labrador: "ラブラドールレトリバー",
  mix: "ミックス",
  pomeranian: "ポメラニアン",
  papillon: "パピヨン"
};

const defaultBreeds = ["akita", "beagle", "chihuahua", "husky", "pug", "shihtzu"];
const selectableBreeds = ["doberman", "chow", "dachshund", "shiba",
 "dalmatian", "labrador", "mix", "pomeranian", "papillon"];

export default function Main() {
  const [defaultDogImages, setDefaultDogImages] = useState([]);
  const [selectedDogImage, setSelectedDogImage] = useState(null);
  const [selectedBreed, setSelectedBreed] = useState("");

  const getDogImages = async () => {
    const initialImagesPromises = defaultBreeds.map((breed) => getDogImage(breed));
    const resolvedImages = await Promise.all(initialImagesPromises);
    setDefaultDogImages(resolvedImages);
  };

  const getDogImage = async (breed) => {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    const data = await response.json();
    return { breed, imageUrl: data.message };
  };

  const getRandomImage = async () => {
    const newImage = await getDogImage(selectedBreed);
    setSelectedDogImage(newImage);
  };

  useEffect(() => {
    getDogImages();
  }, []);


  return (
    <main>
      <section className="section" style={{ textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          6つの犬種のフリー画像を表示します。
        </Typography>
        <Typography variant="h5" gutterBottom>
        下のボタンを押すことで画像を変更できます。
        </Typography>
        <Typography variant="h5" gutterBottom>
          選択用フォームから表示したい犬種を選んで表示することもできる！
        </Typography>

        <Grid container spacing={2}>
          {defaultDogImages.map((dogImage, index) => (
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

          {selectedDogImage && (
            <Box display="flex" flexDirection="column" alignItems="center" marginTop={2}>
              <img
                src={selectedDogImage.imageUrl}
                alt={`Random ${breedTranslations[selectedDogImage.breed]}`}
                style={{ width: "auto", maxWidth: "250px", height: "auto", maxHeight: "250px" }}
              />
              <Typography variant="h4">{breedTranslations[selectedDogImage.breed]}</Typography>
            </Box>
          )}
        </Box>

        <Button variant="contained" color="primary" onClick={getDogImages}>
          違う画像にする
        </Button>
      </section>
    </main>
  );
}
