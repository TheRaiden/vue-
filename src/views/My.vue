<template>
  <div class="my">
    <h1>我的</h1>
    <p>这里是我的页面的内容。</p>
    <form @submit.prevent="changePassword">
      <div>
        <label for="oldPassword">旧密码:</label>
        <input type="password" v-model="oldPassword" id="oldPassword" required />
      </div>
      <div>
        <label for="newPassword">新密码:</label>
        <input type="password" v-model="newPassword" id="newPassword" required />
      </div>
      <button type="submit">修改密码</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'My',
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      message: '',
    }
  },
  methods: {
    async changePassword() {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.post(
          'http://localhost:8000/change-password',
          {
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
          },
          {
            headers: {
              Authorization: token,
            },
          },
        )
        this.message = response.data.message
      } catch (error) {
        this.message = error.response.data.message || '修改密码失败'
      }
    },
  },
}
</script>

<style scoped>
.my {
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
