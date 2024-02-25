import { createStore } from "vuex";
export default createStore({
  state: {
    isCollapse: true,
  },
  mutations: {
    changeCollapse(state) {
      state.isCollapse = !state.isCollapse;
    },
  },
  actions: {
    changeCollapse(context) {
      context.commit("changeCollapse");
    },
  },
});
