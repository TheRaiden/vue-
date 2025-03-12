<template>
  <el-card>
    <template #header>
      <div class="title">myChart</div>
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

// 原始数据数组，包含两组数据，第一组是存活数据，第二组是死亡数据
const rawData = [
  [546, 302, 301, 334, 390, 330, 320], // 存活数据
  [320, 132, 101, 134, 90, 230, 210], // 死亡数据
]

// 用于存储每天的总数（存活和死亡之和）的数组
const totalData = []

// 遍历存活和死亡数据的每一天（即每个索引位置）
for (let i = 0; i < rawData[0].length; ++i) {
  let sum = 0 // 初始化每天的总和为0

  // 遍历存活和死亡数据数组
  for (let j = 0; j < rawData.length; ++j) {
    // 将每一天的存活和死亡数据相加
    sum += rawData[j][i]
  }
  // 确保totalData中的值不是0，避免除以零的错误
  totalData.push(sum > 0 ? sum : 1) // 如果sum为0，设置为1作为默认值
}

// 设置图表的网格位置
const grid = {
  left: 30, // 左边距
  right: 10, // 右边距
  top: 50, // 上边距
  bottom: 50, // 下边距
}

// 根据存活和死亡数据生成ECharts的系列数据
const series = ['存活', '死亡'].map((name, sid) => {
  return {
    name, // 系列名称
    type: 'bar', // 图表类型为条形图
    stack: 'total', // 系列数据堆叠在同一名称（'total'）的堆叠中
    barWidth: '40%', // 条形图的宽度设置为60%

    // 设置条形图的标签显示及格式
    label: {
      show: true,
      formatter: (params) => {
        // 根据ECharts版本选择使用params.value或params.percent来计算百分比
        // 注意：ECharts 5+ 版本可能需要使用 params.percent 而不是手动计算百分比
        // 这里为了示例，我们手动计算百分比
        return `${Math.round(params.value * 1000) / 10}%` // 使用 params.value 或 params.percent
      },
    },

    // 根据原始数据和totalData计算百分比数据
    data: rawData[sid].map((d, did) => {
      // 确保totalData[did]不是0，避免除以零的错误
      return totalData[did] > 0 ? d / totalData[did] : 0
    }),

    // 设置条形的颜色
    itemStyle: {
      color: name === '存活' ? '#41ae3b' : '#ec261b', // 生存为绿色，死亡为红色
    },
  }
})

// 定义最终的ECharts配置选项
const Option = {
  // 图例配置，允许选择显示或隐藏系列
  legend: {
    selectedMode: true,
  },
  grid, // 使用之前定义的网格设置
  yAxis: {
    type: 'value', // y轴的类型为值类型
  },
  xAxis: {
    type: 'category', // x轴的类型为分类类型
    data: ['油松', '侧柏', '针松', '樟树', '柳树', '云杉', '杨树'], // x轴的数据标签
  },
  series, // 使用之前生成的系列数据
}

//  加载chart实例
const chart = ref<any>('')
// 页面加载完成后会触发的生命周期函数
onMounted(() => {
  // 初始化图表
  // markRaw 对响应式数据进行标记，使其不响应
  chart.value = markRaw(echarts.init(<HTMLDivElement>document.getElementById(prop.id)))
  //  用来渲染出图表
  chart.value.setOption(Option)
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
