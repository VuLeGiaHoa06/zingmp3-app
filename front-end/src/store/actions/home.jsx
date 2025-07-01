import * as apis from "../../apis";
import actionTypes from "./actionTypes";

export const getHome = () => async (dispatch) => {
  try {
    const res = await apis.getHome();
    // console.log(res);
    if (res?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_HOME,
        homeData: res.data.data.items,
      });
    } else {
      dispatch({
        type: actionTypes.GET_HOME,
        homeData: null,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
