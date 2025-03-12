<template>
  <div class="search">
    <h1>查询</h1>
    <form @submit.prevent="searchDatabase">
      <input v-model="query" placeholder="输入查询条件" />
      <button type="submit">查询</button>
    </form>
    <div v-if="results.length">
      <h2>查询结果</h2>
      <ul>
        <li v-for="result in results" :key="result.id">{{ result }}</li>
      </ul>
    </div>
    <p v-else>这里是查询页面的内容。</p>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      query: '',
      results: [],
    }
  },
  methods: {
    async searchDatabase() {
      try {
        const encodedQuery = encodeURIComponent(this.query)
        const response = await fetch(`/api/search?query=${encodedQuery}`)

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`请求失败，状态码: ${response.status}, 错误信息: ${errorText}`)
        }

        this.results = await response.json()
      } catch (error) {
        console.error('查询失败:', error)
        alert(`查询失败: ${error.message}`)
      }
    },
  },
}
</script>

<style scoped>
.search {
  text-align: center;
  margin-top: 50px;
  min-height: 100vh;
}
</style>
