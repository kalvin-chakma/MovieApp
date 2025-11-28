import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import axios from "../utils/Axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../components/Loader";

const Trending = () => {
  document.title = "Trending";

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTrending = async () => {
    try {
      const { data } = await axios.get(`/movie/trending?page=${page}`);
      console.log("API Response:", data);

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

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <div className="min-h-screen w-screen bg-black pt-5">
      <div className="lg:w-[70%] w-screen mx-auto">
        <div className="text-2xl md:text-4xl font-semibold text-gray-500 px-4 mb-4">
          Trending
        </div>

        <InfiniteScroll
          dataLength={movies.length}
          next={fetchTrending}
          hasMore={hasMore}
          loader={<Loader />}
          endMessage={
            <p className="text-white text-center py-4">
              No more trending content to load
            </p>
          }
        >
          <Cards data={movies} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Trending;
