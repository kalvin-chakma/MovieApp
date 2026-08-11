import React, { useState } from "react";
import Search from "./Search";

const Topbar = ({ setSidebarOpen }) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  if (mobileSearchOpen) {
    return (
      <div className="min-h-[8%] w-full py-2 px-3 lg:px-10 flex items-center gap-2 bg-[#191919] lg:absolute top-0 left-0 right-0 z-10">
        <Search className="w-full" />
        <button
          onClick={() => setMobileSearchOpen(false)}
          className="text-2xl shrink-0"
          aria-label="Close search"
        >
          <i className="ri-close-line"></i>
        </button>
      </div>
    );
  }

  return (
    <div className="h-[8%] min-h-[56px] w-full py-2 px-3 lg:px-10  flex items-center bg-[#191919] lg:absolute top-0 left-0 right-0 z-10">
      <div className="flex flex-row  items-center w-full">
        <button className="sm:hidden mr-2" onClick={() => setSidebarOpen(true)}>
          <i className="ri-menu-line text-2xl"></i>
        </button>
        <h1 className="text-xl sm:text-3xl font-bold lg:mr-10 mr-3">MovieApp</h1>
        <div className="flex w-full lg:gap-7 items-center">
          <div className="hidden sm:flex w-full">
            <Search />
          </div>
        </div>
        <button
          className="sm:hidden text-2xl mr-3"
          onClick={() => setMobileSearchOpen(true)}
          aria-label="Open search"
        >
          <i className="ri-search-line"></i>
        </button>
        <div className="text-3xl flex items-center">
          <i className="ri-account-circle-fill"></i>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
