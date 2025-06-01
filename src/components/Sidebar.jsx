// Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`
        bg-[#5865F2] h-screen flex flex-col items-center fixed lg:static top-0 left-0 z-50 
        w-64 lg:w-[5%] transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
      `}
    >
      {/* Close button for small screens */}
      <div className="w-full flex justify-end lg:hidden p-4">
        <button onClick={onClose} className="text-white text-2xl">
          ✖
        </button>
      </div>

      <h1 className="text-white text-xl mt-2 mb-5 flex flex-col items-center">
        <i className="text-4xl ri-movie-fill"></i>
        <span className="text-xs font-semibold">MOVIES</span>
      </h1>

      <nav className="flex flex-col w-full">
        {[
          { to: "/", icon: "ri-home-4-fill", label: "Home" },
          { to: "/movies", icon: "ri-clapperboard-fill", label: "Movies" },
          { to: "/tvshows", icon: "ri-tv-fill", label: "TV+" },
          { to: "/trending", icon: "ri-fire-fill", label: "Trending" },
          { to: "/path4", icon: "ri-bard-fill", label: "Popular" },
          { to: "/path3", icon: "ri-sparkling-2-fill", label: "Top Rated" },
          { to: "/path7", icon: "ri-team-fill", label: "People" },
        ].map(({ to, icon, label }) => (
          <Link
            key={label}
            to={to}
            className="text-white text-xl flex flex-col items-center w-full py-2 hover:bg-black hover:text-white transition-colors"
          >
            <i className={icon}></i>
            <span className="text-xs font-semibold">{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
