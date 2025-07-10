import React, { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
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
  const { profile } = useParams();

  // console.log(isLoading);

  return (
    <div className="w-full flex h-screen flex-col relative">
      <div className="w-full h-full flex">
        <div className="w-[240px] fixed h-full flex-none bg-main-200">
          <SidebarLeft />
        </div>
        <div className="flex-auto w-full ml-[240px] flex flex-col relative">
          <div
            className={`h-[70px] w-full px-[59px] flex flex-none items-center justify-between ${
              profile ? "fixed top-0 left-[240px] r-[329px] z-10" : ""
            }`}
          >
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
            className={`w-[329px] h-screen flex-none bg-main-100 ${
              isShowSidebarRight ? "animate-slide-left" : "animate-slide-right"
            } shadow-2xl`}
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
