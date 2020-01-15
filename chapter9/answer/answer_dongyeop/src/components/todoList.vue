<template>
    <ul class="todoList">
        <li v-for="item in todoData" :key="item.id" :class="{'checked':item.done}" @click="toggleState(item)">
            <p class="todoList-name">{{item.todoName}}</p>
            <p v-if="item.done" :class="[$style.state,$style.done]">완료</p>
            <p v-else :class="[$style.state,$style.yet]">미완료</p>
        </li>
    </ul>
</template>
<script>
    import eventBus from '../eventBus.js'
    export default {
        name : 'todoList',
        data : function() {
            return {
                todoData : [
                    { id:1 , todoName:'약국가기' , done:false }
                    ,{ id:2 , todoName:'안약사기' , done:false }
                    ,{ id:3 , todoName:'여행계획하기' , done:true }
                    ,{ id:4 , todoName:'숙제하기' , done:false }
                ]
            }
        },
        created() {
            eventBus.$on('add-todo',this.addTodo);
        },
        methods: {
            addTodo(todoName) {
                window.console.log(todoName);
                if(todoName == "") {
                    window.alert('a');
                }
                this.todoData.push(
                    {
                        id : new Date().getTime()
                        ,todoName
                        ,done : false
                    }
                )
            },
            toggleState(item) {
                item.done = !item.done;
            }
        }
    }
</script>
<style>
    .todoList {
        border:1px solid #000;
        background:#fff;
        padding:0;
    }
    .todoList li {
        overflow:hidden;
        padding:10px 20px;
        
    }
    .todoList li + li {
        border-top:1px solid #000;
    }
    .todoList li.checked {
        background:#ddd;
    }
    .todoList .todoList-name {
        float:left;
        width:calc(100% - 50px);
        color:#222;
    }
</style>
<style module>
    .state {float:left;width:50px;text-align:center;}
    .done {color:#0000fa;}
    .yet {color:#fa0000;}
</style>