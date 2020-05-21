import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store/store";
import socketIO from "vue-socket.io";

Vue.config.productionTip = false;
Vue.use(socketIO, "http://localhost:3000/", store);
Vue.config.devtools = true;
Vue.config.errorHandler = function(err, vm, info) {
  alert(err);
};

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount("#app");
