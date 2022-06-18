import Vue from 'vue'
import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import $ from 'jquery'
import store from '../store/index'
import axios from 'axios'

//axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
axios.defaults.baseURL = 'https://www.tutorialandexample.com/api/'

export default route(function ({ store }) {

store.dispatch('auth/attempt',localStorage.getItem('token'))

axios.defaults.headers.common['Authorization'] = `Bearer `+localStorage.getItem('token')

store.subscribe((mutation)=>{
  switch(mutation.type){
    case 'auth/SET_TOKEN':
      if(mutation.payload){
        axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`
        localStorage.setItem('token',mutation.payload)
      } else {
        axios.defaults.headers.common['Authorization'] = null
      }
      break;
  }
})
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    store,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })
  Router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiredAuth)) {
    console.log(store.getters['auth/authenticated'])
    if (store.getters['auth/authenticated']) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

  return Router
})
