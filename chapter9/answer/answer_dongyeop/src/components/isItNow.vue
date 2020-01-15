<template>
    <div>
        <p>isItNow</p>
        <p>{{ (new Date).toTimeString() }}</p>
    </div>
</template>
<script>
    export default {
        name:'isItNow'
    }
</script>