import icons from "../utils/icons";
import Search from "./Search";
const { GoArrowLeft, GoArrowRight } = icons;

const Header = () => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="w-[600px] flex items-center gap-5">
        <div className="flex gap-4 text-[#C9C9CC]">
          <GoArrowLeft size={24} />
          <GoArrowRight size={24} />
        </div>
        <div>
          <Search />
        </div>
      </div>
      <div>login</div>
    </div>
  );
};

export default Header;
