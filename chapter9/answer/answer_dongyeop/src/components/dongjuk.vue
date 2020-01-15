<template>
    <div id="dongjuk">
        <button @click="changeTime('currentTime')">currentTime</button>
        <button @click.once="changeTime('isItNow')">isItNow</button>
        <keep-alive include="currentTime, isItNow">
            <component v-bind:is="currentView" :count="count"></component>
        </keep-alive>
    </div>
</template>
<script>
    import currentTime from './currentTime'
    import isItNow from './isItNow'
    window.console.log(currentTime.name);
    export default {
        name:'dongjuk',
        components : {
            currentTime,
            isItNow
        },
        created() {
            
        },
        data : function() {
            return {
                currentView : "",
                count : 0
            } 
        },
        methods : {
            changeTime(view) {
                if(view == 'currentTime') {
                    ++this.count;
                }
                this.currentView = view;
            }
        }
    }
</script>