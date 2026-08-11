import React from "react";

const sizeClasses = {
  sm: "text-[10px] sm:text-xs px-1.5 py-0.5 gap-0.5",
  md: "text-sm px-2 py-1 gap-1",
  lg: "text-base px-3 py-1.5 gap-1.5",
};

const RatingBadge = ({ rating, voteCount, size = "sm", className = "" }) => {
  if (!rating || rating <= 0) return null;

  return (
    <span
      className={`inline-flex items-center rounded-full bg-black/70 backdrop-blur-sm text-yellow-400 font-semibold ${sizeClasses[size]} ${className}`}
    >
      <i className="ri-star-fill"></i>
      <span className="text-white">{rating.toFixed(1)}</span>
      {voteCount ? (
        <span className="text-gray-400 font-normal hidden sm:inline">
          ({voteCount.toLocaleString()})
        </span>
      ) : null}
    </span>
  );
};

export default RatingBadge;
