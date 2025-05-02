<template>
  <div ref="chart" style="width: 100%; height: 400px"></div>
</template>

<script>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import axios from 'axios'

export default {
  name: 'ChartComponent',
  setup() {
    const chart = ref(null)
    const options = ref({
      xAxis: {
        type: 'category',
        data: [],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [],
          type: 'bar',
        },
      ],
    })

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/names')
        const data = response.data
        options.value.xAxis.data = data.map((item) => `${item.name} (${item.company})`) // 显示名称和公司
        options.value.series[0].data = data.map((item) => item.have)
        chart.value.setOption(options.value)
      } catch (error) {
        console.error('获取数据失败:', error)
      }
    }

    onMounted(() => {
      chart.value = echarts.init(document.querySelector('[ref="chart"]'))
      fetchData()
    })

    return {
      chart,
    }
  },
}
</script>

<style scoped>
div {
  margin: 20px auto;
}
</style>
