import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarLeft, SidebarRight, Player } from "../../components";

const Public = () => {
  return (
    <div className="w-full flex min-h-screen flex-col">
      <div className="w-full h-full flex flex-auto">
        <div className="w-[240px] border border-blue-400 flex-none bg-main-200">
          <SidebarLeft />
        </div>
        <div className="flex-auto border border-red-400">
          <Outlet />
        </div>
        {/* <div className="w-[329px] hidden 1240:flex flex-none border border-green-400">
          <SidebarRight />
        </div> */}
      </div>
      <div className="flex-none w-full h-[90px] px-2 ">
        <Player />
      </div>
    </div>
  );
};

export default Public;
