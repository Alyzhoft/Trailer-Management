import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store/store";
import socketIO from "vue-socket.io";

Vue.config.productionTip = false;
Vue.use(socketIO, "https://trailermanagementbe.azurewebsites.net/", store);
Vue.config.devtools = true;

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount("#app");
