<template>
  <div class="have">
    <h1>库存</h1>
    <div id="lineChart" class="chart"></div>
  </div>
</template>

<script>
import axios from 'axios'
import * as echarts from 'echarts'

export default {
  name: 'Have',
  data() {
    return {
      chart: null,
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:8000/api/names')
      const data = response.data

      const names = data.map((item) => item.name)
      const values = data.map((item) => item.value)

      this.chart = echarts.init(document.getElementById('lineChart'))
      const options = {
        title: {
          text: '库存折线图',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: names,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: values,
            type: 'line',
          },
        ],
      }
      this.chart.setOption(options)
    } catch (error) {
      console.error('获取数据失败:', error)
    }
  },
}
</script>

<style scoped>
.have {
  text-align: center;
  margin-top: 50px;
  min-height: 100vh;
}
.chart {
  width: 100%;
  height: 400px;
}
</style>
