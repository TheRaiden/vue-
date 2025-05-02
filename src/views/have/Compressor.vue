<template>
  <div class="compressor">
    <h1>压缩机库存</h1>
    <el-button class="refresh-button" type="primary" @click="fetchData">刷新</el-button>
    <div class="table-container">
      <el-table :data="tableData" class="custom-table" style="margin-top: 20px">
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column prop="have" label="数量" width="180"></el-table-column>
        <el-table-column prop="company" label="公司" width="180"></el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button class="delete-button" type="danger" @click="deleteItem(scope.row.name)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="navigation-buttons">
      <el-button class="nav-button" type="success" @click="navigateTo('')">库存</el-button>
      <el-button class="nav-button" type="success" @click="navigateTo('Gear')">齿轮</el-button>
      <el-button class="nav-button" type="success" @click="navigateTo('air-conditioner')"
        >空调</el-button
      >
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { ElTable, ElTableColumn, ElButton } from 'element-plus'

export default {
  name: 'Compressor',
  components: {
    ElTable,
    ElTableColumn,
    ElButton,
  },
  data() {
    return {
      tableData: [],
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:8000/api/compressor')
        this.tableData = response.data
      } catch (error) {
        console.error('获取数据失败:', error)
      }
    },
    async deleteItem(name) {
      try {
        const response = await axios.post('http://localhost:8000/api/compressor/delete', {
          name,
        })
        this.$message.success(response.data.message)
        this.fetchData() // 删除后立即刷新数据
      } catch (error) {
        this.$message.error(error.response.data.message || '删除失败')
      }
    },
    navigateTo(page) {
      this.$router.push(`/have/${page}`)
    },
  },
  async mounted() {
    this.fetchData()
  },
}
</script>

<style scoped>
.compressor {
  text-align: left;
  margin-top: 50px;
  min-height: 100vh;
  margin-left: 120px;
}
.refresh-button {
  margin-bottom: 20px;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 8px;
  background-color: #69b4ff;
  color: #ffffff; /* 修改字体颜色为白色 */
  border: none; /* 移除黑色线 */
}
.custom-table {
  margin: 20px 0;
  width: 80%;
  border: 1px solid #ffffff;
  border-radius: 8px;
  overflow: hidden;
  background-color: #ffffff;
  border-collapse: collapse;
}
.custom-table :deep(.el-table__row) {
  border-bottom: 1px solid #dcdcdc;
}
.navigation-buttons {
  margin-top: 20px;
}
.nav-button {
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 8px;
  background-color: rgb(204, 195, 195);
  border: none; /* 移除黑色线 */
}
.delete-button {
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 8px;
  background-color: #ff7c7c;
  border: 1px solid #000000; /* 添加黑色线 */
}
.table-container {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
