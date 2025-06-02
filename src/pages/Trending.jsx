import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import axios from "../utils/Axios";
import Loader from "../components/Loader";

const Trending = () => {
  document.title = "Trending";
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchTrending = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/trending/${category}/day?language=en-US`
      );
      console.log("API Response:", response.data);

      if (response.data?.results) {
        setMovies(response.data.results);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, [category]);

  return (
    <div className="min-h-screen w-screen bg-black pt-5">
      <div className="lg:w-[70%] w-screen mx-auto">
        <div className="flex justify-between items-center mb-4 px-4">
          <div className="text-2xl md:text-4xl font-semibold text-gray-500">
            Trending - {category.charAt(0).toUpperCase() + category.slice(1)}
          </div>
          <div>
            <select
              className="bg-gray-800 text-white text-sm p-1 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All</option>
              <option value="movie">Movie</option>
              <option value="tv">TV</option>
            </select>
          </div>
        </div>

        {loading ? <Loader /> : <Cards data={movies} />}
      </div>
    </div>
  );
};

export default Trending;
