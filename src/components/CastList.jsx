import React from "react";
import { Link } from "react-router-dom";
import noImage from "../assets/no-image.jpg";

const CastList = ({ title, data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="">
      <h1 className="text-xl sm:text-2xl md:text-3xl text-zinc-400 my-4 font-semibold">
        {title}
      </h1>

      <div className="overflow-x-auto overflow-y-hidden no-scrollbar">
        <div className="flex gap-4">
          {data.map((c) => (
            <Link
              key={c.credit_id || c.id}
              to={`/person/${c.id}`}
              className="min-w-[28vw] sm:min-w-[16vw] md:min-w-[12vw] lg:min-w-[8vw] transition-transform duration-300 hover:scale-105"
            >
              <div className="w-full aspect-[2/3] rounded-md overflow-hidden bg-zinc-800">
                <img
                  className="w-full h-full object-cover"
                  src={
                    c.profile_path
                      ? `https://image.tmdb.org/t/p/w300${c.profile_path}`
                      : noImage
                  }
                  alt={c.name}
                  loading="lazy"
                />
              </div>
              <p className="text-white text-xs sm:text-sm font-semibold mt-2 truncate">
                {c.name}
              </p>
              <p className="text-gray-400 text-[10px] sm:text-xs truncate">
                {c.character}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CastList;
