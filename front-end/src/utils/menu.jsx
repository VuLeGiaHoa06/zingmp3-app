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
    path: "chart",
    text: "#zingchart",
    icon: <RiLineChartLine size={24} />,
  },
  {
    path: "room",
    text: "Phòng nhạc",
    icon: <CgMusicSpeaker size={24} />,
  },
];
