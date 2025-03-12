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
const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月'],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: '苹果',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series',
      },
      data: [1200, 1320, 1010, 1340, 900, 1300, 1100],
    },
    {
      name: '香蕉',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series',
      },
      data: [2200, 1802, 1910, 2340, 2100, 2300, 1900],
    },
    {
      name: '梨',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series',
      },
      data: [1500, 2320, 2010, 1540, 1900, 2300, 2100],
    },
    {
      name: '洗衣机',
      type: 'bar',
      stack: 'Search Engine',
      emphasis: {
        focus: 'series',
      },
      data: [3300, 3400, 3701, 3134, 3090, 2530, 2120],
    },
    {
      name: '空调',
      type: 'bar',
      stack: 'Search Engine',
      emphasis: {
        focus: 'series',
      },
      data: [1120, 1132, 1201, 1340, 1900, 2030, 2220],
    },
    {
      name: '冰箱',
      type: 'bar',
      stack: 'Search Engine',
      emphasis: {
        focus: 'series',
      },
      data: [600, 702, 710, 740, 1230, 1100, 1100],
    },
  ],
}
//  加载chart实例
const chart = ref<any>('')
// 页面加载完成后会触发的生命周期函数
onMounted(() => {
  // 初始化图表
  // markRaw 对响应式数据进行标记，使其不响应
  chart.value = markRaw(echarts.init(document.getElementById(prop.id) as HTMLDivElement))
  //  用来渲染出图表
  chart.value.setOption(option)
  // 大小自适应
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
