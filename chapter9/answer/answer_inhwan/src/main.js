import Vue from 'vue'
import TodoList from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(TodoList),
}).$mount('#app')