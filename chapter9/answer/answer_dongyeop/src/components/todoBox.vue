<template>
    <div id="todoBox">
        <div>
            <todoInput></todoInput>
        </div>
        <div>
            <todoList></todoList>
        </div>
    </div> 
</template>
<script>
    import todoInput from './todoInput.vue';
    import todoList from './todoList.vue';

    export default {
        name : 'todoBox',
        components : {todoInput, todoList},
        date : function() {
            return {

            }
        },
    }
</script>
<style>
    #todoBox {
        padding:10px;
        background:#fea;
    }
</style>