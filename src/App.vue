<template>
  <div id="app" class="app-background">
    <nav v-if="$store.state.isLoggedIn">
      <router-link to="/">首页</router-link>
      <div class="dropdown">
        <router-link to="/have">库存</router-link>
        <div class="dropdown"></div>
        <router-link to="/add">新增</router-link>
        <div class="dropdown"></div>
        <router-link to="/search">查询</router-link>
        <div class="dropdown"></div>
      </div>
      <div class="spacer"></div>
      <router-link to="/my">我的</router-link>
      <div class="dropdown"></div>
      <router-link to="/about">关于</router-link>
      <button @click="handleLogout">登出</button>
    </nav>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    handleLogout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
  },
}
</script>

<style>
nav {
  padding: 10px;
  display: flex;
  flex-direction: column; /* 修改为竖向排列 */
  background-color: rgba(248, 248, 248, 0.9); /* 修改为半透明背景 */
  border-right: 1px solid #ddd; /* 修改为右边框 */
  width: 114px; /* 修改宽度 */
  height: 100vh; /* 修改高度 */
  align-items: flex-start; /* 左对齐 */
  position: fixed; /* 使导航栏悬浮 */
  top: 0;
  left: 0;
  z-index: 1000; /* 确保导航栏在最上层 */
}

nav a,
nav button {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin-bottom: 20px;
  padding: 10px 38px; /* 调小按钮大小 */
  border-radius: 5px;
  transition:
    background-color 0.3s,
    color 0.3s;
  display: inline-block; /* 让按钮和链接都以相同方式显示 */
  font-size: inherit; /* 统一字体大小 */
}

nav button {
  background-color: red; /* 设置背景颜色为红色 */
}

nav a:hover {
  background-color: #42b983;
  color: #fff;
}

nav button:hover {
  /* 移除背景颜色变化 */
  color: #fff;
}

nav a.router-link-exact-active {
  background-color: #42b983;
  color: #fff;
}

.dropdown {
  display: flex;
  flex-direction: column;
}

.spacer {
  flex-grow: 1; /* 占据剩余空间 */
}

.content {
  margin-left: 120px; /* 确保内容不被导航栏遮挡 */
  padding-top: 20px;
}
</style>
