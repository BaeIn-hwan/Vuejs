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
                //emit 메소드로 이벤트 전달. 첫 번째 파라미터 > 이벤트 채널 이름, 두 번째 파라미터 > 이벤트가 발생했을때 같이 내보내고 싶은 데이터
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