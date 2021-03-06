import {
  LOGIN,
  CREATEPOST,
  SET_COLUMNS,
  SET_COLUMN,
  SET_POSTS,
  SET_LOADING,
  CURRENT_USER,
  SET_ERROR,
  UPDATEPOST,
  DELETEPOST
} from "./constant";
import store from "./index";
import axios, { AxiosRequestConfig } from "axios";
import { Commit } from "vuex";
import { ErrorProps } from "@/typeings/interface";
export const OK = 0;
axios.interceptors.request.use(config => {
  store.commit(SET_LOADING, true);
  store.dispatch("setError", { status: false, message: "" });

  return config;
});
axios.interceptors.response.use(
  config => {
    store.commit(SET_LOADING, false);
    return config;
  },
  err => {
    const { error } = err.response.data;
    store.dispatch("setError", { status: true, message: error });
    store.dispatch("setLoading", false);
    return Promise.reject(error);
  }
);
async function getDataCommit(
  url: string,
  mutationsName: string,
  commit: Commit
) {
  const { data } = await axios.get(url);
  if (data.code === OK) {
    commit(mutationsName, data);
  }
  return data;
}
async function postDataCommit(
  url: string,
  mutationsName: string,
  commit: Commit,
  payload: {}
) {
  const { data } = await axios.post(url, payload);
  if (data.code === OK) {
    commit(mutationsName, data);
  }
  return data;
}
async function asyncAndCommit(
  url: string,
  mutationsName: string,
  commit,
  config: AxiosRequestConfig = { method: "get" },
  extrData?: any
) {
  const { data } = await axios(url, config);
  if (data.code === OK) {
    if (extrData) {
      commit(mutationsName, { data, extrData });
    } else {
      commit(mutationsName, data);
    }
  }
  return data;
}
export default {
  login({ commit }, payload) {
    const data = postDataCommit("/test/user/login", LOGIN, commit, payload);
    data
      .then(() => {
        const token = store.state.token;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", token);
      })
      .catch(err => {
        localStorage.removeItem("token");
        return Promise.reject(err);
      });
    return data;
  },
  getCurrentUser({ commit }) {
    return getDataCommit("/test/user/current", CURRENT_USER, commit);
  },
  loginAndGetUser({ dispatch }, loginData) {
    return dispatch("login", loginData).then(() => {
      return dispatch("getCurrentUser");
    });
  },
  createPost({ commit }, post) {
    return postDataCommit("/test/posts", CREATEPOST, commit, post);
  },
  setColumns({ state, commit }, params) {
    const { currentPage = 1, pageSize = 6 } = params;

    if (state.columns.currentPage < currentPage) {
      getDataCommit(
        `/test/columns?currentPage=${currentPage}&pageSize=${pageSize}`,
        SET_COLUMNS,
        commit
      );
    }
  },
  setColumn({ state, commit }, cid) {
    if (!state.columns.data[cid]) {
      getDataCommit(`/test/columns/${cid}`, SET_COLUMN, commit);
    }
  },
  setPosts({ state, commit }, cid) {
    if (!state.posts.loadedColumns.includes(cid)) {
      asyncAndCommit(
        `/test/columns/${cid}/posts`,
        SET_POSTS,
        commit,
        { method: "get" },
        cid
      );
    }
  },
  setLoading({ commit }, status) {
    commit(SET_LOADING, status);
  },
  setError({ commit }, error: ErrorProps) {
    commit(SET_ERROR, error);
  },
  updatePost({ commit }, { id, payload }) {
    return asyncAndCommit(`/test/posts/${id}`, UPDATEPOST, commit, {
      method: "patch",
      data: payload
    });
  },
  deletePost({ commit }, id) {
    return asyncAndCommit(`/test/posts/${id}`, DELETEPOST, commit, {
      method: "delete"
    });
  }
};
