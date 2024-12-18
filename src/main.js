import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import VueSweetalert2 from 'vue-sweetalert2';
import Datepicker from '@vuepic/vue-datepicker';
import Sticky from 'vue-sticky-directive'


import "bootstrap"
import '@vuepic/vue-datepicker/dist/main.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import './assets/css/main.css';
import './assets/css/alga.min.css';

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, fab, far);

createApp(App)
   .use(router)
   .use(store) 
   .use(VueSweetalert2)
   .use(Sticky)
   .component('Datepicker', Datepicker)
   .component("font-awesome-icon", FontAwesomeIcon)
   .mount('#app')


import "bootstrap/dist/js/bootstrap.bundle.js";
