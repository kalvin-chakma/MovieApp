import React from "react";

const PageHeader = ({ title, showBack = true, rightContent = null }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            className="text-zinc-400 hover:text-white transition-colors duration-200"
            onClick={() => window.history.back()}
          >
            <i className="ri-arrow-left-long-line text-2xl"></i>
          </button>
        )}

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
          {title}
        </h1>
      </div>

      {/* Anything you pass (filters, buttons, menus, etc.) */}
      <div>{rightContent}</div>
    </div>
  );
};

export default PageHeader;
