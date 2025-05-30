import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/Axios";
import noImage from "../assets/no-image.jpg";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const getSearch = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results || []);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  useEffect(() => {
    getSearch();
  }, [query]);

  return (
    <div className="flex items-center w-[50%] justify-center relative">
      <div className="flex items-center rounded-lg shadow-md bg-zinc-950 w-full">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className="w-full h-10 bg-zinc-950 pl-2 text-[#cccccc] outline-none rounded-md"
          placeholder="Search..."
        />
        {query.length > 0 && (
          <span
            className="mr-4 cursor-pointer"
            onClick={() => {
              setQuery("");
            }}
          >
            <i className="ri-close-fill"></i>
          </span>
        )}
      </div>
      {searches.length > 0 && (
        <div className="bg-zinc-900 max-h-[50vh] w-full absolute top-[100%] overflow-auto no-scrollbar z-20">
          {searches.map((s, i) => (
            <Link
              to={`/details/${s.id}`}
              key={i}
              className="w-full bg-zinc-900 p-4 flex items-center border-b border-zinc-600 hover:bg-zinc-950 hover:text-zinc-300"
            >
              <img
                className="w-14 h-14 object-cover rounded-md mr-5"
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.profile_path
                      }`
                    : noImage
                }
                alt="thumbnail"
              />
              <span>
                {s.name || s.title || s.original_name || s.original_title}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
