import { Home, Public, Login, Album } from "./containers/public/";
import { Routes, Route } from "react-router-dom";
import path from "./utils/path";
import { useEffect } from "react";
import * as action from "./store/actions";
import { useDispatch } from "react-redux";

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
      <div>
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.LOGIN} element={<Login />} />
            <Route path={path.ALBUM} element={<Album />} />

            <Route path={path.STAR} element={<Home />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
