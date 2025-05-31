import React from "react";
import { Link } from "react-router-dom";

const HorizontalCard = ({ title, data }) => {
  return (
    <div className="mx-4 sm:mx-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl text-zinc-400 my-4 font-semibold">
        {title}
      </h1>
      <div className="overflow-x-auto overflow-y-hidden no-scrollbar">
        <div className="flex gap-3">
          {data.map((d, i) => (
            <Link
              key={i}
              className="min-w-[35%] sm:min-w-[35%] md:min-w-[10%] h-[20vh] md:h-[30vh] relative rounded-md overflow-hidden"
            >
              <img
                className="w-full h-full object-cover"
                src={`https://image.tmdb.org/t/p/original${
                  d.backdrop_path || d.poster_path
                }`}
                alt={d.title || d.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent ">
                <h1 className="text-white text-xs sm:text-sm font-semibold truncate absolute bottom-7 left-3 right-3">
                  {d.title || d.name}
                </h1>
                <p className="text-[10px] sm:text-xs absolute bottom-3 left-3 right-3 text-gray-300">
                  <span className="mr-2">{d.release_date}</span>
                  {d.media_type?.toUpperCase()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;
