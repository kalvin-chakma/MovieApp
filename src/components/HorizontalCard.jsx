import React from "react";
import { Link } from "react-router-dom";

const HorizontalCard = ({ title, data }) => {
  return (
    <div className="mx-[3%]">
      <div>
        <h1 className="text-3xl text-zinc-400 m-7 font-semibold">{title}</h1>
      </div>
      <div className="w-full ">
        <div className="overflow-x-auto overflow-y-hidden no-scrollbar ">
          <div className="flex">
            {data.map((d, i) => (
              <Link
                key={i}
                className="min-w-[20%] min-h-[20vh] mr-5 relative rounded-md overflow-hidden "
              >
                <img
                  className="w-full h-full object-cover"
                  src={`https://image.tmdb.org/t/p/original${
                    d.backdrop_path || d.poster_path
                  }`}
                  alt={d.title || d.name || d.original_name || d.original_title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent">
                  <h1 className="text-white text-xm font-semibold truncate absolute bottom-5 left-2 right-2">
                    {d.name || d.title || d.original_name || d.original_title}
                  </h1>
                  <p className="whitespace-normal text-xs font absolute bottom-1 left-2 right-2 text-gray-300">
                    <span className="mr-2"> {d.release_date}</span>
                    {d.media_type ? d.media_type.toUpperCase() : ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;
