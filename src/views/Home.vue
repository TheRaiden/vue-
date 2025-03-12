<template>
  <div class="home">
    <div class="dashboard-container">
      <div class="chart-container">
        <RadarChart id="radarChart" class="chart" />
      </div>
      <div class="chart-container">
        <PieChart id="pieChart" class="chart" />
      </div>
      <div class="chart-container">
        <myChart id="myChart" class="chart" />
      </div>
      <div class="chart-container">
        <my2Chart id="my2Chart" class="chart" />
      </div>
      <div class="chart-container">
        <BarChart id="barChart" class="chart" />
      </div>
    </div>
  </div>
</template>

<script>
import RadarChart from './components/RadarChart.vue'
import myChart from './components/myChart.vue'
import my2Chart from './components/my2Chart.vue'
import BarChart from './components/BarChart.vue'
import PieChart from './components/PieChart.vue'

export default {
  name: 'HomePage',
  components: {
    RadarChart,
    myChart,
    my2Chart,
    BarChart,
    PieChart,
  },
  created() {
    //检查登录状态
    if (!this.$store.state.isLoggedIn) {
      this.$router.push('/login')
    }
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
  min-height: 100vh;
}
.chart {
  width: 100%;
  height: 100%;
}
.dashboard-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* 使用CSS Grid布局 */
  gap: 20px; /* 设置网格间距 */
  padding: 20px 30px;
}
.chart-container {
  width: 400px; /* 固定宽度 */
  height: 500px; /* 固定高度 */
  margin-bottom: 20px;
  border: 1px solid #ddd; /* 添加边框 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
