import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Gallery from "./Gallery";
import Search from "./Search";
import { fetchAndSet } from "../fetch/fetchAndSet";

export default function Main() {
    const [dog, setDog] = useState([]);
    const [dogtype, setDogType] = useState([]);
    const [searchedDogType, setSearchedDogType] = useState("");

    const fetchData = async(query) => {
      if(query) {
        await fetchAndSet(`dogtype/${query}`, setDogType);
        setSearchedDogType(query);
      } else {
        await fetchAndSet("dog", setDog);
        await fetchAndSet("dogtype", setDogType);
        searchedDogType("");
      }
    };

    useEffect(() => {
        (async () => {
            await fetchData();
        })();
    },[]);

    const handleSearch = async(query) => {
      await fetchData(query);
    };
    
  return (
    <main>
      <section className="section">
        <Search onSearch={handleSearch} />
        <Gallery dog={dog} />
      </section>
    </main>
  );
}