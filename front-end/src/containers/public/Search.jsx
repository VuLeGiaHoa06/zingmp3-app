import React from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { searchMenu } from "../../utils/menu";
import { useSelector } from "react-redux";

const nonActiveStyle =
  "uppercase font-normal text-[16px] h-full flex items-center";
const activeStyle =
  "uppercase font-normal text-[16px] text-primary border-b border-b-primary h-full flex items-center";

const Search = () => {
  const { keyword } = useSelector((state) => state.music);
  return (
    <div className="w-full">
      <div className="w-full h-[48px] flex gap-4 items-center px-[59px]">
        <span className="text-[26px] font-bold flex items-start h-full">
          Kết Quả Tìm Kiếm
        </span>
        <div className="border-r border-gray-200 h-[30px]"></div>
        <div className="flex items-center gap-8 h-full">
          {searchMenu.map((item) => (
            <NavLink
              key={item.path}
              to={`${item.path}?q=${keyword}`}
              className={({ isActive }) =>
                isActive ? activeStyle : nonActiveStyle
              }
            >
              {item.text}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="border-b w-full border-gray-200 mb-[28px]"></div>
      <div className="px-[59px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Search;
