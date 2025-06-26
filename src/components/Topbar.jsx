import React from "react";
import Search from "./Search";

const Topbar = () => {
  return (
    <div className="h-[8%] w-full py-2 px-3 lg:px-10  flex items-center bg-[#191919] lg:absolute top-0 left-0 right-0 z-10">
      <div className="flex flex-row  items-center w-full">
        <button className="sm:hidden mr-2" onClick={() => setSidebarOpen(true)}>
          <i className="ri-menu-line text-2xl"></i>
        </button>
        <h1 className="text-3xl font-bold lg:mr-10 mr-3">MOVIES</h1>
        <div className="flex w-full lg:gap-7 items-center">
          {/* <h1 className="font-bold hidden sm:inline-block">Latest</h1>
          <h1 className="font-bold hidden sm:inline-block">Trending</h1> */}
          <Search />
        </div>
        <div className="text-3xl flex items-center">
          <i className="ri-account-circle-fill"></i>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
