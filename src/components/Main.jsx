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
      try {
        if(query) {
          const dogTypeData = await fetchAndSet(`dogtype/${query}`);
          setDogType(dogTypeData);
          setSearchedDogType(query);
        } else {
          const dogData = await fetchAndSet("dog");
          setDog(dogData);
          await fetchAndSet("dogtype", setDogType);
          setSearchedDogType("");
        }
      } catch(error) {
        console.error("Error fetching data:", error);
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
        <Gallery dog={dogtype} />
      </section>
    </main>
  );
}