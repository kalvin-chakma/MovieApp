import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import axios from "../utils/Axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../components/Loader";

const People = () => {
  document.title = "Popular People";

  const [loading, setLoading] = useState(true);
  const [peoples, setPeoples] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPeoples = async () => {
    try {
      const { data } = await axios.get(
        `/person/popular?language=en-US&page=${page}`
      );
      console.log("api", data);

      if (data.results?.length > 0) {
        setPeoples((prev) => [...prev, ...data.results]);
        setHasMore(page < data.total_pages);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching Peoples:", error);
      setHasMore(false);
    }
  };

  // Fixed: Added empty dependency array to run only once on mount
  useEffect(() => {
    fetchPeoples().then(() => setLoading(false));
  }, []);

  // Removed the duplicate useEffect that was causing infinite loop
  useEffect(() => {
    if (page !== 1) fetchPeoples();
  }, [page]);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-zinc-900 via-black to-black">
      <div className="lg:w-[85%] xl:w-[80%] w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-2xl md:text-4xl font-semibold text-zinc-400 px-2 mb-6">
          Popular People
        </div>

        {loading ? (
          <div className="text-white p-5">
            <Loader />
          </div>
        ) : (
          <InfiniteScroll
            dataLength={peoples.length}
            next={fetchPeoples}
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
            <Cards data={peoples} media_type="person" />
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default People;
