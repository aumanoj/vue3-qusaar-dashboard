import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import category from './modules/category'
import subCategory from './modules/sub-category'
import tutorial from './modules/tutorial'
import blog from './modules/blog'
import auth from './modules/auth'
import sidemenu from './modules/side-menu'
import newsidemenu from './modules/new-side-menu'

import createPersistedState from "vuex-persistedstate";

export default store(function (/* { ssrContext } */) {
  const store = createStore({
    state:{

    },
    mutations:{

    },
    actions:{

    },
    modules: {
      category,
      subCategory,
      tutorial,
      blog,
      auth,
      sidemenu,
      newsidemenu
    },
    plugins: [createPersistedState()]
  })
  return store
})
