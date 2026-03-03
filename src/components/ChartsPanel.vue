<template>
  <a-space direction="vertical" style="width: 100%" size="middle">
    <a-card size="small" class="glass-card" title="库存状态分布">
      <div ref="pieContainer" style="height: 200px; padding: 0"></div>
    </a-card>
    <a-card size="small" class="glass-card" title="区域库存统计">
      <div ref="colContainer" style="height: 200px; padding: 0"></div>
    </a-card>
    <a-card size="small" class="glass-card" title="操作日志 (最新5条)">
      <div style="font-size: 12px; color: rgba(255,255,255,0.45)">
        <p style="margin-bottom: 4px">• User1 更新了 BIN-005 (+10%)</p>
        <p style="margin-bottom: 4px">• User3 释放了 BIN-012 (空置)</p>
        <p style="margin-bottom: 4px">• User2 盘点了 A区</p>
        <p style="margin-bottom: 4px">• System 自动同步数据完成</p>
        <p style="margin-bottom: 0">• User1 导出了 CSV 报表</p>
      </div>
    </a-card>
  </a-space>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { Pie, Column } from '@antv/g2plot';

const props = defineProps({
  filteredBins: {
    type: Array,
    required: true
  },
  options: {
    type: Object,
    required: true
  }
});

const pieContainer = ref(null);
const colContainer = ref(null);
let pieChart = null;
let colChart = null;

// --- Data Prep ---
const pieData = computed(() => [
  { type: '空置', value: props.filteredBins.filter(b => b.status === 'empty').length },
  { type: '低占用', value: props.filteredBins.filter(b => b.status === 'low').length },
  { type: '中占用', value: props.filteredBins.filter(b => b.status === 'medium').length },
  { type: '高占用', value: props.filteredBins.filter(b => b.status === 'high').length },
]);

const colData = computed(() => props.options.areas.map(a => ({
  area: a + '区',
  count: props.filteredBins.filter(b => b.area === a).length
})));

// --- Configs ---
const commonConfig = {
  theme: 'classicDark',
  padding: 'auto',
  autoFit: true,
};

const initCharts = () => {
  if (pieContainer.value && !pieChart) {
    pieChart = new Pie(pieContainer.value, {
      ...commonConfig,
      data: pieData.value,
      angleField: 'value',
      colorField: 'type',
      radius: 0.8,
      // innerRadius: 0.6, // 移除内径，变为实心饼图
      color: ['#434343', '#389e0d', '#d48806', '#cf1322'],
      label: { 
        type: 'inner', 
        offset: '-30%', 
        content: '{value}', 
        style: { textAlign: 'center', fontSize: 10, fill: '#fff' } 
      },
      legend: { position: 'bottom', flipPage: false, itemHeight: 10 },
    });
    pieChart.render();
  }

  if (colContainer.value && !colChart) {
    colChart = new Column(colContainer.value, {
      ...commonConfig,
      data: colData.value,
      xField: 'area',
      yField: 'count',
      color: '#1890ff',
      columnWidthRatio: 0.6,
      label: { position: 'middle', style: { fill: '#fff' } },
      xAxis: { label: { autoHide: true, autoRotate: false } },
    });
    colChart.render();
  }
};

// --- Lifecycle & Watch ---
onMounted(() => {
  initCharts();
});

watch(pieData, (newData) => {
  if (pieChart) pieChart.changeData(newData);
});

watch(colData, (newData) => {
  if (colChart) colChart.changeData(newData);
});

onUnmounted(() => {
  if (pieChart) pieChart.destroy();
  if (colChart) colChart.destroy();
});
</script>
