import Vue from 'vue'
import App from './App.vue'
import router from "@/router";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faCreditCard, faHeart, faSearchPlus, faSearch, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faAngleDown, faCreditCard, faHeart, faSearchPlus, faSearch, faEye)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

require("./assets/main.scss")

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
