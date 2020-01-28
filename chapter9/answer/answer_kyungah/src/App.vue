<template>
  <div id="todo">
    <h1>TO DO LIST</h1>
    <todo-input></todo-input>
    <todo-list></todo-list>
    <clock></clock>
  </div>
</template>
<script>
import todoInput from './components/todoInput';
import todoList from './components/todoList';
import clock from './components/clock';

export default {
  name: 'app',
  components: {
    'todoInput': todoInput,
    'todoList': todoList,
    'clock':clock
  }
}
</script>
<style>
  #todo {
    width: 500px;
    margin: 0 auto;
  }
</style>
