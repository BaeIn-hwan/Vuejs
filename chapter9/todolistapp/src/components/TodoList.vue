<style>
    * {  box-sizing: border-box;  }
    .header {
        background-color: purple; padding: 30px 30px;
        color: yellow; text-align: center;
    }
    .header:after {
        content: ""; display: table; clear: both;
    }
</style>
<template>
    <div id="todolistapp">
        <div id="header" class="header">
            <h2>Todo List App</h2>
            <input-todo />
        </div>
        <list></list>
    </div>  
</template>
<script type="text/javascript">
import InputTodo from './InputTodo';
import List from './List';
export default {
    name : 'todo-list',
    components : { InputTodo, List }
}
</script>
```

마지막 단계로 Todolist 컴포넌트를 main.js에서 렌더링 합니다.
```javascript
import Vue from 'vue'
import TodoList from './components/TodoList.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(TodoList)
}).$mount('#app')