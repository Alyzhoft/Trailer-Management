import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import OffSiteLot from "./views/OffSiteLot";
import Search from "./views/Search";
import Requests from "./views/Requests";
import PrimaryLot from "./views/PrimaryLot";
import RVAC from "./views/RVAC";

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
      path: "/primarylot",
      name: "primarylot",
      component: PrimaryLot
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
      path: "/rvac",
      name: "rvac",
      component: RVAC
    }
  ]
});
