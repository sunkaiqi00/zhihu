import {
  LOGIN,
  CURRENT_USER,
  CREATEPOST,
  SET_COLUMNS,
  SET_COLUMN,
  SET_POSTS,
  SET_LOADING,
  SET_ERROR
} from "./constant";
import { ErrorProps } from "@/typeings/interface";
export default {
  [LOGIN](state, data) {
    state.token = data.data.token;
  },
  [CURRENT_USER](state, data) {
    state.user = { isLogin: true, ...data.data };
  },
  [CREATEPOST](state, post) {
    state.posts.push(post);
  },
  [SET_COLUMNS](state, columns) {
    state.columns = columns.data.list;
  },
  [SET_COLUMN](state, column) {
    state.columns = [column.data];
  },
  [SET_POSTS](state, posts) {
    state.posts = posts.data.list;
  },
  [SET_LOADING](state, status) {
    state.loading = status;
  },
  [SET_ERROR](state, error: ErrorProps) {
    state.error = error;
  }
};
