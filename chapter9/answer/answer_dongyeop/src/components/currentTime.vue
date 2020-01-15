<template>
    <div>
        <p>currentTime {{count}}</p>
        <p>{{ (new Date).toTimeString() }}</p>
    </div>
</template>
<script>
      export default {
        name : 'currentTime',
        props : [ 'count']
    }
</script>