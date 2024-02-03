import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Button, TextField, Autocomplete } from "@mui/material";

const breedTranslations = {
  akita: "秋田犬",
  beagle: "ビーグル",
  chihuahua: "チワワ",
  husky: "シベリアンハスキー",
  pug: "パグ",
  shihtzu: "シーズー",
  dachshund: "ダックスフンド",
  chow: "チャウチャウ",
  dalmatian: "ダルメシアン",
  doberman: "ドーベルマン",
};

const dogBreeds = ["akita", "beagle", "chihuahua", "husky", "pug", "shihtzu"];
const searchDogBreeds = ["dachshund", "chow", "dalmatian", "doberman"];

export default function Main() {
  const [dogImages, setDogImages] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");

  const getDogImages = async (breed) => {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    const data = await response.json();
    return { breed, imageUrl: data.message };
  };

  const getRandomImage = async () => {
    if (selectedBreed) {
      const image = await getDogImages(selectedBreed);
      setDogImages([image]);
    } else {
      alert("犬種を選択してください。");
    }
  };

  useEffect(() => {
    const initialImagesPromises = initialDogBreeds.map(async (breed) => {
      return getDogImages(breed);
    });

    Promise.all(initialImagesPromises).then((resolvedDogImages) => {
      setDogImages(resolvedDogImages);
    });
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
          <Autocomplete
            options={searchDogBreeds}
            renderInput={(params) => (
              <TextField
                {...params}
                label="犬種を選択"
                variant="outlined"
                value={selectedBreed}
                onChange={(e) => setSelectedBreed(e.target.value)}
              />
            )}
          />

          <Button variant="contained" color="primary" onClick={getRandomImage} style={{ marginTop: "16px" }}>
            ランダムな犬種の画像を表示
          </Button>
        </Box>

        <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
          違う画像にする
        </Button>
      </section>
    </main>
  );
}
