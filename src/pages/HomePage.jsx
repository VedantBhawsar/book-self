import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (search.length > 2) {
        const redirectUrl = `/search?q=${search}`;
        navigate(redirectUrl);
      }
    }
  };

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (search.length > 2) {
        const redirectUrl = `/search?q=${search}`;
        navigate(redirectUrl);
      }
    }, 1000);
    return () => clearTimeout(searchTimeout);
  }, [search, navigate]);
  
  return (
    <main className="flex flex-col items-center justify-center h-[86vh] gap-7">
      <h2 className="text-3xl font-bold text-white">Search book here</h2>
      <input
        type="text"
        name="search"
        id="search"
        className="py-[0.80rem] px-5 w-80 rounded-md"
        placeholder="Search a book"
        onKeyDown={handleKeyDown}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </main>
  );
};

export default HomePage;
