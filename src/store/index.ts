import { createStore } from "vuex";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import { StoreData } from "../typeings/interface";

function getLocalUser() {
  const data = localStorage.getItem("user");
  if (data) {
    return JSON.parse(data);
  }
}
const store = createStore<StoreData>({
  state: {
    token: localStorage.getItem("token") || "",
    loading: false,
    columns: { data: {}, currentPage: 0, total: 0 },
    posts: { data: {}, loadedColumns: [] },
    user: getLocalUser() || { isLogin: false },
    error: {
      status: false
    }
  },
  getters,
  mutations,
  actions
});
export default store;
