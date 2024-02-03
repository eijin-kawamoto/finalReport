import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Button, TextField, Autocomplete } from "@mui/material";

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
  labrador: "ラブラドールレトリバー"
};

const dogBreeds = ["akita", "beagle", "chihuahua", "husky", "pug", "shihtzu"];
const selectBreeds = ["doberman", "chow", "dachshund", "dalmatian", "labrador"]

export default function Main() {
  const [dogImages, setDogImages] = useState([]);
  const [randomImage, setRandomImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
    const searchBreed = searchTerm.toLowerCase();

    if (searchBreed && !dogBreeds.includes(searchBreed)) {
      const response = await fetch(`https://dog.ceo/api/breed/${searchBreed}/images/random`);
      const data = await response.json();
      setDogImages([{ breed: searchBreed, imageUrl: data.message }]);
    } else {
      console.warn(`"${searchTerm}" is one of the default breeds. Please enter a different breed.`);
    }
  };

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
          <Autocomplete
            options={selectBreeds}
            renderInput={(params) => (
              <TextField
                {...params}
                label="犬種を入力"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            )}
          />

          <Button variant="contained" color="primary" style={{ marginTop: 2 }} onClick={getRandomImage}>
            ランダムな犬種の画像を表示
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

        <Button variant="contained" color="primary" onClick={getDogImages}>
          違う画像にする
        </Button>
      </section>
    </main>
  );
}
