import axios from "../utils/Axios";
import React, { useEffect, useState, useCallback } from "react";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchMovies = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const { data } = await axios.get(`/movie/popular?page=${page}`);
      setMovies((prev) => [...prev, ...data.results]);
      setHasMore(data.page < data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.scrollHeight &&
      hasMore &&
      !loading
    ) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="min-h-screen bg-black no-scrollbar">
      <div className="w-[70%] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 text-white p-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded shadow-md p-2 hover:scale-105 transition duration-200"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto rounded"
              />
              <h2 className="mt-2 text-lg font-semibold">{movie.title}</h2>
              <p className="text-sm text-gray-400">{movie.release_date}</p>
            </div>
          ))}
          {loading && <p className="col-span-full text-center">Loading...</p>}
          {!hasMore && !loading && (
            <p className="col-span-full text-center text-gray-400">
              No more movies.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Movie;
