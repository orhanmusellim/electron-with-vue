import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Filebrowser from './views/Filebrowser.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  },
    {
      path: '/file-browser',
      name: 'Filebrowser',
      component: Filebrowser
    },
  ]
})