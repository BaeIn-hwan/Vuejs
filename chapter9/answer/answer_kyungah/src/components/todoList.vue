<template>
    <div class="todoLists">
      <ul>
        <!--컴포넌트에서 v-for을 사용할때 key값이 필요-->
        <li v-for="todo in todoItems" v-bind:key="todo.idx" @click="todoStatus(todo, index)">{{todo.list}}</li>
      </ul>
    </div>
</template>

<script>
import eventBus from '../EventBus';

export default {
    created: function(){
        eventBus.$on('add-todo',this.addTodoList);
    },
    data: function(){
        return {
            todoItems: []
        }
    },
    methods: {
      //emit 메소드로 보냈던 todoInput 데이터 값을 받아 addTodoList 이벤트 실행 
        addTodoList(todoInput) {
             this.todoItems.push({
                list: todoInput,
                state: "active"
            });
        },
        todoStatus(todo) {
          this.todoItems.splice(this.todoItems.indexOf(todo),1)
        }
    }
}
</script>

<style>
ul {
  padding-left: 0;
}
li {
  width: 100%;
  box-sizing: border-box;
  list-style: none;
  text-align: left;
  border: 1px solid #bbb;
  border-radius: 5px;
  padding: 5px 10px;
  margin-bottom: 5px
}
li:hover {
  background: #eee;
}
li.checked {
  background: #bbb;
  color: #fff;
}
.todoLists {
  margin-top: 10px;
  padding: none;
  clear: both;
}
</style>