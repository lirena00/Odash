import { GoogleIcon } from "@/components/Icons/GoogleIcon";
import { BingIcon } from "@/components/Icons/BingIcon";
import { DuckDuckGoIcon } from "@/components/Icons/DuckDuckGoIcon";
import { PerplexityIcon } from "@/components/Icons/PerplexityIcon";
import { useSettings } from "@/contexts/SettingsContext";
import React, { useState } from "react";

export const SearchDimensions = {
  x: 0,
  y: 0,
  w: 7,
  h: 2,
  minW: 4,
  minH: 2,
  maxW: 7,
  maxH: 3,
};

const Search = () => {
  const { settings } = useSettings();
  const searchEngine = settings.searchEngine;
  const theme = settings.theme;
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() === "") return; // Prevent search if query is empty
    let searchUrl = "";
    switch (searchEngine) {
      case "google":
        searchUrl = `https://www.google.com/search?q=${query}`;
        break;
      case "bing":
        searchUrl = `https://www.bing.com/search?q=${query}`;
        break;
      case "duckduckgo":
        searchUrl = `https://duckduckgo.com/?q=${query}`;
        break;
      case "perplexity":
        searchUrl = `https://www.perplexity.ai/search?q=${query}`;
        break;
    }
    window.location.href = searchUrl;
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && query.trim() !== "") {
      handleSearch();
    }
  };

  return (
    <div
      className={`widget w-full h-full flex gap-2 rounded-md ${
        theme === "dark"
          ? "dark"
          : theme === "light"
          ? "light"
          : "bg-accent text-solid-text"
      } `}
    >
      <div className="text-2xl grid place-items-center w-fit px-2 py-1">
        {searchEngine === "google" ? (
          <GoogleIcon />
        ) : searchEngine === "bing" ? (
          <BingIcon />
        ) : searchEngine === "duckduckgo" ? (
          <DuckDuckGoIcon />
        ) : (
          <PerplexityIcon />
        )}
      </div>
      <input
        type="text"
        className={`w-full bg-transparent outline-none px-1 placeholder:text-white/50`}
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={handleKeyPress}
      />
    </div>
  );
};

export default Search;
