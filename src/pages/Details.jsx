import axios from "../utils/Axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Link, useLocation, useParams } from "react-router-dom";
import HorizontalCard from "../components/HorizontalCard";

const Details = () => {
  document.title = "Details";
  const { path } = useLocation();
  const { type, id } = useParams();
  const [data, setData] = useState(null);
  const [info, setInfo] = useState(null);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`${type}/${id}?language=en-US`);
      const res = await axios.get(
        `${type}/${id}/recommendations?language=en-US&page=1`
      );
      setData(response.data);
      console.log(response.data);
      setInfo(res.data);
      console.log("info:", res.data);
    } catch (error) {
      console.error("Error fetching Details", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [type, id]);

  if (!data)
    return (
      <div className="text-white p-5">
        <Loader />
      </div>
    );

  return (
    <div className="text-white w-full min-h-screen lg:overflow-hidden">
      <div className="relative w-full min-h-screen">
        {/* Background Image */}
        <img
          className="w-full h-[60vh] md:h-[70vh] lg:h-full object-cover"
          src={`https://image.tmdb.org/t/p/original${
            data.backdrop_path || data.poster_path
          }`}
          alt={data.title || data.name || "Backdrop"}
        />

        {/* Overlay Gradient & Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 md:p-8 lg:p-20 flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Poster Image */}
          <div className="w-full lg:w-1/3 flex justify-center">
            <img
              className="w-2/3 md:w-1/2 lg:w-full object-cover rounded shadow-lg"
              src={`https://image.tmdb.org/t/p/original${
                data.poster_path || data.backdrop_path
              }`}
              alt={data.title || data.name}
            />
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-2/3 space-y-6">
            <div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {data.title || data.name || data.original_title}
              </h1>
              <p className="text-sm text-gray-100 font-semibold mt-1">
                {data.release_date || data.first_air_date} •{" "}
                {type.toUpperCase()}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Overview</h2>
              <p className="text-sm text-gray-200">{data.overview}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Genres</h2>
              <p className="text-sm">
                {data.genres?.map((g) => g.name).join(", ") || "N/A"}
              </p>
            </div>

            {data.created_by && data.created_by.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold">Created by</h2>
                <p className="text-sm">
                  {data.created_by.map((c) => c.name).join(", ")}
                </p>
              </div>
            )}

            <div>
              <Link
                to={`${path}/trailer`}
                className="inline-block px-4 py-2 rounded-sm bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition"
              >
                Watch Trailer
              </Link>
            </div>

            <div>
              <HorizontalCard
                title="Recommendations"
                data={info?.results || []}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
