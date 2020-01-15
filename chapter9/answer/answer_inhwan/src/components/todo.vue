<template>
	<div>
		<div class="insertArea">
			<input type="text" class="insertArea-text" id="input" v-model="todo" placeholder="입력하세요." @keyup.enter="insertTodo">
        	<button type="button" class="btn btn-black" @click="insertTodo">저장</button>
		</div>

		<ul>
			<li v-for="(list, index) in todoList" :key="index">
				<div>{{index+1}}.{{todoList[index]}}</div>
				<button type="button" @click="deleteTodo($event, index)">삭제</button>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name : 'todo',
	data() {
		return {
			todo: "",
			todoList: [],
		}
	},
	methods: {
		insertTodo() {
			if ( this.todo == "" ) {
				alert("글씨를 입력하세요.");
			} else {
				this.todoList.push(this.todo);
				this.todo = "";
			}
			
		},
		deleteTodo(e, idx) {
			this.todoList.splice(idx, 1);
		}
	}
}
</script>

<style lang="scss">
	* {
		margin: 0;
		padding: 0;
	}

	ul {
		list-style: none;
	}

	input {
		vertical-align: top;
	}

	.insertArea {
		position: relative;
		width: 100%;
		padding-right: 100px;
		box-sizing: border-box;

		&-text {
			width: 100%;
			height: 42px;
			padding: 0 15px;
			border: 1px solid #d2d2d2;
			box-sizing: border-box;
		}

		.btn {
			position: absolute;
			top: 0;
			right: 0;
			width: 100px;
			height: 42px;
			border: 1px solid #000;
			background: #000;
			color: #FFF;
			font: {
				size: 16px;
				weight: 600;
			}
		}
	}
</style>
