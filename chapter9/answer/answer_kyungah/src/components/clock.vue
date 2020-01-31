<template>
    <div id="clock">
        <button @click="showCurrent('currentTime1')">정적 컴포넌트</button>
        <button @click="showCurrent('currentTime2')">시간2</button>
        <!--컴포넌트 상태를 보존할 때 , 재 렌더링을 피할때 사용-->
        <keep-alive include="currentTime1">
            <!--is로 동적으로 바인딩-->
            <component v-bind:is="currentTime"></component>
        </keep-alive>
    </div>
</template>
<script>
import currentTime1 from './currentTime1';
import currentTime2 from './currentTime2';

export default {
    name: 'clock',
    components: {
        currentTime1,
        currentTime2
    },
    data : function() {
        return {
            currentTime : "",
        } 
    },
    methods: {
        showCurrent(view) {
            this.currentTime = view;
        }
    }
}
</script>
<style scoped>
    button {
        display: block;
        background: #fff;
        border: 1px solid #888
    }
    button:first-child {
        margin-right: 10px;
    }
</style>