import AnalyticsService from "../../services/analytics-service";
import { DASHBOARDS } from "../types";

export const analytics = {
  namespaced: true,
  state: () => ({
    product: null,
    audience: null,
    salesDay: null,
  }),
  mutations: {
    [DASHBOARDS.SET_PRODUCT](state, product) {
      state.product = product;
    },
    [DASHBOARDS.SET_AUDIENCE](state, audience) {
      state.audience = audience;
    },
    [DASHBOARDS.SET_SALESDAY](state, salesDay) {
      state.salesDay = salesDay;
    },
  },
  actions: {
    async updateProduct({ commit }) {
      const product = await AnalyticsService.productCount();
      commit(DASHBOARDS.SET_PRODUCT, product);
    },
    async updateAudience({ commit }) {
      const audience = await AnalyticsService.audienceCount();
      commit(DASHBOARDS.SET_AUDIENCE, audience);
    },
    async updateSalesDay({ commit }) {
      const salesDay = await AnalyticsService.salesDayCount();
      commit(DASHBOARDS.SET_SALESDAY, salesDay);
    },
  },
};

