import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/Axios";
import Loader from "../components/Loader";
import noImage from "../assets/no-image.jpg";
import HorizontalCard from "../components/HorizontalCard";

const SinglePerson = () => {
  const { id } = useParams();
  const [showBioModal, setShowBioModal] = useState(false);
  const [data, setData] = useState(null);
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDetails = async () => {
    try {
      const [person, credit] = await Promise.all([
        axios.get(`/person/${id}?language=en-US`),
        axios.get(`/person/${id}/combined_credits?language=en-US`),
      ]);
      setData(person.data);
      setCredits(credit.data.cast || []);
      document.title = person.data.name || "Person Details";
    } catch (error) {
      console.error("Error fetching person details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const limitWords = (text, wordLimit = 50) => {
    const words = text.split(" ");
    return words.length <= wordLimit
      ? text
      : words.slice(0, wordLimit).join(" ") + "...";
  };

  const age = useMemo(() => {
    if (!data?.birthday) return null;
    const birth = new Date(data.birthday);
    const end = data.deathday ? new Date(data.deathday) : new Date();
    return end.getFullYear() - birth.getFullYear();
  }, [data]);

  const sortedCredits = useMemo(() => {
    if (!credits.length) return [];
    return [...credits]
      .sort(
        (a, b) =>
          new Date(b.release_date || b.first_air_date || 0) -
          new Date(a.release_date || a.first_air_date || 0)
      )
      .filter((item) => item.poster_path);
  }, [credits]);

  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader />
      </div>
    );
  if (!data)
    return (
      <div className="min-h-screen bg-black text-white p-10 text-center text-xl">
        Unable to load person details.
      </div>
    );

  return (
    <div className="h-screen w-screen relative bg-black overflow-y-auto no-scrollbar">
      {data.profile_path ? (
        <>
          <img
            src={`https://image.tmdb.org/t/p/original${data.profile_path}`}
            alt={data.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/80 to-black" />
        </>
      ) : (
        <img
          src={noImage}
          alt="No profile"
          className="w-full h-full object-cover"
        />
      )}

      <div className="absolute z-10 top-0 left-1/2 transform -translate-x-1/2 container px-5 lg:px-0 py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 blur opacity-25 group-hover:opacity-40 transition" />
              <img
                className="relative w-64 md:w-80 rounded-xl shadow-2xl object-cover aspect-[2/3]"
                src={
                  data.profile_path
                    ? `https://image.tmdb.org/t/p/original${data.profile_path}`
                    : noImage
                }
                alt={data.name}
              />
            </div>
          </div>

          <div className="flex-1 space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
            {/* Name & Known For */}
            <div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {data.name}
              </h1>

              {data.known_for_department && (
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mt-2">
                  <span className="px-4 py-1.5 bg-purple-600/20 border border-purple-500/20 rounded-full text-sm text-purple-200">
                    {data.known_for_department}
                  </span>
                  {data.popularity && (
                    <span className="px-4 py-1.5 bg-zinc-800 border border-zinc-700 rounded-full text-sm">
                      ⭐ {Math.round(data.popularity)} popularity
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Personal Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full justify-items-center md:justify-items-start">
              {data.birthday && (
                <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-700/40 w-full sm:col-1">
                  <p className="text-gray-400 text-xs uppercase">Born</p>
                  <p className="text-lg font-semibold">
                    {new Date(data.birthday).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  {age && !data.deathday && (
                    <p className="text-sm text-gray-400">{age} years old</p>
                  )}
                </div>
              )}
              {data.place_of_birth && (
                <div className="p-4  bg-zinc-900/60 rounded-xl border border-zinc-700/40 w-full sm:col-1">
                  <p className="text-gray-400 text-xs uppercase">
                    Place of Birth
                  </p>
                  <p className="text-lg font-semibold">{data.place_of_birth}</p>
                </div>
              )}
              {data.deathday && (
                <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-700/40 w-full sm:w-auto">
                  <p className="text-gray-400 text-xs uppercase">Died</p>
                  <p className="text-lg font-semibold">
                    {new Date(data.deathday).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-gray-400">Aged {age}</p>
                </div>
              )}
            </div>

            {/* Biography */}
            {data.biography && (
              <div className="bg-zinc-900/40 p-6 rounded-xl border border-zinc-700/40 w-full sm:w-auto">
                <h2 className="text-2xl font-bold mb-3">Biography</h2>
                <p className="text-gray-300 leading-relaxed">
                  {limitWords(data.biography, 50)}
                </p>
                <button
                  className="text-purple-400 mt-3 hover:underline"
                  onClick={() => setShowBioModal(true)}
                >
                  Read More
                </button>
              </div>
            )}
          </div>
        </div>

        {showBioModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-6 rounded-xl max-w-xl w-full border border-zinc-700 text-white shadow-xl">
              <h2 className="text-2xl font-bold mb-4">Full Biography</h2>

              <p className="text-gray-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
                {data.biography}
              </p>

              <div className="text-right mt-4">
                <button
                  onClick={() => setShowBioModal(false)}
                  className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FILMOGRAPHY */}
        {sortedCredits.length > 0 && (
          <div className=" container mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold mb-3">Filmography</h2>
            <p className="text-gray-400 mb-6">{sortedCredits.length} credits</p>

            <HorizontalCard
              title=""
              data={sortedCredits.map((credit) => ({
                ...credit,
                media_type: credit.media_type || "movie",
              }))}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePerson;
