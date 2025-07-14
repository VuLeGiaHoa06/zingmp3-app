import actionTypes from "../actions/actionTypes";

const initState = {
  banner: [],
  top100: {},
  newMusic: {},
  newRelease: {},
  weekChart: [],
  chart: {},
  rank: [],
  scroll: false,
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      return {
        ...state,
        banner:
          action.homeData.find((item) => item.sectionId === "hAlbum").items ||
          [],
        top100: action.homeData.find((item) => item.sectionId === "h100") || {},
        newMusic:
          action.homeData.find((item) => item.sectionId === "hNewrelease") ||
          {},
        newRelease:
          action.homeData.find((item) => item.sectionType === "new-release") ||
          {},
        weekChart:
          action.homeData.find((item) => item.sectionType === "weekChart")
            .items || [],
        chart:
          action.homeData.find((item) => item.sectionId === "hZC").chart || {},
        rank:
          action.homeData.find((item) => item.sectionId === "hZC").items || [],
      };
    case actionTypes.SCROLL:
      return {
        ...state,
        scroll: action.flag,
      };

    default:
      return state;
  }
};

export default appReducer;
