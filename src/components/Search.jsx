import { useState } from "react";
import { TextField, Box, Button } from "@mui/material";

export default function Search({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <Box>
        <TextField
          label="Search Dog Breed"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};