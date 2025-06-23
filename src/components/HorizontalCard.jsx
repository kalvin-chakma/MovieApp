import React from "react";
import { Link } from "react-router-dom";
import noImage from "../assets/no-image.jpg";

const HorizontalCard = ({ title, data }) => {
  return (
    <div className="">
      <h1 className="text-xl sm:text-2xl md:text-3xl text-zinc-400 my-4 font-semibold">
        {title}
      </h1>

      <div className="overflow-x-auto overflow-y-hidden no-scrollbar">
        <div className="flex gap-4">
          {data.map((d, i) => (
            <Link
              key={i}
              to={`/${d.media_type || "movie"}/${d.id}`}
              className="min-w-[50vw] sm:min-w-[30vw] md:min-w-[25vw] lg:min-w-[10vw] h-[34vw] sm:h-[26vw] md:h-[20vw] lg:h-[18vw] max-h-[250px] relative rounded-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <img
                className="w-full h-full object-cover"
                src={
                  d.backdrop_path || d.poster_path
                    ? `https://image.tmdb.org/t/p/original${
                        d.backdrop_path || d.poster_path
                      }`
                    : noImage
                }
                alt={d.title || d.name || "Media"}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                <h1 className="text-white text-sm sm:text-xs lg:text-sm font-semibold truncate absolute bottom-7 left-3 right-3">
                  {d.title || d.name || "Untitled"}
                </h1>
                <p className="text-[10px] sm:text-xs absolute bottom-3 left-3 right-3 text-gray-300">
                  <span className="mr-2">{d.release_date || "N/A"}</span>
                  {(d.media_type || "movie").toUpperCase()}
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
