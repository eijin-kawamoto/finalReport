import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Gallery from "./Gallery";

async function fetchDogData(type) {
    const url = `https://dog.ceo/api/breed/${type}/images/random/`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching dog data:", error);
        return null;
    }
}
export default function Main() {
    const [dogImages, setDogImages] = useState([]);
    useEffect(() => {
        const fetchAllDogImages = async () => {
            const dogBreeds = ["beagle", "bulldog", "chihuahua", "dachshund", 
            "germanshepherd", "goldenretriever", "poodle", "pug", "siberianhusky", "boxer"];
            try {
                const dogImagesPromises = dogBreeds.map(fetchDogData);
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
                            <Gallery imageUrl={dogImage.imageUrl} breed={dogImage.breed} />
                        </Grid>
                    ))}
                </Grid>
            </section>
        </main>
    );
}
