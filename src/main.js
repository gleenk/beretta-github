import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import './assets/scss/app.scss'
import router from './router'
import store from './store'
import Axios from 'axios'

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}


Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


