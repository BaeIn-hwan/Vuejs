<template>
  <div id="todo">
    <h1>TO DO LIST</h1>
    <todo-input></todo-input>
    <todo-list></todo-list>
  </div>
</template>
<script>
import todoInput from './components/todoInput';
import todoList from './components/todoList';

export default {
  name: 'app',
  components: {
    'todoInput': todoInput,
    'todoList': todoList,
  }
}
</script>
<style>
  #todo {
    width: 500px;
    margin: 0 auto;
  }
</style>
