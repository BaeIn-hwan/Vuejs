<template>
  <div id="app">
    {{ message }}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: 'HAPPY NEW YEAR :-)',
      };
    },
  };
</script>

<style>
  #app {
    margin-top: 50px;
    font-size: 50px;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    color: red;
  }
</style>