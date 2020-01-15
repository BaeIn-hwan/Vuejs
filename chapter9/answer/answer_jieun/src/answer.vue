<template>
  <div>
    <section id="todoapp">
      <h2>문제 1번 나만의 TODOLIST 만들기</h2>
      <todolist></todolist>
    </section>
    <section id="timeapp">
      <h2>
        02. keep-alive 요소를 이용하여 버튼 한개는 클릭할 때마다 현재 시간 정보가 출력되도록 동적 컴포넌트를 생성하고,
        또다른 버튼은 한번만 시간이 출력되도록 만들어주세요.
      </h2>
      <timestamp></timestamp>
    </section>
  </div>
</template>

<script>
import todolist from './components/todolist-component.vue'
import timestamp from './components/time-component.vue'
export default {
  name: 'answer',
  components : { todolist, timestamp }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
