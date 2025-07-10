import icons from "../utils/icons";
import Search from "./Search";
const { GoArrowLeft, GoArrowRight } = icons;
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex items-center justify-between">
      <div className="w-[600px] flex items-center gap-5">
        <div className="flex gap-4 text-[#C9C9CC]">
          <span onClick={() => navigate(-1)}>
            <GoArrowLeft size={24} />
          </span>
          <span onClick={() => navigate(1)}>
            <GoArrowRight size={24} />
          </span>
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
