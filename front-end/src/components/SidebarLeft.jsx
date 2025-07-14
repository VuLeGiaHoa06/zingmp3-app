import logo from "../assets/logo.svg";
import { sidebarMenu } from "../utils/menu";
import { NavLink, Link } from "react-router-dom";
import path from "../utils/path";

const notActiveStyle = "flex gap-3 text-[#585861] text-[16px]";
const activeStyle = "flex gap-3 text-primary text-[16px]";

const SidebarLeft = () => {
  return (
    <div className="w-full h-[70px] flex flex-col ">
      <Link
        to={path.HOME}
        className="flex-col cursor-pointer flex items-start min-[1024px]:px-[25px] min-[1024px]:mt-[15px] "
      >
        <img
          className="w-[120px] h-[40px] min-[1024px]:flex hidden"
          src={logo}
          alt="logo"
        />
        <p className="text-[16px] mb-4 text-[#2D2D37] font-normal uppercase min-[1024px]:flex hidden">
          mxh âm nhạc
        </p>
        <img
          src="https://zmdjs.zmdcdn.me/zmp3-desktop/v1.16.0/static/media/icon_zing_mp3_60.f6b51045.svg"
          alt="logo"
          className="w-[45px] h-[45px] m-auto mt-[15px] min-[1024px]:hidden block mb-[15px]"
        />
      </Link>
      <div className="flex flex-col gap-6 px-[25px]">
        {sidebarMenu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              isActive ? activeStyle : notActiveStyle
            }
          >
            {item.icon}
            <span className="min-[1024px]:inline hidden">{item.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SidebarLeft;
