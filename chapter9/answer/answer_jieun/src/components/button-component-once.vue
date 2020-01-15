<template>
    <div>
        <h3>한번만찍기</h3>
        <span :currentView="current">{{current}}</span>
    </div>
</template>
<script>
    export default {
        name: 'oncebutton',
        data() {
            return {
                current: "2020.01.16"
            }
        }
    }
</script>