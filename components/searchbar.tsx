"use client";

import { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  return (
    <div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h1>You typed: {search}</h1>
    </div>
  );
};

export default SearchBar;
