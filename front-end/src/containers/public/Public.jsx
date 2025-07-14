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
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";

const Public = () => {
  const dispatch = useDispatch();
  const [isShowSidebarRight, setIsShowSidebarRight] = useState(false);
  const { isLoading } = useSelector((state) => state.music);
  const { scroll } = useSelector((state) => state.app);

  // console.log(isLoading);

  const handleScroll = (e) => {
    if (e.target.scrollTop === 0) {
      dispatch(actions.setScroll(true));
    } else {
      dispatch(actions.setScroll(false));
    }
  };

  return (
    <div className="w-full flex h-screen flex-col relative">
      <div className="w-full h-full flex">
        <div className="min-[1024px]:w-[240px] w-[70px] fixed h-full flex-none bg-main-200">
          <SidebarLeft />
        </div>
        <div className="flex-auto w-full min-[1024px]:ml-[240px] ml-[70px] flex flex-col relative">
          <div
            className={`h-[70px] w-full px-[59px] flex flex-none items-center justify-between fixed top-0 min-[1024px]:left-[240px] left-[70px]  r-[329px] z-10 ${
              scroll ? "bg-transparent" : "bg-main-100 shadow-md"
            }`}
          >
            <Header />
          </div>
          <div className="flex-auto w-full">
            <Scrollbars
              onScroll={handleScroll}
              autoHide
              style={{ width: "100%", height: "100%" }}
            >
              <div className="w-full h-[70px]"></div>
              <Outlet />
              <div className="w-full h-[90px]"></div>
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
