<template>
    <div>
        <div style="height: 50px; width: 100%">
            <button class="btn-dark float-right" style="margin-right: 150px;" @click="showListLength">총 개수</button>
        </div>
        <div class="mainTable">
            <table class="table">
                <thead>
                <tr>
                    <th>인덱스</th>
                    <th>순번</th>
                    <th>오늘의 할일</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in todoList" :key="item.id">
                    <td v-if="index === 0">인덱스가 0이면 출력</td>
                    <td v-else-if="index ===1">인덱스가 1이면 출력</td>
                    <td v-else>인덱스가 0도 1도 아니면 출력</td>
                    <td></td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'TodoList',
    props: {
      todoList: Array,
      showListLength: Function
    }
  }
</script>

<style scoped>
    .mainTitle {
        padding: 15px;
    }
    .mainTable tr th,
    .mainTable tr td {
        border: 1px solid green;
        border-collapse: collapse;
    }
</style>