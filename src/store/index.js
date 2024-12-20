import { createStore } from "vuex";
import { auth } from "./modules/auth.js";
import { data } from "./modules/data.js";
import { analytics } from "./modules/analytics.js";
import { layout } from "./modules/layout.js";


const store = createStore({
   modules: {
      auth,
      data,
      analytics, 
      layout
   },
});

export default store;