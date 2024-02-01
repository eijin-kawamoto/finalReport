import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Gallery from "./Gallery";
import Search from "./Search";

async function fetchDogData(type) {
    const url = `https://dog.ceo/api/breed/${type}/images/random/`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export default function Main() {
    const [dog, setDog] = useState([]);
    const [dogtype, setDogType] = useState([]);
    const [searchedDogType, setSearchedDogType] = useState("");

    const fetchData = async (query) => {
        try {
            if (query) {
                const searchData = await fetchDogData(query);
                if(searchData.status === "error") {
                    console.warn("Dog not found:", searchData.message);
                    setDogType(null);
                    setSearchedDogType(query);
                } else {
                    setDogType(searchData);
                    setSearchedDogType(query);
                }
            } else {
                const dogData = await fetchAndSet("dog");
                setDog(dogData);
                await fetchAndSet("dogtype", setDogType);
                setSearchedDogType("");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        (async () => {
            await fetchData();
        })();
    }, []);

    const handleSearch = async (query) => {
        await fetchData(query);
    };

    return (
        <main>
            <section className="section">
                <Search onSearch={handleSearch} />
                <Gallery imageUrl={dogtype.message} />
            </section>
        </main>
    );
}
