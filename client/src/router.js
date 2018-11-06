import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import TrailerEntry from './views/TrailerEntry.vue'
import TrailerManagement from './views/TrailerManagement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/trailerentry',
      name: 'trailerentry',
      component: TrailerEntry
    },
    {
      path: '/trailermanagement',
      name: 'trailermanagement',
      component: TrailerManagement
    }
  ]
})
