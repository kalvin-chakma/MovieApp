import React, { useEffect, useState } from "react";
import axios from "../utils/Axios.jsx";
import Sidebar from "../components/Sidebar.jsx";
import HorizontalCard from "../components/HorizontalCard.jsx";
import Loader from "../components/Loader.jsx";
import Header from "../components/Header.jsx";
import Topbar from "../components/Topbar.jsx";

const Home = () => {
  document.title = "Home";

  const [headerPoster, setHeaderPoster] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState({
    trending: [],
    upcoming: [],
    popular: [],
    topRated: [],
  });

  const [sidebarOpen, setSidebarOpen] = useState(false); // <-- For mobile drawer

  const categoryConfigs = [
    { key: "trending", url: "/trending/all/day", title: "Trending" },
    { key: "upcoming", url: "/movie/upcoming", title: "Upcoming" },
    { key: "popular", url: "/movie/popular", title: "Popular" },
    { key: "topRated", url: "/movie/top_rated", title: "Top Rated" },
  ];

  const fetchCategory = async (key, url) => {
    try {
      const { data } = await axios.get(url);
      setCategories((prev) => ({ ...prev, [key]: data.results }));
      return data.results;
    } catch (error) {
      console.error(`Error fetching ${key}:`, error);
      return [];
    }
  };

  const getHeaderPoster = async () => {
    try {
      const { data } = await axios.get("/trending/all/day");
      const randomIndex = Math.floor(Math.random() * data.results.length);
      setHeaderPoster(data.results[randomIndex]);
    } catch (error) {
      console.error("Error fetching header poster:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getHeaderPoster();
      await Promise.all(
        categoryConfigs.map(({ key, url }) => fetchCategory(key, url))
      );
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row h-screen w-full">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 h-full text-white overflow-auto no-scrollbar relative pb-10">
          <Topbar />

          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Header data={[headerPoster]} />
              {categoryConfigs.map(({ key, title }) => (
                <div className="mx-4 sm:mx-6">
                  <HorizontalCard
                    key={key}
                    title={title}
                    data={categories[key]}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
