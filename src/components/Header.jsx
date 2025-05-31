import React from "react";

const Header = ({ data }) => {
  return (
    <div className="w-full lg:h-[55vh] flex overflow-hidden">
      {data.map((d, i) => (
        <div key={i} className="w-full relative overflow-hidden flex-shrink-0 ">
          <img
            className="lg:w-full object-cover"
            src={`https://image.tmdb.org/t/p/original${
              d.backdrop_path || d.poster_path
            }`}
            alt={d.title || d.name || d.original_name || d.original_title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end lg:p-20 p-4">
            <p className="text-white lg:text-3xl text-2xl font-bold mb-2">
              {d.title || d.name || d.original_name || d.original_title}
            </p>

            <h1 className="w-[70%] lg:w-[60%] text-white text-sm lg:mb-5 text-justify">
              <span className="block sm:hidden">
                {d.overview?.slice(0, 150)}...
              </span>
              <span className="hidden sm:block">{d.overview}</span>
            </h1>
            <p className="text-xs lg:text-sm font-bold text-gray-300">
              <span className="mr-2">{d.release_date}</span>
              {d.media_type ? d.media_type.toUpperCase() : "Unknown"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Header;
