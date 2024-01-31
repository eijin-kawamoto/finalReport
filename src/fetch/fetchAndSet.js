export const fetchAndSet = async (url, setFunction) => {
    try {
      const response = await fetch(url);
      if(!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
      }

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setFunction(data.message);
      } else {
        throw new Error(`Invalid response format form ${url}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  