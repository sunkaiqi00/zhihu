import {
  LOGIN,
  CREATEPOST,
  SET_COLUMNS,
  SET_COLUMN,
  SET_POSTS,
  SET_LOADING
} from "./constant";
import store from "./index";
import axios from "axios";
import { Commit } from "vuex";
const OK = 0;
axios.interceptors.request.use(config => {
  store.commit(SET_LOADING, true);
  return config;
});
axios.interceptors.response.use(config => {
  store.commit(SET_LOADING, false);
  return config;
});
async function getDataCommit(
  url: string,
  mutationsName: string,
  commit: Commit
) {
  const { data } = await axios.get(url);
  if (data.code === OK) {
    commit(mutationsName, data);
  }
}
export default {
  login(context) {
    context.commit(LOGIN);
  },
  createPost({ commit }, post) {
    commit(CREATEPOST, post);
  },
  setColumns({ commit }) {
    getDataCommit("/test/api/columns", SET_COLUMNS, commit);
  },
  setColumn({ commit }, cid) {
    getDataCommit(`/test/api/columns/${cid}`, SET_COLUMN, commit);
  },
  setPosts({ commit }, cid) {
    getDataCommit(`/test/api/columns/${cid}/posts`, SET_POSTS, commit);
  },
  setLoading({ commit }, status) {
    commit(SET_LOADING, status);
  }
};
