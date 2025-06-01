import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import axios from "../utils/Axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../components/Loader"; // Added missing import

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState(""); // Added query state
  const [isSearching, setIsSearching] = useState(false);

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get(`/movie/popular?page=${page}`);
      console.log("api", data);
      if (data.results?.length > 0) {
        setMovies((prev) => [...prev, ...data.results]);
        setPage((prev) => prev + 1);
        setHasMore(page < data.total_pages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setHasMore(false);
    }
  };

  const searchMovies = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const { data } = await axios.get(
        `/search/movie?query=${encodeURIComponent(searchQuery)}&page=1`
      );
      console.log("search results", data);
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Error searching movies:", error);
      setSearchResults([]);
    }
  };

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchMovies(query);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    if (!query) {
      fetchMovies();
    }
  }, []);

  const handleClearSearch = () => {
    setQuery("");
    setSearchResults([]);
    setIsSearching(false);
  };

  // Determine which data to display
  const displayData = query ? searchResults : movies;
  const shouldShowInfiniteScroll = !query && !isSearching;

  return (
    <div className="min-h-screen w-screen bg-black pt-5">
      <div className="lg:w-[70%] w-screen mx-auto">
        <div className="flex gap-4 mb-6">
          <div className="text-2xl md:text-4xl font-semibold text-gray-500 px-4 md:px-6">
            Movies
          </div>
          <div className="flex items-center rounded-lg shadow-md bg-zinc-950 w-full">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              className="w-full h-10 bg-zinc-950 pl-2 text-[#cccccc] outline-none rounded-md"
              placeholder="Search movies..."
            />
            {query.length > 0 && (
              <span
                className="mr-4 cursor-pointer text-gray-400 hover:text-white"
                onClick={handleClearSearch}
              >
                <i className="ri-close-fill"></i>
              </span>
            )}
          </div>
        </div>

        {/* Show search results count */}
        {query && (
          <div className="px-4 mb-4">
            <p className="text-gray-400 text-sm">
              {isSearching
                ? "Searching..."
                : `Found ${searchResults.length} results for "${query}"`}
            </p>
          </div>
        )}

        {/* Conditional rendering based on search state */}
        {shouldShowInfiniteScroll ? (
          <InfiniteScroll
            dataLength={movies.length}
            next={fetchMovies}
            hasMore={hasMore}
            loader={<h4 className="text-white text-center py-4">Loading...</h4>}
            endMessage={
              <p className="text-white text-center py-4">
                No more movies to load
              </p>
            }
          >
            <Cards data={displayData} media_type={"movie"} />
          </InfiniteScroll>
        ) : (
          <div>
            <Cards data={displayData} media_type={"movie"} />
            {query && searchResults.length === 0 && !isSearching && (
              <p className="text-white text-center py-8">
                No movies found for "{query}"
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Movie;
