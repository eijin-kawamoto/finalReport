import { useEffect, useState } from "react";
import Gallery from "./Gallery";
import { fetchAndSet } from "../fetch/fetchAndSet";

export default function Main() {
    const [dog, setDog] = useState([]);
    const [dogtype, setDogType] = useState([]);

    const fetchData = async() => {
        await fetchAndSet("dog", setDog);
        await fetchAndSet("dogtype", setDogType);
    };

    useEffect(() => {
        (async () => {
            await fetchData();
        })();
    },[]);
    
  return (
    <main>
      <section className="section">
          <Gallery />
      </section>
    </main>
  );
}