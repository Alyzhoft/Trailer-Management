import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import OffSiteLot from "./views/OffSiteLot";
import Search from "./views/Search";
import Requests from "./views/Requests";
import NewLot from "./views/NewLot";
import Admin from "./views/Admin";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/offsitelot",
      name: "offsitelot",
      component: OffSiteLot
    },
    {
      path: "/newlot",
      name: "newlot",
      component: NewLot
    },
    {
      path: "/search",
      name: "search",
      component: Search
    },
    {
      path: "/requests",
      name: "requests",
      component: Requests
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin
    }
  ]
});
