import React from "react";
import { data, Link } from "react-router-dom";

const Cards = ({ data, media_type }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 text-white p-4">
      {data.map((d, i) => (
        <Link
          key={i}
          to={`/${media_type || d.media_type}/${d.id}`}
          className="bg-black rounded shadow-md hover:scale-105 transition duration-200"
        >
          <div className="w-full aspect-[2/3] overflow-hidden rounded">
            <img
              src={`https://image.tmdb.org/t/p/w500${
                d.poster_path || d.profile_path
              }`}
              alt={d.title || d.name || "Media Poster"}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="py-2">
            <h2 className="text-sm md:text-base font-semibold line-clamp-1">
              {d.title || d.name || d.original_name}
            </h2>
            <p className="text-xs text-gray-400">
              {d.release_date || d.first_air_date}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Cards;
