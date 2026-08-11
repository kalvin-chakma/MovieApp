import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", icon: "ri-home-4-fill", label: "Home" },
  { to: "/movies", icon: "ri-clapperboard-fill", label: "Movies" },
  /* { to: "/tvshows", icon: "ri-tv-fill", label: "TV+" }, */
  /* { to: "/trending", icon: "ri-fire-fill", label: "Trending" }, */
  { to: "/popular", icon: "ri-bard-fill", label: "Popular" },
  { to: "/top-rated", icon: "ri-sparkling-2-fill", label: "Top Rated" },
  { to: "/people", icon: "ri-team-fill", label: "People" },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        className={`
          bg-[#5865F2] h-screen overflow-y-auto no-scrollbar flex flex-col items-center shrink-0
          fixed lg:static top-0 left-0 z-50 shadow-2xl lg:shadow-none
          w-64 lg:w-20 py-4
          transition-transform duration-300 ease-in-out will-change-transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        <div className="w-full flex justify-end px-4 lg:hidden">
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="text-white text-2xl leading-none hover:text-white/70 active:scale-90 transition-all"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>

        <Link
          to="/"
          onClick={onClose}
          className="text-white text-xl mt-2 mb-6 flex flex-col items-center hover:opacity-80 transition-opacity"
        >
          <i className="text-4xl ri-movie-fill"></i>
          <span className="text-xs font-semibold">MovieApp</span>
        </Link>

        <nav className="flex flex-col w-full gap-1 px-3 lg:px-0">
          {NAV_ITEMS.map(({ to, icon, label }) => {
            const isActive = pathname === to;
            return (
              <Link
                key={label}
                to={to}
                onClick={onClose}
                title={label}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex flex-row lg:flex-col items-center gap-3 lg:gap-0 w-full py-2.5 px-3 lg:px-0 rounded-lg lg:rounded-none transition-colors duration-200 ${
                  isActive
                    ? "bg-black text-white lg:bg-black/30"
                    : "text-white/85 hover:bg-black/20 hover:text-white"
                }`}
              >
                {isActive && (
                  <span className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r bg-white" />
                )}
                <i className={`${icon} text-xl`}></i>
                <span className="text-sm lg:text-xs font-semibold lg:mt-0.5">
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
