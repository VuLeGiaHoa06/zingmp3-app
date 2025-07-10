import actionTypes from "./actionTypes";
import * as apis from "../../apis";

export const setCurSongId = (sid) => ({
  type: actionTypes.SET_CUR_SONG_ID,
  sid,
});

export const play = (flag) => ({
  type: actionTypes.PLAY,
  flag,
});

export const playList = (songs) => ({
  type: actionTypes.PLAYLIST,
  songs,
});

export const loading = (flag) => ({
  type: actionTypes.LOADING,
  flag,
});
export const setCurSongData = (data) => ({
  type: actionTypes.SET_CUR_SONG_DATA,
  data,
});
export const setCurAlbumId = (sid) => ({
  type: actionTypes.SET_CUR_ALBUM_ID,
  sid,
});
export const setRecentSong = (data) => ({
  type: actionTypes.SET_RECENT_SONG,
  data,
});

export const search = (keyword) => async (dispatch) => {
  try {
    const res = await apis.apiSearch(keyword);
    //closure: fn con co the truy cap duoc bien cua fn cha
    if (res?.data?.err === 0) {
      dispatch({
        type: actionTypes.SEARCH,
        searchData: res.data.data,
        keyword,
      });
    } else {
      dispatch({ type: actionTypes.SEARCH, searchData: null });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: actionTypes.SEARCH,
      data: null,
    });
  }
};
export const getSearchSong = (pid) => async (dispatch) => {
  try {
    const res = await apis.apiArtistSong(pid);
    //closure: fn con co the truy cap duoc bien cua fn cha
    console.log(res);

    if (res?.data?.err === 0) {
      dispatch({
        type: actionTypes.PLAYLIST,
        searchSong: res.data.data.items,
      });
    } else {
      dispatch({ type: actionTypes.PLAYLIST, searchSong: [] });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: actionTypes.PLAYLIST,
      searchSong: [],
    });
  }
};
