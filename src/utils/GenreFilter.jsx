import React, { useState, useRef, useEffect } from "react";
export const GENRES = [
  { id: 28, name: "Action" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

const GenreFilter = ({ selectedGenre, onGenreChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedGenreName = selectedGenre
    ? GENRES.find((g) => g.id === selectedGenre)?.name
    : "All Genres";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2.5 rounded-lg border border-zinc-700 transition-all duration-200 shadow-lg hover:shadow-xl min-w-[140px] justify-between"
      >
        <span className="text-sm font-medium">{selectedGenreName}</span>
        <i className="ri-arrow-down-s-line"></i>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-zinc-800 border border-zinc-700 rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto no-scrollbar">
          <div className="py-2 ">
            <button
              onClick={() => {
                onGenreChange(null);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors  ${
                !selectedGenre
                  ? "bg-blue-600 text-white"
                  : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
              }`}
            >
              All Genres
            </button>

            <div className="my-1 border-t border-zinc-700 not-scrollbar" />

            {GENRES.map((genre) => (
              <button
                key={genre.id}
                onClick={() => {
                  onGenreChange(genre.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors  ${
                  selectedGenre === genre.id
                    ? "bg-blue-600 text-white"
                    : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenreFilter;
