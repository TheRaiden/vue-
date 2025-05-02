<template>
  <div class="home">
    <h1>欢迎来到供应链管理系统</h1>
    <div class="dashboard-container">
      <div class="chart-wrapper">
        <div class="chart-container">
          <My1Chart ref="my1Chart" id="my1Chart" class="chart" />
        </div>
        <div class="description-container">
          <p>这是第一个图表的描述。</p>
        </div>
      </div>
      <div class="chart-wrapper">
        <div class="chart-container">
          <myChart ref="myChart" id="myChart" class="chart" />
        </div>
        <div class="description-container">
          <p>这是第二个图表的描述。</p>
        </div>
      </div>
      <div class="chart-wrapper">
        <div class="chart-container">
          <my2Chart ref="my2Chart" id="my2Chart" class="chart" />
        </div>
        <div class="description-container">
          <p>这是第三个图表的描述。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myChart from './components/myChart.vue'
import my2Chart from './components/my2Chart.vue'
import My1Chart from './components/My1Chart.vue'

export default {
  name: 'HomePage',
  components: {
    myChart,
    my2Chart,
    My1Chart,
  },
  data() {
    return {}
  },
  created() {
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
h1 {
  font-size: 34px;
  margin-bottom: 20px;
}

.home {
  text-align: left;
  margin-top: 50px;
  min-height: 100vh;
  margin-left: 120px;
}

.dashboard-container {
  margin-top: 20px;
}

.chart-wrapper {
  display: flex;
  margin-bottom: 20px;
}

.chart-container {
  width: 60%;
  height: 400px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.description-container {
  width: 30%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.description-container p {
  font-size: 16px;
  color: #333;
  text-align: center;
  margin: 0;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
