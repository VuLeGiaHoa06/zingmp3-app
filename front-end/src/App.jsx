import {
  Home,
  Public,
  Login,
  Album,
  MyMusic,
  WeekChart,
  ZingChart,
  Search,
  Profile,
  SearchAll,
  SearchSong,
  SearchPlaylist,
} from "./containers/public/";
import { Routes, Route } from "react-router-dom";
import path from "./utils/path";
import { useEffect } from "react";
import * as action from "./store/actions";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = function () {
      const res = action.getHome();
      res(dispatch);
    };
    fetchData();
  }, []);
  return (
    <>
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.MY_MUSIC} element={<MyMusic />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.ALBUM__TITLE__PID} element={<Album />} />
          <Route path={path.WEEKCHART__TITLE_PID} element={<WeekChart />} />
          <Route path={path.ZINGCHART} element={<ZingChart />} />
          <Route path={path.PROFILE} element={<Profile />} />
          <Route path={path.SEARCH} element={<Search />}>
            <Route path={path.ALL} element={<SearchAll />} />
            <Route path={path.SONG} element={<SearchSong />} />
            <Route path={path.PLAYLIST} element={<SearchPlaylist />} />
          </Route>

          <Route path={path.STAR} element={<Home />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
