import { fetchDogs } from "./fetchdogs";

export const fetchAndSet = async (type, setFunction) => {
    try {
      const data = await fetchDogs(type);
      setFunction(data);
    } catch (error) {
      console.log(error);
    }
  };