// Importaciones principales
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Plugins y bibliotecas externas
import VueSweetalert2 from 'vue-sweetalert2';
import Datepicker from '@vuepic/vue-datepicker';
import Sticky from 'vue-sticky-directive';

// CSS de bibliotecas
import '@vuepic/vue-datepicker/dist/main.css';
import 'sweetalert2/dist/sweetalert2.min.css';

// Bootstrap y SCSS personalizados
import './assets/scss/main.scss'; // carga el a CSS ya transformado con bootstrap incluido
import './assets/scss/alga.min.css'; // Si sigue siendo necesario - lo vamos desacoplar en el avance ya que haremos que los filtros los haga el backend

// jQuery (opcional, si es necesario)
import $ from 'jquery';
window.$ = $;

// Iconos de FontAwesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, fab, far);

// Configuración de la aplicación
const app = createApp(App);

// Plugins
app.use(router);
app.use(store);
app.use(VueSweetalert2);
app.use(Sticky);

// Componentes globales
// Cambiar el nombre al registrar el componente
app.component('BaseDatepicker', Datepicker);
app.component('font-awesome-icon', FontAwesomeIcon);

// Montar la aplicación
app.mount('#app');

