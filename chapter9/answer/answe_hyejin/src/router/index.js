import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import TodoList from '@/components/TodoList'
import TodoPage from '@/components/TodoPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    // {
    //   path: '/TodoList',
    //   name: 'TodoList',
    //   component: HelloWorld
    // },
    {
      path: '/todos',
      name: 'TodoPage',
      component: TodoPage
    }
  ]
})
