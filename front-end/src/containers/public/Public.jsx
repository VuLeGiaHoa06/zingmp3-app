import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  SidebarLeft,
  SidebarRight,
  Player,
  Header,
  LoadingDots,
} from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";

const Public = () => {
  const [isShowSidebarRight, setIsShowSidebarRight] = useState(false);
  const { isLoading } = useSelector((state) => state.music);
  // console.log(isLoading);

  return (
    <div className="w-full flex h-screen flex-col relative">
      <div className="w-full h-full flex">
        <div className="w-[240px] fixed h-full flex-none bg-main-200">
          <SidebarLeft />
        </div>
        <div className="flex-auto ml-[240px] border border-red-400 flex flex-col relative">
          <div className="w-full h-[70px] px-[59px] flex flex-none items-center justify-between">
            <Header />
          </div>
          <div className="flex-auto w-full">
            <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
              <Outlet />
            </Scrollbars>
          </div>
          {!isLoading && (
            <div className="absolute top-0 bottom-0 right-0 left-0 bg-white flex justify-center items-center">
              <LoadingDots />
            </div>
          )}
        </div>
        {isShowSidebarRight && (
          <div
            className={`w-[329px] ml-[240px] fixed right-0 top-0 bottom-0 flex-none bg-green-400 ${
              isShowSidebarRight ? "animate-slide-left" : "animate-slide-right"
            }`}
          >
            <SidebarRight />
          </div>
        )}
      </div>
      <div className="fixed bottom-0 right-0 left-0 h-[90px] px-2 bg-main-100 border-t-[1px]">
        <Player
          setIsShowSidebarRight={setIsShowSidebarRight}
          isShowSidebarRight={isShowSidebarRight}
        />
      </div>
    </div>
  );
};

export default Public;
