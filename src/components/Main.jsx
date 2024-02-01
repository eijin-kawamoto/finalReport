import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Gallery from "./Gallery";

export default function Main() {
    const [dogImages, setDogImages] = useState([]);

    const fetchAllDogImages = async () => {
        try {
            const dogBreeds = ["beagle", "bulldog", "chihuahua", "dachshund", "germanshepherd", 
            "goldenretriever", "poodle", "pug", "siberianhusky", "boxer"];

            const dogImagesPromises = dogBreeds.map(async (breed) => {
                const response = await fetch(`/api/dog/${breed}`);
                if(!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                return { breed, imageUrl: data.message };
        });

        const resolvedDogImages = await Promise.all(dogImagesPromises);
      setDogImages(resolvedDogImages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

    useEffect(() => {
        (async () => {
            await fetchAllDogImages();
        })();
    }, []);

    return (
        <main>
            <section className="section">
                <Typography variant="h4" gutterBottom>
                    Dog Gallery
                </Typography>
                <Grid container spacing={2}>
                    {dogImages.map((dogImage,index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Gallery imageUrl={dogImage.imageUrl} breed={dogImage.breed} />
                        </Grid>
                    ))}
                </Grid>
            </section>
        </main>
    );
}
