import { boot } from 'quasar/wrappers'
import axios from 'axios'

// file: /src/boot/register-my-component.js
import MobileHeader from '../components/MobileHeader.vue'

let user= JSON.parse(localStorage.getItem('user'));
if(user!=null) {
  axios.defaults.headers.common['Authorization'] = 'Bearer' + user.token
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'https://api.alrestion.com/api/v1/panel' })

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  app.component('mobile-header', MobileHeader)
})

export { api }
