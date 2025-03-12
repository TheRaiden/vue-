<template>
  <div class="add">
    <h1>新增</h1>
    <p>这里是新增页面的内容。</p>
    <form @submit.prevent="addItem">
      <div>
        <label for="itemName">名称:</label>
        <input type="text" v-model="itemName" id="itemName" required />
      </div>
      <div>
        <label for="itemHave">数量:</label>
        <input type="number" v-model="itemHave" id="itemHave" required />
      </div>
      <button type="submit">新增</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Add',
  data() {
    return {
      itemName: '',
      itemHave: '',
      message: '',
    }
  },
  methods: {
    async addItem() {
      try {
        const response = await axios.post('http://localhost:8000/api/add', {
          name: this.itemName,
          have: this.itemHave, // 修改字段名
        })
        this.message = response.data.message
      } catch (error) {
        this.message = error.response.data.message || '新增失败'
      }
    },
  },
}
</script>

<style scoped>
.add {
  text-align: center;
  margin-top: 50px;
  min-height: 100vh;
}
form {
  margin-top: 20px;
}
form div {
  margin-bottom: 10px;
}
</style>
