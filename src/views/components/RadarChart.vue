<template>
  <el-card>
    <template #header>
      <div class="title">订单状态雷达图</div>
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
    default: 'barChart',
  },
  className: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '200px',
    required: true,
  },
  height: {
    type: String,
    default: '200px',
    required: true,
  },
})
const options = {
  grid: {
    left: '2%',
    right: '2%',
    bottom: '10%',
    containLabel: true,
  },
  legend: {
    x: 'center',
    y: 'bottom',
    data: ['预定数量', '下单数量', '发货数量'],
    textStyle: {
      color: '#999',
    },
  },
  radar: {
    radius: '60%',
    indicator: [
      { name: '家用电器' },
      { name: '服装箱包' },
      { name: '运动户外' },
      { name: '手机数码' },
      { name: '汽车用品' },
      { name: '家具厨具' },
    ],
  },
  series: [
    {
      name: 'Radar chart',
      type: 'radar',
      itemStyle: {
        borderRadius: 6,
        color: function (params) {
          console.log(params)
          //自定义颜色
          const colorList = ['#179e61', '#1bc23d', 'rgb(255,3,6)']
          return colorList[params.dataIndex]
        },
      },
      data: [
        {
          value: [400, 400, 400, 400, 400, 400],
          name: '预定数量',
        },
        {
          value: [300, 300, 300, 300, 300, 300],
          name: '下单数量',
        },
        {
          value: [200, 200, 200, 200, 200, 200],
          name: '发货数量',
        },
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
  console.log(prop.id)

  chart.value = markRaw(echarts.init(document.getElementById(prop.id) as unknown as HTMLDivElement))
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
