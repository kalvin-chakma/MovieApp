import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import axios from "../utils/Axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { data } from "react-router-dom";

const Popular = () => {
  document.title = "Popular";
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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

  useEffect(() => {
    fetchMovies();
  }, [page]);
  if (!data)
    return (
      <div className="text-white p-5">
        <Loader />
      </div>
    );

  return (
    <div className="min-h-screen w-screen bg-black pt-5">
      <div className="lg:w-[70%] w-screen mx-auto">
        <div className="text-2xl md:text-4xl font-semibold text-gray-500 px-4 md:px-6">
          Popular
        </div>

        <InfiniteScroll
          dataLength={movies.length}
          next={fetchMovies}
          hasMore={hasMore}
          loader={<h4 className="text-white text-center py-4"></h4>}
          endMessage={
            <p className="text-white text-center py-4">
              No more movies to load
            </p>
          }
        >
          <Cards data={movies} media_type={"movie"} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Popular;
