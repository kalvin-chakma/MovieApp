import React from "react";

const PageHeader = ({ title, showBack = true, rightContent = null }) => {
  return (
    <div
      className="sticky top-0 z-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8
      py-3 sm:py-4 mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between
      gap-3 sm:gap-4 bg-transparent"
    >
      <div className="flex items-center gap-3 min-w-0">
        {showBack && (
          <button
            className="text-zinc-400 hover:text-white transition-colors duration-200 shrink-0"
            onClick={() => window.history.back()}
            aria-label="Go back"
          >
            <i className="ri-arrow-left-long-line text-2xl"></i>
          </button>
        )}

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight truncate">
          {title}
        </h1>
      </div>

      {/* Anything you pass (filters, buttons, menus, etc.) */}
      {rightContent && <div className="shrink-0">{rightContent}</div>}
    </div>
  );
};

export default PageHeader;
