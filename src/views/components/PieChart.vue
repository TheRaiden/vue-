<template>
  <el-card>
    <template #header>
      <div class="title">饼图</div>
    </template>
    <div :id="id" :class="className" :style="{ height, width }"></div>
  </el-card>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, onActivated, markRaw } from 'vue'
const prop = defineProps({
  id: {
    type: String,
    default: 'pieChart',
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
const options = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: '5%',
    left: 'center',
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 580, name: '邮件营销' },
        { value: 484, name: '联盟广告' },
        { value: 300, name: '视频广告' },
      ],
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
  chart.value.setOption(options)
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
