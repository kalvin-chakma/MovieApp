import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Movie from "./pages/Movie";

export default function App() {
  return (
    <div className="w-screen h-screen bg-[#101010] flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movie />} />
      </Routes>
    </div>
  );
}
