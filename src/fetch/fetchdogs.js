export const fetchDogs = async (type) => {
    const response = await fetch(`https://dog.ceo/api/breed/${type}/images/random/`);
    const data = await response.json();
    return data;
  };