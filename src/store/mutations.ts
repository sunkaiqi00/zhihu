import {
  LOGIN,
  CURRENT_USER,
  CREATEPOST,
  SET_COLUMNS,
  SET_COLUMN,
  SET_POSTS,
  SET_LOADING,
  SET_ERROR,
  UPDATEPOST,
  DELETEPOST
} from "./constant";
import { arrToObj } from "../hooks/helper";
import { ErrorProps } from "@/typeings/interface";
export default {
  [LOGIN](state, data) {
    state.token = data.data.token;
  },
  [CURRENT_USER](state, data) {
    state.user = {
      isLogin: true,
      ...data.data,
      description: "我就是我，是颜色不一样的烟火。"
    };
  },
  [CREATEPOST](state, post) {
    state.posts.data[post._id] = post;
  },
  [SET_COLUMNS](state, columns) {
    const { list, count, currentPage } = columns.data;
    state.columns = {
      data: { ...state.columns.data, ...arrToObj(list) },
      total: count,
      currentPage: currentPage * 1
    };
  },
  [SET_COLUMN](state, column) {
    state.columns.data[column.data._id] = column.data;
  },
  [SET_POSTS](state, { data: posts, extrData: columnId }) {
    state.posts.data = { ...state.posts.data, ...arrToObj(posts.data.list) };
    state.posts.loadedColumns.push(columnId);
  },
  [SET_LOADING](state, status) {
    state.loading = status;
  },
  [SET_ERROR](state, error: ErrorProps) {
    state.error = error;
  },
  [UPDATEPOST](state, data) {
    state.posts.data[data._id] = data;
  },
  [DELETEPOST](state, { data }) {
    delete state.posts.data[data._id];
  }
};
