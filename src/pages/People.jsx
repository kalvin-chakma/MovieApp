import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import axios from "../utils/Axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../components/Loader";
import PageHeader from "../components/PageHeader";

const People = () => {
  document.title = "People";

  const [loading, setLoading] = useState(true);
  const [peoples, setPeoples] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPeoples = async () => {
    try {
      const { data } = await axios.get(
        `/person/popular?language=en-US&page=${page}`
      );
      console.log("people api", data);

      if (data.results?.length > 0) {
        setPeoples((prev) => [...prev, ...data.results]);
        setHasMore(page < data.total_pages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching peoples:", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchPeoples().then(() => setLoading(false));
  }, []);

  const loadMore = () => setPage((prev) => prev + 1);

  useEffect(() => {
    if (page !== 1) fetchPeoples();
  }, [page]);

  return (
    <div className="min-h-screen w-screen bg-black">
      <div className="lg:w-[70%] w-full mx-auto px-4 md:px-6 py-5">
        <PageHeader title="People" showBack={true} />

        {loading ? (
          <div className="text-white p-5">
            <Loader />
          </div>
        ) : (
          <InfiniteScroll
            dataLength={peoples.length}
            next={loadMore}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            }
            endMessage={
              <p className="text-white text-center py-4">
                No more people to load
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
