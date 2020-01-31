import Vue from 'vue'
import Todolist from './components/Todolist.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Todolist),
}).$mount('#app')
