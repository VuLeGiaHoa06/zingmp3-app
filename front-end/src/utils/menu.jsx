import icons from "./icons";

const {
  MdOutlineLibraryMusic,
  CgMusicSpeaker,
  MdOutlineTravelExplore,
  RiLineChartLine,
} = icons;

export const sidebarMenu = [
  {
    path: "mymusic",
    text: "Thư viện",
    icon: <MdOutlineLibraryMusic size={24} />,
  },
  {
    path: "",
    text: "Khám phá",
    end: true,
    icon: <MdOutlineTravelExplore size={24} />,
  },
  {
    path: "zing-chart",
    text: "#zingchart",
    icon: <RiLineChartLine size={24} />,
  },
  {
    path: "room",
    text: "Phòng nhạc",
    icon: <CgMusicSpeaker size={24} />,
  },
];

export const searchMenu = [
  { path: "tat-ca", text: "Tất cả" },
  {
    path: "bai-hat",
    text: "Bài hát",
  },
  {
    path: "playlist",
    text: "Playlist/Album",
  },
  {
    path: "artist",
    text: "Nghệ sĩ/OA",
  },
  {
    path: "video",
    text: "MV",
  },
];
