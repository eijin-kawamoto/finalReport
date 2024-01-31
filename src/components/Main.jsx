import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Gallery from "./Gallery";
import Search from "./Search";
import { fetchAndSet } from "../fetch/fetchAndSet";

export default function Main() {
  const [dogImageUrl, setDogImageUrl] = useState("");

    const fetchData = async(query) => {
      try {
        const url = query
          ? `/api/breed/${query}/images/random`
          : "/api/breed/dog/images/random";

      const data = await fetchAndSet(url, setDogImageUrl);
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