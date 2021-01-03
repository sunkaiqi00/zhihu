import { createStore } from "vuex";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import { StoreData } from "../typeings/interface";

const store = createStore<StoreData>({
  state: {
    loading: false,
    columns: [],
    posts: [],
    user: { isLogin: true, name: "开怀", columnId: 1 }
  },
  getters,
  mutations,
  actions
});
export default store;
