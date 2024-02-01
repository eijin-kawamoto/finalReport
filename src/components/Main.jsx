import React, { useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";

const breeds = ["akita", "beagle", "frenchbulldog", "chihuahua", "husky", "toypoodle", "shiba"];

async function fetchDogImages(breed) {
    const url = `https://dog.ceo/api/breed/${breed}/images/random/`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`${breed} の画像を取得する際のエラー:`, error);
        throw error;
    }
}

export default function Main() {
    const [dogImages, setDogImages] = useState([]);

    useEffect(() => {
        const fetchAllDogImages = async () => {
            try {
                const dogImagesPromises = breeds.map(fetchDogImages);
                const dogData = await Promise.all(dogImagesPromises);
                console.log(dogData);

                const validDogData = dogData.filter(data => data && data.status !== 'error');
                const formattedDogImages = validDogData.map(data => ({
                    breed: data.message.split('/')[4],
                    imageUrl: data.message
                }));
                setDogImages(formattedDogImages);
            } catch (error) {
                console.error("fetchAllDogImages でエラーが発生しました:", error);
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
                            <div>
                                <img
                                    src={dogImage.imageUrl}
                                    alt={dogImage.breed}
                                    style={{ maxWidth: "100%", height: "auto" }}
                                />
                                <Typography variant="caption">{dogImage.breed}</Typography>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </section>
        </main>
    );
}
