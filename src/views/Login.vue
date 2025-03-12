<template>
  <div class="login-wrapper">
    <div v-if="!isLoggedIn" class="login-background">
      <div class="login-header">
        <h1>欢迎来到供应链管理系统</h1>
      </div>
      <div class="login-container">
        <h2>登录</h2>
        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label for="username">用户名:</label>
            <input
              type="text"
              id="username"
              v-model="username"
              required
              placeholder="请输入用户名"
            />
          </div>
          <div class="input-group">
            <label for="password">密码:</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              placeholder="请输入密码"
            />
          </div>
          <button type="submit">登录</button>
        </form>
        <p v-if="error">{{ error }}</p>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UserLogin',
  data() {
    return {
      username: '',
      password: '',
      error: null,
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn
    },
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:8000/login', {
          username: this.username,
          password: this.password,
        })
        console.log('登录成功:', response.data)
        this.error = null
        this.$store.commit('setLoggedIn', true)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        this.$router.push({ name: 'Home' })
      } catch (error) {
        console.error('登录失败:', error.response.data)
        this.error = '用户名或密码错误'
      }
    },
  },
}
</script>

<style scoped>
/* 样式... */
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden; /* 隐藏滚动条 */
}

.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* 确保容器至少占满视口高度 */
  background-image: url('https://example.com/your-background-image.jpg'); /* 替换为你的背景图片路径 */
  background-size: cover;
  background-position: center;
}

.login-header {
  margin-bottom: 40px;
}

.login-header h1 {
  color: #007bffd2; /* 设置文字颜色为蓝色 */
  text-align: center;
  font-size: 48px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  animation: fadeInUp 1s ease; /* 添加动画效果 */
}

.login-container {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(15px);
  animation: fadeIn 1s ease; /* 添加动画效果 */
}

.login-container h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 28px;
}

.input-group {
  margin-bottom: 20px;
  position: relative;
}

.login-container label {
  display: block;
  margin-bottom: 8px;
  color: #666;
  font-weight: bold;
  transition: color 0.3s ease;
}

.login-container input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.login-container input:focus {
  border-color: #42b983;
  outline: none;
  box-shadow: 0 0 10px rgba(66, 185, 131, 0.3);
}

.login-container button {
  width: 100%;
  padding: 14px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

.login-container button:hover {
  background-color: #369d73;
  transform: translateY(-2px);
}

.login-container p {
  color: red;
  text-align: center;
  margin-top: 20px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
