import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { store } from "./store/store";
import VueSocketIO from "vue-socket.io";

Vue.config.productionTip = false;
Vue.use(VueSocketIO, "http://localhost:3000/", store);

Vue.config.devtools = true;

router.beforeEach((to, from, next) => {
  const user = store.getters.getUser;

  if (user.length == 0) {
    next("/message");
  } else {
    next();
  }
});

new Vue({
  router,
  store: store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
