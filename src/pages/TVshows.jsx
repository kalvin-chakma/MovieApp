import React, { useEffect, useState } from "react";
import axios from "../utils/Axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "../components/Cards";

const TVshows = () => {
  const [tvshows, setTvshows] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTvshows = async () => {
    try {
      const { data } = await axios.get(
        `tv/airing_today?language=en-US&page=${page}`
      );
      console.log("api", data);

      if (data.results?.length > 0) {
        setTvshows((prev) => [...prev, ...data.results]);
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
    fetchTvshows();
  }, [page]);

  return (
    <div className="min-h-screen w-screen bg-black pt-5">
      <div className="lg:w-[70%] w-screen mx-auto">
        <div className="text-2xl md:text-4xl font-semibold text-gray-500 px-4 md:px-6">
          TV Shows
        </div>

        <InfiniteScroll
          dataLength={tvshows.length}
          next={fetchTvshows}
          hasMore={hasMore}
          loader={<h4 className="text-white text-center py-4">Loading...</h4>}
          endMessage={
            <p className="text-white text-center py-4">
              No more movies to load
            </p>
          }
        >
          <Cards data={tvshows} media_type={"tv"} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default TVshows;
