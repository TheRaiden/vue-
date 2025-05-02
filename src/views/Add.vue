<template>
  <div class="add">
    <h1>新增</h1>
    <p>这里可以新增数据</p>
    <form @submit.prevent="addItem" class="add-form">
      <div class="form-item">
        <label for="itemName">名称:</label>
        <input type="text" v-model="itemName" id="itemName" required />
      </div>
      <div class="form-item">
        <label for="itemHave">数量:</label>
        <input type="number" v-model="itemHave" id="itemHave" required />
      </div>
      <div class="form-item">
        <label for="database">选择数据:</label>
        <select v-model="selectedDatabase" id="database" required>
          <option value="names">仓库</option>
          <option value="air">空调</option>
          <option value="gear">齿轮</option>
          <option value="compressor">压缩机</option>
        </select>
      </div>
      <div class="form-item">
        <label for="company">公司:</label>
        <select v-model="company" id="company" required>
          <option value="甲公司">甲公司</option>
          <option value="乙公司">乙公司</option>
          <option value="丙公司">丙公司</option>
        </select>
      </div>
      <div class="form-actions">
        <button type="submit" class="submit-button">新增</button>
        <p v-if="message" class="message">{{ message }}</p>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Add',
  data() {
    return {
      itemName: '', // 保持字段名称一致
      itemHave: '', // 保持字段名称一致
      selectedDatabase: 'air', // 默认选择数据库
      company: '甲公司', // 默认选择“甲公司”
      message: '',
    }
  },
  methods: {
    async addItem() {
      try {
        const response = await axios.post(
          `http://localhost:8000/api/${this.selectedDatabase}/add`,
          {
            name: this.itemName,
            have: this.itemHave,
            company: this.company,
          },
        )
        this.message = response.data.message
        this.resetForm() // 提交成功后重置表单
      } catch (error) {
        this.message = error.response?.data?.message || '新增失败'
      }
    },
    resetForm() {
      this.itemName = ''
      this.itemHave = ''
      this.selectedDatabase = 'air' // 重置为默认值
      this.company = '甲公司' // 重置为默认值
    },
  },
}
</script>

<style scoped>
.add {
  text-align: left;
  margin-top: 50px;
  min-height: 100vh;
  margin-left: 120px; /* 确保不与导航栏重叠 */
  font-size: 18px; /* 增加整体字体大小 */
}
h1 {
  font-size: 34px; /* 增加标题字体大小 */
  margin-bottom: 20px;
}
.add-form {
  margin-top: 20px;
  width: 60%;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 18px; /* 设置表单字体大小 */
}
.form-item {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
label {
  width: 100px;
  font-size: 18px; /* 增加标签字体大小 */
  font-weight: bold;
}
input,
select {
  flex: 1;
  padding: 10px;
  font-size: 18px; /* 增加输入框和选择框字体大小 */
  border: 1px solid #dcdcdc;
  border-radius: 4px;
}
.form-actions {
  text-align: center;
  margin-top: 20px;
}
.submit-button {
  padding: 10px 20px;
  font-size: 18px; /* 增加按钮字体大小 */
  border-radius: 8px;
  background-color: #409eff;
  color: #ffffff;
  border: none;
  cursor: pointer;
}
.submit-button:hover {
  background-color: #66b1ff;
}
.message {
  margin-top: 10px;
  font-size: 18px; /* 增加提示信息字体大小 */
  color: #67c23a;
}
</style>
