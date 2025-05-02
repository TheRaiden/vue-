<template>
  <div class="my">
    <div class="user-info">当前登录用户: {{ currentUser }}</div>
    <h1>我的</h1>
    <form @submit.prevent="changePassword" class="form">
      <h2>修改密码</h2>
      <div class="form-item">
        <label for="oldPassword">旧密码:</label>
        <input type="password" v-model="oldPassword" id="oldPassword" required />
      </div>
      <div class="form-item">
        <label for="newPassword">新密码:</label>
        <input type="password" v-model="newPassword" id="newPassword" required />
      </div>
      <div class="form-actions">
        <button type="submit" class="submit-button">修改密码</button>
      </div>
    </form>
    <form @submit.prevent="registerUser" class="form">
      <h2>注册用户</h2>
      <div class="form-item">
        <label for="newUsername">用户名:</label>
        <input type="text" v-model="newUsername" id="newUsername" required />
      </div>
      <div class="form-item">
        <label for="newUserPassword">密码:</label>
        <input type="password" v-model="newUserPassword" id="newUserPassword" required />
      </div>
      <div class="form-actions">
        <button type="submit" class="submit-button">注册</button>
      </div>
    </form>
    <!-- 弹窗 -->
    <div v-if="showDialog" class="dialog-overlay">
      <div class="dialog">
        <p>{{ dialogMessage }}</p>
        <button @click="closeDialog" class="dialog-button">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'My',
  data() {
    return {
      currentUser: JSON.parse(localStorage.getItem('user'))?.username || '未登录',
      oldPassword: '',
      newPassword: '',
      newUsername: '',
      newUserPassword: '',
      showDialog: false,
      dialogMessage: '',
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
        this.showDialog = true
        this.dialogMessage = response.data.message
      } catch (error) {
        this.showDialog = true
        this.dialogMessage = error.response.data.message || '修改密码失败'
      }
    },
    async registerUser() {
      try {
        const response = await axios.post('http://localhost:8000/register', {
          username: this.newUsername,
          password: this.newUserPassword,
        })
        this.showDialog = true
        this.dialogMessage = response.data.message
      } catch (error) {
        this.showDialog = true
        this.dialogMessage = error.response.data.message || '注册失败'
      }
    },
    closeDialog() {
      this.showDialog = false
      this.dialogMessage = ''
    },
  },
}
</script>

<style scoped>
.my {
  text-align: left;
  margin-top: 50px;
  min-height: 100vh;
  margin-left: 120px; /* 确保不与导航栏重叠 */
  font-size: 16px;
  font-family: 'Arial', sans-serif;
  position: relative; /* 为右上角定位提供基础 */
}
.user-info {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #000000;
  background-color: #8fc6fefa;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
h1 {
  font-size: 34px;
  margin-bottom: 20px;
}
.form {
  margin-top: 20px;
  width: 60%;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
h2 {
  font-size: 22px;
  margin-bottom: 20px;
}
.form-item {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
label {
  width: 120px;
  font-size: 16px;
  font-weight: bold;
}
input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
}
.form-actions {
  text-align: center; /* 将按钮容器居中 */
  margin-top: 20px;
}
.submit-button {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  background-color: #409eff;
  color: #ffffff;
  border: none;
  cursor: pointer;
}
.submit-button:hover {
  background-color: #66b1ff;
}
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.dialog {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 400px; /* 设置固定宽度 */
  height: 200px; /* 设置固定高度 */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 消息和按钮均匀分布 */
  align-items: center; /* 水平居中内容 */
}
.dialog p {
  margin: auto 0; /* 消息在竖直方向居中 */
}
.dialog-button {
  margin-top: auto; /* 将按钮推到弹窗底部 */
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  background-color: #409eff;
  color: #ffffff;
  border: none;
  cursor: pointer;
}
.dialog-button:hover {
  background-color: #66b1ff;
}
</style>
