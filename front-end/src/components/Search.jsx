import icons from "../utils/icons";
import { useNavigate, createSearchParams, useParams } from "react-router-dom";
const { CiSearch, IoCloseSharp } = icons;
import { useState, useRef } from "react";
// import * as apis from "../apis";
import path from "../utils/path";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";

const Search = () => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const { scroll } = useSelector((state) => state.app);
  const { profile } = useParams;

  const handleSearch = (e) => {
    if (e.code === "Enter") {
      navigate({
        pathname: `${path.SEARCH}${path.ALL}`,
        search: createSearchParams({
          q: keyword,
        }).toString(),
      });
      dispatch(actions.search(keyword));
    }
  };

  return (
    <div
      className={`w-[440px] h-[40px] flex items-center gap-5  rounded-3xl px-3 ${
        scroll && profile ? "bg-[#2F3133]" : "bg-[#F2F2F2]"
      }`}
    >
      <span
        className={`cursor-pointer text-[#757575] ${
          scroll && profile ? "text-white" : "text-[#2F3133]"
        }`}
      >
        <CiSearch size={24} />
      </span>
      <input
        ref={inputRef}
        className={`w-full outline-none bg-inherit   ${
          scroll && profile
            ? "placeholder:text-white text-white"
            : "text-[#2F3133]"
        }`}
        type="text"
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleSearch}
      />
      {keyword && (
        <span
          onClick={() => {
            setKeyword("");
            inputRef.current.focus();
          }}
          className="text-gray-500 cursor-pointer"
        >
          <IoCloseSharp size={20} />
        </span>
      )}
    </div>
  );
};

export default Search;
