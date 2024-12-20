import { DATA } from "../types.js";

export const data = {
  namespaced: true,
  state: () => ({
    date: "",
    id: null,
  }),
  mutations: {
    [DATA.SET_DATE](state, date) {
      state.date = date;
    },
    [DATA.SET_ID](state, id) {
      state.id = id;
    },
  },
  actions: {
    setDate({ commit }, date) {
      commit(DATA.SET_DATE, date);
    },
    setId({ commit }, id) {
      commit(DATA.SET_ID, id);
    },
  },
};
