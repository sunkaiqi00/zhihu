import {
  LOGIN,
  CREATEPOST,
  SET_COLUMNS,
  SET_COLUMN,
  SET_POSTS,
  SET_LOADING
} from "./constant";
export default {
  [LOGIN](state) {
    state.user = { ...state.user, isLogin: true };
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
  }
};
