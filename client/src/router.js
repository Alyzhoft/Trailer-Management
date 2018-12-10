import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Dashboard from "./views/Dashboard.vue";
import TrailerEntry from "./views/TrailerEntry.vue";
import EditTrailer from "./views/EditTrailer";
import OffSiteLot from "./views/OffSiteLot";
import Departed from "./views/Departed";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/trailerentry",
      name: "trailerentry",
      component: TrailerEntry
    },
    {
      path: "/edittrailer",
      name: "edittrailer",
      component: EditTrailer
    },
    {
      path: "/offsitelot",
      name: "offsitelot",
      component: OffSiteLot
    },
    {
      path: "/departed",
      name: "departed",
      component: Departed
    }
  ]
});
