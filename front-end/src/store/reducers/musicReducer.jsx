import actionTypes from "../actions/actionTypes";

const initState = {
  curSongId: null,
  curSongData: null,
  curAlbumId: null,
  isPlaying: false,
  songs: null,
  isLoading: true,
  recentSongs: [],
  searchData: null,
  keyword: "",
  searchSong: [],
};

const musicReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_CUR_SONG_ID:
      return {
        ...state,
        curSongId: action.sid || null,
      };
    case actionTypes.PLAY:
      return {
        ...state,
        isPlaying: action.flag,
      };
    case actionTypes.PLAYLIST:
      return {
        ...state,
        songs: action.songs || null,
        searchSong: action.searchSong || [],
      };
    case actionTypes.LOADING:
      return {
        ...state,
        isLoading: action.flag,
      };
    case actionTypes.SET_CUR_SONG_DATA:
      return {
        ...state,
        curSongData: action.data,
      };
    case actionTypes.SET_CUR_ALBUM_ID:
      return {
        ...state,
        curAlbumId: action.sid,
      };
    case actionTypes.SEARCH:
      return {
        ...state,
        searchData: action.searchData,
        keyword: action.keyword,
      };
    case actionTypes.SET_RECENT_SONG: {
      let songs = state.recentSongs;

      if (action.data) {
        songs = [action.data, ...songs];

        if (songs.some((item) => item.sid === action.data.sid)) {
          songs = songs.filter((item) => item.sid !== action.data.sid);

          songs = [action.data, ...songs];
        }

        if (songs.length > 20) {
          songs = songs.filter((_, index, self) => index !== self.length - 1);
        }
      }

      return {
        ...state,
        recentSongs: songs,
      };
    }

    default:
      return state;
  }
};
export default musicReducer;
