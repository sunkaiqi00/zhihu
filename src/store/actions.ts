import { LOGIN, CREATEPOST } from "./constant";
export default {
  login(context) {
    context.commit(LOGIN);
  },
  createPost({ commit }, post) {
    commit(CREATEPOST, post);
  }
};
