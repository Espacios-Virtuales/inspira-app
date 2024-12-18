import { createStore } from "vuex";
import { auth } from "./auth.module.js";
import { data } from "./data.module.js";
import { dashboards } from "./dashboards.module.js";

const store = createStore({
   modules: {
      auth,
      data,
      dashboards
   },
});

export default store;