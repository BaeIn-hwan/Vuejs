<template>
  <div id="app">
    <h1>TO DO LIST</h1>
    <div class="todoHeader">
      <input type="text" class="form-control" v-model="todoInput" @keyup.enter="addList">
      <button class="addList" @click="addList">추가</button>
    </div>
    <div class="todoLists">
      
    </div>
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      todoInput: "",
      todos: []
    }
  },
  methods: {
    addList() {
      this.todoInput.push(this.todos)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
