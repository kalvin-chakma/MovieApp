import axios from "../utils/Axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import HorizontalCard from "../components/HorizontalCard";
import TrailerModal from "../components/TrailerModal";
import CastList from "../components/CastList";
import RatingBadge from "../components/RatingBadge";
import MediaSection from "../components/MediaSection";

const Details = () => {
  document.title = "Details";
  const { type, id } = useParams();
  const [data, setData] = useState(null);
  const [info, setInfo] = useState(null);
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);
  const [backdrops, setBackdrops] = useState([]);
  const [posters, setPosters] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`${type}/${id}?language=en-US`);
      const res = await axios.get(
        `${type}/${id}/recommendations?language=en-US&page=1`
      );
      const videosRes = await axios.get(`${type}/${id}/videos?language=en-US`);
      const creditsRes = await axios.get(`${type}/${id}/credits?language=en-US`);
      const imagesRes = await axios.get(
        `${type}/${id}/images?include_image_language=en,null`
      );
      setData(response.data);
      setInfo(res.data);
      setCast(creditsRes.data?.cast || []);
      setBackdrops(imagesRes.data?.backdrops || []);
      setPosters(imagesRes.data?.posters || []);

      const videoResults = videosRes.data?.results || [];
      setVideos(videoResults.filter((v) => v.site === "YouTube"));

      const trailer =
        videoResults.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
        videoResults.find((v) => v.site === "YouTube" && v.type === "Teaser") ||
        videoResults.find((v) => v.site === "YouTube");
      setTrailerKey(trailer?.key || null);
    } catch (error) {
      console.error("Error fetching Details", error);
    }
  };

  useEffect(() => {
    setShowTrailer(false);
    fetchDetails();
  }, [type, id]);

  if (!data)
    return (
      <div className="p-5">
        <Loader />
      </div>
    );

  const formatRuntime = (minutes) => {
    if (!minutes) return null;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const runtime = formatRuntime(
    type === "tv" ? data.episode_run_time?.[0] : data.runtime
  );

  return (
    <div className="h-screen w-full overflow-y-auto no-scrollbar bg-black">
      <div className="relative w-full lg:min-h-screen lg:overflow-hidden">
        {/* Background Image */}
        <img
          className="w-full h-[45vh] sm:h-[45vh] md:h-[65vh] lg:h-full lg:absolute lg:inset-0 object-cover"
          src={`https://image.tmdb.org/t/p/original${
            data.backdrop_path || data.poster_path
          }`}
          alt={data.title || data.name || "Backdrop"}
        />

        {/* Overlay Gradient & Content */}
        <div className="relative -mt-96 sm:-mt-20 md:-mt-96 lg:mt-0 lg:absolute lg:inset-0 bg-gradient-to-t from-black via-black/90 lg:via-black/80 to-transparent p-4 md:p-8 lg:p-20 flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Poster Image */}
          <div className="w-full lg:w-1/3 flex justify-center md:-mt-28 -mt-8 lg:-mt-8">
            <img
              className="w-2/3 md:w-1/2 lg:w-full object-cover rounded shadow-lg"
              src={`https://image.tmdb.org/t/p/original${
                data.poster_path || data.backdrop_path
              }`}
              alt={data.title || data.name}
            />
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-2/3 space-y-2 ">
            <div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {data.title || data.name || data.original_title}
              </h1>
              <div className="flex items-center flex-wrap gap-2 mt-2">
                <p className="text-sm text-gray-100 font-semibold">
                  {data.release_date || data.first_air_date} •{" "}
                  {type.toUpperCase()}
                  {runtime && <> • {runtime}</>}
                </p>

              </div>
            </div>
            <RatingBadge
              rating={data.vote_average}
              voteCount={data.vote_count}
              size="md"
            />

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

            {trailerKey && (
              <div>
                <button
                  onClick={() => setShowTrailer(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition"
                >
                  <i className="ri-play-fill"></i>
                  Watch Trailer
                </button>
              </div>
            )}

            <div>
              <CastList title="Cast" data={cast} />
            </div>
          </div>
        </div>
      </div>

      <MediaSection
        videos={videos}
        backdrops={backdrops}
        posters={posters}
        onPlayVideo={(key) => {
          setTrailerKey(key);
          setShowTrailer(true);
        }}
      />

      <div className="px-4 sm:px-6 max-w-screen-xl mx-auto pb-5">
        <HorizontalCard title="Recommendations" data={info?.results || []} />
      </div>

      {showTrailer && (
        <TrailerModal
          videoKey={trailerKey}
          title={data.title || data.name}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </div>
  );
};

export default Details;
