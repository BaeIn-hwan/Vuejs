<template>
    <div id="app">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
</template>
<script>
    import HelloWord from './components/HelloWords.vue'

    export default {
        name: 'app',
        components: {
            HelloWorld
        }
    }
</script>