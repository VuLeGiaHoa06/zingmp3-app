import axios from "../axios";

export const apiGetSong = (sid) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    try {
      const res = await axios({
        url: "/song",
        method: "get",
        params: { id: sid },
      });
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });

export const getDetailSong = (sid) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    try {
      const res = await axios({
        url: "/infosong",
        method: "get",
        params: { id: sid },
      });
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
export const apiGetDetailPlaylist = (pid) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    try {
      const res = await axios({
        url: "/detailplaylist",
        method: "get",
        params: { id: pid },
      });
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
