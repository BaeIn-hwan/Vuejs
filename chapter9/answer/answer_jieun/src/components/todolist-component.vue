<template>
    <section class="vue__todo">
        <h3>2020년도 PLAN</h3>
        <ul id="todo" class="vue__todo__list">
            <li :class="list.done ? 'done' : ''" v-for="(list, index) in todoLists" :key="index">
                <span>{{list.text}}</span>
                <button @click="list.done ? list.done = false : list.done = true" v-html="list.done ? '진행중' : '완료'"></button>
                <button @click="deleteFromList($event, list.num)">삭제</button>
            </li>
        </ul>
        <div>
            <input type="text" v-model="inputTodo">
            <button @click="addToList($event)">추가하기</button>
        </div>
    </section>
</template>
<script type="text/javascript">
    export default {
        name : 'todolist',
        data() {
            return {
                todoLists: [{
                    num: 0,
                    text: "vuejs 공부하기",
                    done: false
                }],
                inputTodo: null,
                validationCheck: false,
            }
        },

        watch: {
            inputTodo: {
                handler(newValue) {
                   newValue.length ? this.validationCheck = true : this.validationCheck = false;
                }
            }
        },

        methods: {
            addToList: function() {
                if (this.validationCheck) {
                    this.todoLists.push({
                        num: new Date().getTime(),
                        text: this.inputTodo,
                        done: false
                    });
                    this.inputTodo = "";
                } else {
                    alert("한 글자 이상 입력해주세요.");
                }

            },

            deleteFromList: function($event, num) {
                this.todoLists = this.todoLists.filter(v => v.num !== num);
            }
        }
    }
</script>
<style>
    .done {
        text-decoration: line-through;
    }
</style>
