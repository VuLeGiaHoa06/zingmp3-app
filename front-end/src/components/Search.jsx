import icons from "../utils/icons";
const { CiSearch } = icons;

const Search = () => {
  return (
    <div className="w-[440px] h-[40px] flex items-center gap-5 bg-[#F2F2F2] text-[#757575] rounded-3xl px-3">
      <span className="cursor-pointer">
        <CiSearch size={24} />
      </span>
      <input
        className="w-full outline-none bg-inherit"
        type="text"
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
      />
    </div>
  );
};

export default Search;
