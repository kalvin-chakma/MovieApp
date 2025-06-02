import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import TVshows from "./pages/TVshows";
import Details from "./pages/Details";
import Trending from "./pages/Trending";
import Popular from "./pages/Popular";
import TopRated from "./pages/TopRated";

export default function App() {
  return (
    <div className="w-screen h-screen bg-[#101010] flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/tvshows" element={<TVshows />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/:type/:id" element={<Details />} />
      </Routes>
    </div>
  );
}
