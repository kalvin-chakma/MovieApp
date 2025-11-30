import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import axios from "../utils/Axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../components/Loader";
import GenreFilter from "../utils/GenreFilter";
import PageHeader from "../components/PageHeader";

const Movie = () => {
  document.title = "Movie";

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get(`/movie/now_playing?page=${page}`);
      console.log("api", data);

      if (data.results?.length > 0) {
        setMovies((prev) => [...prev, ...data.results]);
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
    const delay = setTimeout(() => {
      fetchMovies().then(() => setLoading(false));
    }, 1500);

    return () => clearTimeout(delay);
  }, []);

  const loadMore = () => setPage((prev) => prev + 1);

  useEffect(() => {
    if (page !== 1) fetchMovies();
  }, [page]);

  const getFilteredMovies = () => {
    if (!selectedGenre) return movies;
    return movies.filter((movie) => movie.genre_ids?.includes(selectedGenre));
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-zinc-900 via-black to-black">
      <div className="lg:w-[85%] xl:w-[80%] w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <PageHeader
          title="Movies"
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
              <p className="text-zinc-500 text-center py-8 text-sm">
                You've reached the end
              </p>
            }
          >
            <Cards data={getFilteredMovies()} media_type="movie" />
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default Movie;
