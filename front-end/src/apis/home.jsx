import axios from "../axios";

export const getHome = () =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    try {
      const res = await axios("/home");
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
