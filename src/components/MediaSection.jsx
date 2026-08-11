import React, { useState } from "react";

const MediaSection = ({ videos = [], backdrops = [], posters = [], onPlayVideo }) => {
  const tabs = [
    { key: "popular", label: "Most Popular", count: null },
    { key: "videos", label: "Videos", count: videos.length },
    { key: "backdrops", label: "Backdrops", count: backdrops.length },
    { key: "posters", label: "Posters", count: posters.length },
  ].filter((tab) => tab.key === "popular" || tab.count > 0);

  const [active, setActive] = useState("popular");

  if (!videos.length && !backdrops.length && !posters.length) return null;

  const popularItems = [...backdrops.slice(0, 8), ...posters.slice(0, 8)];

  const items =
    active === "videos"
      ? videos
      : active === "backdrops"
      ? backdrops
      : active === "posters"
      ? posters
      : popularItems;

  return (
    <div className="px-4 sm:px-6 max-w-screen-xl mx-auto mt-2 mb-8">
      <div className="flex items-end gap-6 border-b border-white/10 mb-4 overflow-x-auto no-scrollbar">
        <h2 className="text-xl sm:text-2xl font-semibold shrink-0 pb-3">Media</h2>
        <div className="flex gap-5 sm:gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`relative pb-3 text-sm sm:text-base font-medium whitespace-nowrap transition-colors ${
                active === tab.key
                  ? "text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {tab.label}
              {tab.count != null && (
                <span className="ml-1.5 text-xs text-zinc-500">
                  {tab.count}
                </span>
              )}
              {active === tab.key && (
                <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-white rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-stretch gap-3 overflow-x-auto no-scrollbar pb-2">
        {items.length === 0 && (
          <p className="text-sm text-zinc-500 py-6">Nothing to show yet.</p>
        )}

        {active === "videos"
          ? items.map((video) => (
              <button
                key={video.id}
                onClick={() => onPlayVideo?.(video.key)}
                style={{ aspectRatio: 16 / 9 }}
                className="relative shrink-0 h-40 sm:h-48 md:h-56 rounded-lg overflow-hidden bg-zinc-800 group"
              >
                <img
                  src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                  alt={video.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <i className="ri-play-fill text-4xl text-white"></i>
                </div>
                <p className="absolute bottom-0 left-0 right-0 px-2 py-1.5 text-xs text-left text-white bg-gradient-to-t from-black/80 to-transparent truncate">
                  {video.name}
                </p>
              </button>
            ))
          : items.map((img, i) => (
              <div
                key={`${img.file_path}-${i}`}
                style={{ aspectRatio: img.aspect_ratio || 16 / 9 }}
                className="shrink-0 h-40 sm:h-48 md:h-56 rounded-lg overflow-hidden bg-zinc-800 hover:scale-[1.03] transition-transform duration-200"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default MediaSection;
