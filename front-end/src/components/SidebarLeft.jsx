import logo from "../assets/logo.svg";
import { sidebarMenu } from "../utils/menu";
import { NavLink, Link } from "react-router-dom";
import path from "../utils/path";

const notActiveStyle = "flex gap-3 text-[#585861] text-[16px]";
const activeStyle = "flex gap-3 text-primary text-[16px]";

const SidebarLeft = () => {
  return (
    <div className="w-full h-[70px] flex flex-col py-[15px] px-[25px]">
      <Link to={path.HOME} className="flex flex-col cursor-pointer">
        <img className="w-[120px] h-[40px]" src={logo} alt="logo" />
        <p className="text-[16px] mb-4 text-[#2D2D37] font-normal uppercase">
          mxh âm nhạc
        </p>
      </Link>
      <div className="flex flex-col gap-6">
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
            <p>{item.text}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SidebarLeft;
