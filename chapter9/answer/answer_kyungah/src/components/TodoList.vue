<style>
    * {  box-sizing: border-box;  }
    .header {
        background-color: purple; padding: 30px 30px;
        color: yellow; text-align: center;
    }
    .header:after {
        content: ""; display: table; clear: both;
    }
</style>
<template>
    <div id="todolistapp">
        <div id="header" class="header">
            <h2>TO DO LIST</h2>
            <todo-input />
        </div>
        <list></list>
    </div>  
</template>
<script type="text/javascript">
import todoInput from './todoInput';
import List from './List';
export default {
    name : 'todo-list',
    components : { todoInput, List }
}
</script>
