<template>
    <div class="todoHeader">
        <input type="text" class="inputForm" v-model="todoInput" @keyup.enter="addTodo" placeholder="할 일을 입력해주세요">
        <button class="addList" @click="addTodo">추가</button>
    </div>
</template>

<script>
import eventBus from '../EventBus'
export default {
    data() {
        return {
            todoInput: "",
        }
    },
    methods: {
        addTodo() {
            if(this.todoInput == '') {
                alert('할 일을 입력해주세요');
            } else {
                eventBus.$emit('add-todo', this.todoInput);
                this.todoInput = "";
            }
        },
    }
}
</script>

<style>
.todoHeader {
  overflow: hidden;
}
.inputForm {
  float: left;
  width: 400px;
  padding: 10px;
  height: 40px;
  box-sizing: border-box;
}
button {
  width: 100px;
  float: left;
  height: 40px;
  background:sandybrown;
  border: none;
}
</style>