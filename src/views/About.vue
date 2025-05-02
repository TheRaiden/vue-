<template>
  <div class="air-conditioner">
    <h1>关于</h1>
  </div>

  <h2>操作记录</h2>
  <div class="table-container">
    <el-table :data="manageData" class="custom-table">
      <el-table-column prop="user" label="用户" width="180" :align="'left'"></el-table-column>
      <el-table-column prop="time" label="时间" width="180" :align="'left'"></el-table-column>
      <el-table-column prop="table_name" label="表名" width="180" :align="'left'"></el-table-column>
      <el-table-column prop="action" label="操作" width="180" :align="'left'"></el-table-column>
    </el-table>
  </div>

  <h2>登录信息</h2>
  <div class="table-container">
    <el-table :data="historyData" class="custom-table">
      <el-table-column prop="user" label="用户" width="180" :align="'left'"></el-table-column>
      <el-table-column prop="time" label="时间" width="180" :align="'left'"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
import { ElTable, ElTableColumn, ElButton } from 'element-plus'

export default {
  name: 'About',
  components: {
    ElTable,
    ElTableColumn,
    ElButton,
  },
  data() {
    return {
      tableData: [],
      isAdmin: true, // 默认管理员
      manageData: [], // Manage 表数据
      historyData: [], // History 表数据
    }
  },
  methods: {
    async fetchData() {
      try {
        const manageResponse = await axios.get('http://localhost:8000/api/manage') // 确保与后端接口一致
        this.manageData = manageResponse.data.map((item) => ({
          ...item,
          user: 'admin', // 将用户列默认为 admin
          time: new Date(item.time).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }), // 转换为北京时间
        }))

        const historyResponse = await axios.get('http://localhost:8000/api/history') // 确保与后端接口一致
        this.historyData = historyResponse.data.map((item) => ({
          ...item,
          time: new Date(item.time).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }), // 转换为北京时间
        }))
      } catch (error) {
        console.error('获取数据失败:', error)
      }
    },
    refreshData() {
      this.fetchData()
    },
    navigateTo(page) {
      this.$router.push(`/about/${page}`)
    },
  },
  async mounted() {
    this.fetchData()
  },
  created() {
    const userRole = localStorage.getItem('userRole') // 从本地存储获取用户角色
    this.isAdmin = userRole === 'admin' // 判断是否为管理员

    if (this.isAdmin) {
      this.fetchData()
    }
  },
}
</script>

<style scoped>
.air-conditioner {
  text-align: center;
  margin-left: 120px; /* 确保不与导航栏重叠 */
}

h1 {
  font-size: 34px; /* 增加标题字体大小 */
  margin-bottom: 20px;
  text-align: left; /* 设置标题居中 */
}

h2 {
  font-size: 30px;
  font-weight: bold;
  color: #000000;
  margin-top: 40px;
  margin-bottom: 20px;
  margin-left: 120px;
}

.table-container {
  margin-bottom: 130px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left; /* 确保表格容器内容居中 */
}

.custom-table {
  margin: 0 auto;
  width: 90%;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
}

.custom-table :deep(.el-table__header) {
  background-color: #f5f5f5;
  font-weight: bold;
  color: #000000;
}

.custom-table :deep(.el-table__row) {
  border-bottom: 1px solid #eee;
}

.custom-table :deep(.el-table__row:hover) {
  background-color: #f0f8ff;
}

.refresh-button {
  display: inline-block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.refresh-button:hover {
  background-color: #0056b3;
}

.navigation-buttons {
  text-align: center;
  margin-top: 30px;
}

.nav-button {
  margin: 0 15px;
  padding: 10px 25px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #000000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  background-color: #000000;
}

.delete-button {
  padding: 10px 25px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #dc3545;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #c82333;
}

.about {
  text-align: left;
  margin-top: 50px;
  min-height: 100vh;
  margin-left: 120px;
}
</style>
