import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Gallery from "./Gallery";
import Search from "./Search";
import { fetchAndSet } from "../fetch/fetchAndSet";
import { fetchDogs } from "../fetch/fetchdogs";

export default function Main() {
  const [dogImageUrl, setDogImageUrl] = useState("");

    const fetchData = async(query) => {
      try {
        let data;

        if(query) {
          data = await fetchDogs(query);
        } else {
          const response = await fetch("https://dog.ceo/api/breed/dog/images/random/");
          data = await response.json();
        }

      setDogImageUrl(data.message || data);
      } catch(error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(() => {
      fetchData();
    },[]);

    const handleSearch = async(query) => {
      fetchData(query);
    };
    
  return (
    <main>
      <section className="section">
        <Search onSearch={handleSearch} />
        <Gallery imageUrl={dogImageUrl} />
      </section>
    </main>
  );
}