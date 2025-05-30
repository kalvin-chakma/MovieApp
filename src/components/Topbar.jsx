import React from "react";
import Search from "./Search";

const Topbar = () => {
  return (
    <div className="h-[8%] w-full py-2 px-10 flex items-center bg-[#191919] absolute top-0 left-0 right-0 z-10">
      <div className="flex flex-row justify-between items-center w-full">
        <h1 className="text-3xl font-bold mr-10">MOVIES</h1>
        <div className="flex w-full gap-7 items-center">
          <h1 className="font-bold">Latest</h1>
          <h1 className="font-bold">Trending</h1>
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
