<template>
	<div id="app">
		<todo></todo>
	</div>
</template>
<script>
import todo from './components/todo.vue';

export default {
  components : { todo },
}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
	}

	ul {
		list-style: none;
	}
</style>
