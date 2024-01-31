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
          const searchData = await fetchAndSet(`/api/breed/${query}/images/random`, setDogType);
          setSearchedDogType(query);
        } else {
          const dogData = await fetchAndSet('/api/breed/dog/images/random', setDog);
          const dogTypeData = await fetchAndSet('/api/breed/dogtype/images/random', setDogType);
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