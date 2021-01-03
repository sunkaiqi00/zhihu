import { createStore } from "vuex";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import { testData, testPosts, user } from "../testData";
import { StoreData } from "../typeings/interface";

const store = createStore<StoreData>({
  state: {
    columns: testData,
    posts: testPosts,
    user
  },
  getters,
  mutations,
  actions
});
export default store;
