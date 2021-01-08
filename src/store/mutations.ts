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
    state.posts.push(post.data);
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
  },
  [UPDATEPOST](state, data) {
    state.posts = state.posts.map(post => {
      if (post._id === data.data._id) {
        return data.data;
      } else {
        return post;
      }
    });
  },
  [DELETEPOST](state, { data }) {
    state.posts = state.posts.filter(post => post._id !== data._id);
  }
};
