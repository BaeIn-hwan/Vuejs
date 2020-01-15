<template>
  <div >
    <img alt="Vue logo" src="./assets/logo.png">
    <!--<HelloWorld msg=".js App"/>-->
    <div>
      <todoBox></todoBox>
    </div>
    <div>
      <dongjuk></dongjuk>
    </div>
    
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

import todoBox from './components/todoBox.vue'
import dongjuk from './components/dongjuk.vue'
export default {
  components: {
    todoBox,
    dongjuk
  }
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
