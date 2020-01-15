<template>
    <div>
        <h1>Home</h1>
        <span>{{current}}</span>
    </div>
</template>
<script>
    export default {
        name: 'keepbutton',
        data() {
            return {
                current: new Date().toLocaleTimeString()
            }
        }
    }
</script>