<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'TodoPage',
  data () {
    return {
      todos: [
        {
          name:'청소'
        },
        {
          name:'블로그 쓰기'
        },
        {
          name:'밥먹기'
        },
        {
          name:'안녕'
        }
      ]
    }
  }
}
</script>