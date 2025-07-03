import {
  Home,
  Public,
  Login,
  Album,
  MyMusic,
  WeekChart,
  ZingChart,
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
    const fetchData = async function () {
      const res = await action.getHome();
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

          <Route path={path.STAR} element={<Home />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
