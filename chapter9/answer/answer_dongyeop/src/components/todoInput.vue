<template>
    <div class="todoInput">
        <input type="text" v-model.trim="todoName" @keyup.13="addTodo">
        <button type="button" class="todoInputBtn" @click="addTodo">추가</button>
    </div>
</template>
<script>
    import eventBus from '../eventBus'
    export default {
        name : 'todoInput',
        data : function() {
            return {
                todoName : ""
            }
        },
        methods: {
            addTodo() {
                window.console.log(this.todoName);
                eventBus.$emit('add-todo',this.todoName);
            }
        }
    }
</script>
<style>
    .todoInput {
        overflow:hidden;
        border:1px solid #000;
        margin-bottom:10px;
    }
    .todoInput input[type=text] {
        float:left;
        box-sizing:border-box;
        width:calc(100% - 50px);
        padding:5px;
        color:#222;
    }
    .todoInput button {
        float:left;
        width:50px;
        padding:6px 0 7px;
        border:none;
        border-left:1px solid #000;
        background:#222;
        color:#fff;
    }
</style>