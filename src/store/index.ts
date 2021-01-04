import { createStore } from "vuex";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import { StoreData } from "../typeings/interface";

const store = createStore<StoreData>({
  state: {
    token: localStorage.getItem("token") || "",
    loading: false,
    columns: [],
    posts: [],
    user: { isLogin: false },
    error: {
      status: false
    }
  },
  getters,
  mutations,
  actions
});
export default store;
