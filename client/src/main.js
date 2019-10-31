import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import { store } from "./store/store";
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false
Vue.use(VueSocketIO, "http://localhost:3000/", store);

Vue.config.devtools = true;

new Vue({
  router,
  store: store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
