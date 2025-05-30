import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-[#5865F2] w-[6%] h-screen flex flex-col items-center">
      <h1 className="text-white text-xl mt-2 mb-5 flex flex-col items-center">
        <i className="text-4xl ri-movie-fill"></i>
        <span className="text-xs font-semibold">MOVIES</span>
      </h1>
      <nav className="flex flex-col w-full">
        <Link
          to="/"
          className="text-white text-xl flex flex-col items-center w-full py-2 hover:bg-black hover:text-white transition-colors"
        >
          <i className="ri-home-4-fill"></i>
          <span className="text-xs font-semibold">Home</span>
        </Link>
        <Link
          to="/movies"
          className="text-white text-xl flex flex-col items-center w-full py-2 hover:bg-black hover:text-white transition-colors"
        >
          <i className="ri-clapperboard-fill"></i>
          <span className="text-xs font-semibold">Movies</span>
        </Link>
        <Link
          to="/path3"
          className="text-white text-xl flex flex-col items-center w-full py-2 hover:bg-black hover:text-white transition-colors"
        >
          <i className="ri-movie-2-line"></i>
          <span className="text-xs font-semibold">Series</span>
        </Link>
        <Link
          to="/path4"
          className="text-white text-xl flex flex-col items-center w-full py-2 hover:bg-black hover:text-white transition-colors"
        >
          <i className="ri-slideshow-3-fill"></i>
          <span className="text-xs font-semibold">Cartoons</span>
        </Link>
        <Link
          to="/path5"
          className="text-white text-xl flex flex-col items-center w-full py-2 hover:bg-black hover:text-white transition-colors"
        >
          <i className="ri-tv-fill"></i>
          <span className="text-xs font-semibold">TV+</span>
        </Link>
        <Link
          to="/path6"
          className="text-white text-xl flex flex-col items-center w-full py-2 hover:bg-black hover:text-white transition-colors"
        >
          <i className="ri-folder-4-fill"></i>
          <span className="text-xs font-semibold">Category</span>
        </Link>
        <Link
          to="/path7"
          className="text-white text-xl flex flex-col items-center w-full py-2 hover:bg-black hover:text-white transition-colors"
        >
          <i className="ri-star-fill"></i>
          <span className="text-xs font-semibold">Popular</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
