import Vue from 'vue'
import './components'

import { sync } from 'vuex-router-sync'

import App from './App'
import router from '@/router'
import store from '@/store'
import '@/plugins/vuetify'
import '@/plugins/axios'
import '@/plugins/chartist'

sync(store, router)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
