<template>
  <el-card>
    <template #header>
      <div class="title">my1Chart</div>
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
const data = {
  name: 'flare',
  children: [
    {
      name: 'data',
      children: [
        {
          name: 'DataUtil',
          value: 3322,
        },
      ],
    },
    {
      name: 'display',
      children: [
        { name: 'DirtySprite', value: 8833 },
        { name: 'LineSprite', value: 1732 },
        { name: 'RectSprite', value: 3623 },
      ],
    },
    {
      name: 'flex',
      children: [{ name: 'FlareVis', value: 4116 }],
    },
    {
      name: 'query',
      children: [
        { name: 'And', value: 1027 },
        { name: 'Arithmetic', value: 3891 },
        { name: 'Average', value: 891 },
        { name: 'Comparison', value: 5103 },
        { name: 'Count', value: 781 },
        { name: 'DateUtil', value: 4141 },
        { name: 'Distinct', value: 933 },
        { name: 'Expression', value: 5130 },
        { name: 'Fn', value: 3240 },
        { name: 'If', value: 2732 },
        { name: 'IsA', value: 2039 },
        { name: 'Literal', value: 1214 },
        { name: 'Match', value: 3748 },
        { name: 'Maximum', value: 843 },
        { name: 'Minimum', value: 843 },
        { name: 'Not', value: 1554 },
        { name: 'Or', value: 970 },
        { name: 'Query', value: 13896 },
        { name: 'Range', value: 1594 },
        { name: 'StringUtil', value: 4130 },
        { name: 'Sum', value: 791 },
        { name: 'Variable', value: 1124 },
        { name: 'Variance', value: 1876 },
        { name: 'Xor', value: 1101 },
      ],
    },
    {
      name: 'scale',
      children: [
        { name: 'IScaleMap', value: 2105 },
        { name: 'LogScale', value: 3151 },
        { name: 'RootScale', value: 1756 },
        { name: 'Scale', value: 4268 },
        { name: 'ScaleType', value: 1821 },
        { name: 'TimeScale', value: 5833 },
      ],
    },
  ],
}
const Option = {
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove',
  },
  series: [
    {
      type: 'tree',
      id: 0,
      name: 'tree1',
      data: [data],
      top: '10%',
      left: '8%',
      bottom: '22%',
      right: '20%',
      symbolSize: 7,
      edgeShape: 'polyline',
      edgeForkPosition: '63%',
      initialTreeDepth: 3,
      lineStyle: {
        width: 2,
      },
      label: {
        backgroundColor: '#fff',
        position: 'left',
        verticalAlign: 'middle',
        align: 'right',
      },
      leaves: {
        label: {
          position: 'right',
          verticalAlign: 'middle',
          align: 'left',
        },
      },
      emphasis: {
        focus: 'descendant',
      },
      expandAndCollapse: true,
      animationDuration: 550,
      animationDurationUpdate: 750,
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
