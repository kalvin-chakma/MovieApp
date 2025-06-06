import axios from "../utils/Axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";

const Details = () => {
  document.title = "Details";
  const { type, id } = useParams();
  const [data, setData] = useState(null);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`${type}/${id}?language=en-US`);
      setData(response.data);
      console.log(response.data);
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
    <div className="text-white w-full min-h-screen overflow-hidden">
      <div className="relative w-full min-h-screen overflow-hidden">
        {/* Background Image */}
        <img
          className="lg:w-full lg:h-full lg:object-cover object-fill h-[60vh]"
          src={`https://image.tmdb.org/t/p/original${
            data.backdrop_path || data.poster_path
          }`}
          alt={data.title || data.name || "Backdrop"}
        />

        {/* Overlay Gradient & Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 md:p-8 lg:p-20 flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Poster Image */}
          <div className="w-full lg:w-1/3">
            <img
              className="w-full object-cover rounded lg:p-0 p-20"
              src={`https://image.tmdb.org/t/p/original${
                data.poster_path || data.backdrop_path
              }`}
              alt={data.title || data.name}
            />
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-2/3 space-y-7 mt-5">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                {data.title || data.name || data.original_title}
              </h1>

              <p className="text-sm text-gray-400 mt-1">
                {data.release_date || data.first_air_date} •{" "}
                {type.toUpperCase()}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-1">Overview</h2>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
