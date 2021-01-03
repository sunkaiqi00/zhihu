import { LOGIN, CREATEPOST } from "./constant";
export default {
  [LOGIN](state) {
    state.user = { ...state.user, isLogin: true };
  },
  [CREATEPOST](state, post) {
    state.posts.push(post);
  }
};
