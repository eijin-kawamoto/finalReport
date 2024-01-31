export const fetchAndSet = async (url, setFunction) => {
    try {
      const response = await fetch(url);
      if(!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
      }
      const data = await response.json();
      setFunction(data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  