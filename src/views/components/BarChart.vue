<!--  线 + 柱混合图 -->
<template>
  <el-card>
    <template #header>
      <div class="title flex justify-between">
        业绩柱状图
        <el-tooltip effect="dark" content="点击下载试试" placement="bottom">
          <i-ep-download class="download" @click="downloadEchart" />
        </el-tooltip>
      </div>
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
    default: 'barChart',
  },
  className: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '300px',
    required: true,
  },
  height: {
    type: String,
    defalut: '200px',
    required: true,
  },
})
const options = {
  //设置组件距离容器的距离
  grid: {
    left: '2%',
    right: '2%',
    bottom: '10%',
    containLabel: true,
  },
  // 颜色块提示
  legend: {
    x: 'center',
    y: 'bottom',
    data: ['收入', '毛利润', '收入增长率', '利润增长率'],
    textStyle: {
      color: '#999',
      fontSize: 12,
    },
  },
  // 鼠标经过提示
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999',
      },
    },
  },
  // x轴的设置
  xAxis: {
    type: 'category',
    data: ['浙江', '北京', '上海', '广东', '深圳'],
    axisPointer: {
      type: 'shadow',
    },
  },
  // y轴的设置
  yAxis: [
    {
      type: 'value',
      min: 0,
      max: 10000,
      // 强制设置坐标轴分割间隔
      interval: 2000,
      axisLabel: {
        formatter: '{value}',
      },
    },
    {
      type: 'value',
      min: 0,
      max: 100,
      interval: 20,
      axisLabel: {
        formatter: '{value} %',
      },
    },
  ],
  series: [
    {
      name: '收入',
      type: 'bar',
      data: [7000, 7100, 7200, 7300, 7400],
      barWidth: 20,
      itemStyle: {
        // 前4个参数用于配置渐变色的起止位置，这4个参数依次对应右/下/左/上四个方位，而0 0 0 1则代表渐变色从正上方开始
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' },
        ]),
      },
    },
    {
      name: '毛利润',
      type: 'bar',
      data: [8000, 8200, 8400, 8600, 8800],
      barWidth: 20,
      itemStyle: {
        // 前4个参数用于配置渐变色的起止位置，这4个参数依次对应右/下/左/上四个方位，而0 0 0 1则代表渐变色从正上方开始
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#25d73c' },
          { offset: 0.5, color: '#1bc23d' },
          { offset: 1, color: '#179e61' },
        ]),
      },
    },
    {
      name: '收入增长率',
      type: 'line',
      yAxisIndex: 1,
      data: [60, 65, 70, 75, 80],
      itemStyle: {
        color: '#67C23A',
      },
    },
    {
      name: '利润增长率',
      type: 'line',
      yAxisIndex: 1,
      data: [70, 75, 80, 85, 90],
      itemStyle: {
        color: '#409EFF',
      },
    },
  ],
}
//  加载chart实例
const chart = ref<any>('')
// 页面加载完成后会触发的生命周期函数
onMounted(() => {
  // 初始化图表
  // markRow   对响应式数据进行标记，使其不响应
  chart.value = markRaw(echarts.init(document.getElementById(prop.id) as HTMLDivElement))
  //  用来渲染出图表
  chart.value.setOption(options)
  // 大小自适应
  window.addEventListener('resize', () => {
    chart.value.resize()
  })
})
// 组件特有的生命周期函数   在组件被调用时触发
onActivated(() => {
  if (chart.value) {
    chart.value.resize()
  }
})
// 下载
const downloadEchart = () => {
  // 获取画布信息
  const img = new Image()
  img.src = chart.value.getDataURL({
    type: 'png',
    // 像素比
    pixelRatio: 1,
    backgroundColor: '#fff',
  })
  // 下载流程
  img.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.drawImage(img, 0, 0, img.width, img.height)
      const link = document.createElement('a')
      link.href = canvas.toDataURL('image/png', 0.9)
      link.download = '业绩柱状图.png'
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
  }
}
</script>
<style lang="scss" scoped>
.download {
  // 把鼠标变成小手
  cursor: pointer;
  // 鼠标经过  focus
  &:hover {
    color: #409eff;
  }
}
</style>
