import Vue from 'vue'
import answer from './answer.vue'


Vue.config.productionTip = false;

new Vue({
  render: v => v(answer)
}).$mount('#app');

// new Vue({
//     render: v => v(timestamp)
// }).$mount('#timeapp');

