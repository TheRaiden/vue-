<template>
  <el-card>
    <template #header>
      <div class="title">my2Chart</div>
    </template>
    <div :id="id" :class="className" :style="{ height, width }"></div>
  </el-card>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { ref, onMounted, onActivated, markRaw } from 'vue'
import axios from 'axios'

const prop = defineProps({
  id: {
    type: String,
    default: 'myChart',
  },
  className: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '600px',
    required: true,
  },
  height: {
    type: String,
    default: '400px',
    required: true,
  },
})

const options = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    data: ['空调'], // 修改图例名称
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: [], // 动态加载数据
    axisLabel: {
      interval: 0, // 保证所有标签显示
    },
    axisTick: {
      alignWithLabel: true,
    },
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '空调', // 修改系列名称
      type: 'bar',
      data: [], // 动态加载数据
      barWidth: 30, // 固定柱宽度
      itemStyle: {
        color: '#42b983',
      },
    },
  ],
})

// 获取数据并更新图表
const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/air')
    const data = response.data
    options.value.xAxis.data = data.map((item: any) => `${item.name} (${item.company})`) // 显示名称和公司
    options.value.series[0].data = data.map((item: any) => item.have)
    chart.value.setOption(options.value)
  } catch (error) {
    console.error('获取数据失败:', error)
  }
}

// 加载图表实例
const chart = ref<any>('')
onMounted(() => {
  chart.value = markRaw(echarts.init(document.getElementById(prop.id) as HTMLDivElement))
  fetchData() // 加载数据
  window.addEventListener('resize', () => {
    chart.value.resize()
  })
})

// 组件特有的生命周期函数 在组件被调用时触发
onActivated(() => {
  if (chart.value) {
    chart.value.resize()
  }
})
</script>
