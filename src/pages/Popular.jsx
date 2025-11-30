import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import axios from "../utils/Axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../components/Loader";
import PageHeader from "../components/PageHeader";
import GenreFilter from "../utils/GenreFilter";

const Popular = () => {
  document.title = "Popular";

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get(`/movie/popular?page=${page}`);
      console.log("popular api", data);

      if (data.results?.length > 0) {
        setMovies((prev) => [...prev, ...data.results]);
        setHasMore(page < data.total_pages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching popular movies:", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchMovies().then(() => setLoading(false));
  }, []);

  const loadMore = () => setPage((prev) => prev + 1);

  useEffect(() => {
    if (page !== 1) fetchMovies();
  }, [page]);

  return (
    <div className="min-h-screen w-screen bg-black">
      <div className="lg:w-[70%] w-full mx-auto px-4 md:px-6 py-5">
        <PageHeader
          title="Popular Movies"
          showBack={true}
          rightContent={
            <GenreFilter
              selectedGenre={selectedGenre}
              onGenreChange={setSelectedGenre}
            />
          }
        />

        {loading ? (
          <div className="text-white p-5">
            <Loader />
          </div>
        ) : (
          <InfiniteScroll
            dataLength={movies.length}
            next={loadMore}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            }
            endMessage={
              <p className="text-white text-center py-4">
                No more movies to load
              </p>
            }
          >
            <Cards data={movies} media_type="movie" />
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default Popular;
