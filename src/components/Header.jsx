import React from "react";

const Header = ({ data }) => {
  return (
    <div className="w-full h-[55vh] flex overflow-hidden">
      {data.map((d, i) => (
        <div key={i} className="w-full relative overflow-hidden flex-shrink-0 ">
          <img
            className="w-full object-cover"
            src={`https://image.tmdb.org/t/p/original${
              d.backdrop_path || d.poster_path
            }`}
            alt={d.title || d.name || d.original_name || d.original_title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-20">
            <p className="text-white text-3xl font-bold mb-2">
              {d.title || d.name || d.original_name || d.original_title}
            </p>
            <h1 className="w-[60%] text-white text-xm mb-5">{d.overview}</h1>
            <p className="text-xm font-bold text-gray-300">
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
