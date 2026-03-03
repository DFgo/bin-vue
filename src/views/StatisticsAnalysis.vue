<template>
  <div style="height: 100%; display: flex; flex-direction: column; padding: 12px; gap: 12px; overflow: hidden;">
    
    <!-- Row 1 -->
    <div style="flex: 1; display: flex; gap: 12px; min-height: 0;">
      <!-- Chart 1: Heatmap -->
      <a-card class="glass-card" title="全仓存储热力分布" :bordered="false" style="flex: 1; display: flex; flex-direction: column;" :bodyStyle="{ flex: 1, padding: '10px', minHeight: 0 }">
        <div ref="chart1Ref" style="width: 100%; height: 100%;"></div>
      </a-card>
      
      <!-- Chart 2: Usage Level -->
      <a-card class="glass-card" title="库存占用等级分布" :bordered="false" style="flex: 1; display: flex; flex-direction: column;" :bodyStyle="{ flex: 1, padding: '10px', minHeight: 0 }">
        <div ref="chart2Ref" style="width: 100%; height: 100%;"></div>
      </a-card>

      <!-- Table 1: High Usage -->
      <a-card class="glass-card" title="高占用 BIN 位提醒 (>90%)" :bordered="false" style="flex: 1; display: flex; flex-direction: column;" :bodyStyle="{ flex: 1, padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }">
        <a-table 
          :columns="columns" 
          :data-source="highUsageData" 
          size="small" 
          :pagination="false" 
          :scroll="{ y: 350 }"
          row-key="id"
          class="custom-table"
          style="height: 100%"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'usage'">
              <span style="color: #ff4d4f; font-weight: bold;">{{ record.usage }}%</span>
            </template>
          </template>
        </a-table>
      </a-card>
    </div>

    <!-- Row 2 -->
    <div style="flex: 1; display: flex; gap: 12px; min-height: 0;">
      <!-- Chart 3: Area Stats -->
      <a-card class="glass-card" title="各区域库存统计" :bordered="false" style="flex: 1; display: flex; flex-direction: column;" :bodyStyle="{ flex: 1, padding: '10px', minHeight: 0 }">
        <div ref="chart3Ref" style="width: 100%; height: 100%;"></div>
      </a-card>

      <!-- Chart 4: Level Stats -->
      <a-card class="glass-card" title="各层级存储分布" :bordered="false" style="flex: 1; display: flex; flex-direction: column;" :bodyStyle="{ flex: 1, padding: '10px', minHeight: 0 }">
        <div ref="chart4Ref" style="width: 100%; height: 100%;"></div>
      </a-card>

      <!-- Table 2: Low Usage -->
      <a-card class="glass-card" :bordered="false" style="flex: 1; display: flex; flex-direction: column;" :bodyStyle="{ flex: 1, padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }">
        <template #title>
          <span>低占用 BIN 位提醒 (1-30%)</span>
          <a-tooltip title="筛选逻辑：占用率 > 0 且 <= 30%，且当前存储数量 > 0">
            <InfoCircleOutlined style="margin-left: 8px; color: rgba(255,255,255,0.5); cursor: pointer;" />
          </a-tooltip>
        </template>
        <a-table 
          :columns="columns" 
          :data-source="lowUsageData" 
          size="small" 
          :pagination="false" 
          :scroll="{ y: 350 }"
          row-key="id"
          class="custom-table"
          style="height: 100%"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'usage'">
              <span style="color: #faad14; font-weight: bold;">{{ record.usage }}%</span>
            </template>
          </template>
        </a-table>
      </a-card>
    </div>

    <div v-if="loading" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
      <a-spin tip="加载数据中..." />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, nextTick, computed } from 'vue';
import * as echarts from 'echarts';
import { message } from 'ant-design-vue';
import { InfoCircleOutlined } from '@ant-design/icons-vue';

const loading = ref(true);
const chart1Ref = ref(null);
const chart2Ref = ref(null);
const chart3Ref = ref(null);
const chart4Ref = ref(null);
const rawData = ref([]);

let charts = [];

const columns = [
  { title: '区域', dataIndex: 'area', key: 'area', width: 60, align: 'center' },
  { title: '货架-层', key: 'shelf', width: 80, customRender: ({record}) => `${record.rowId}-${record.level}`, align: 'center' },
  { title: 'BIN编码', dataIndex: 'id', key: 'id', width: 100, ellipsis: true, align: 'center' },
  { title: '数量', dataIndex: 'items', key: 'items', width: 60, align: 'center' },
  { title: '最大容量', dataIndex: 'capacity', key: 'capacity', width: 80, align: 'center' },
  { title: '占用率', dataIndex: 'usage', key: 'usage', width: 70, align: 'center' },
];

const highUsageData = computed(() => {
  return rawData.value
    .filter(d => d.usage > 90)
    .sort((a, b) => b.usage - a.usage)
    .slice(0, 30);
});

const lowUsageData = computed(() => {
  return rawData.value
    .filter(d => d.usage > 0 && d.usage <= 30 && d.items > 0) // 排除items为0的情况
    .sort((a, b) => a.usage - b.usage) 
    .slice(0, 30);
});

const loadData = async () => {
  try {
    const response = await fetch('./bins_data.json');
    if (!response.ok) throw new Error('Network error');
    const data = await response.json();
    rawData.value = data;
    
    await nextTick();
    initChart1(data);
    initChart2(data);
    initChart3(data);
    initChart4(data);
  } catch (err) {
    console.error('Failed to load data:', err);
    message.error('数据加载失败');
  } finally {
    loading.value = false;
  }
};

// --- Chart 1: Heatmap ---
const initChart1 = (data) => {
  if (!chart1Ref.value) return;
  const chart = echarts.init(chart1Ref.value, 'dark');
  charts.push(chart);

  const areas = [...new Set(data.map(d => d.area))].sort();
  const yAxisData = [];
  const areaRowsMap = {};
  data.forEach(d => {
    if (!areaRowsMap[d.area]) areaRowsMap[d.area] = new Set();
    areaRowsMap[d.area].add(Number(d.rowId));
  });
  areas.forEach(area => {
    const rows = Array.from(areaRowsMap[area] || []).sort((a, b) => a - b);
    rows.forEach(row => yAxisData.push(`${area}区-${row}排`));
  });
  const maxCol = 25;
  const xAxisData = Array.from({length: maxCol}, (_, i) => (i + 1).toString().padStart(2, '0'));
  const chartData = [];
  data.forEach(bin => {
    const yIndex = yAxisData.indexOf(`${bin.area}区-${bin.rowId}排`);
    const colIndex = parseInt(bin.location.split('-')[1], 10) - 1;
    if (yIndex !== -1 && colIndex >= 0) chartData.push([colIndex, yIndex, bin.usage]);
  });

  chart.setOption({
    backgroundColor: 'transparent',
    tooltip: { position: 'top' },
    grid: { top: 10, bottom: 10, left: 60, right: 60 },
    xAxis: { type: 'category', data: xAxisData, axisLabel: { fontSize: 8, color: '#aaa' } },
    yAxis: { type: 'category', data: yAxisData, axisLabel: { fontSize: 8, color: '#aaa' } },
    visualMap: {
      min: 0, max: 100, calculable: true, 
      orient: 'vertical', // 改为垂直
      right: '0', // 放在右侧
      top: 'center', // 垂直居中
      inRange: { color: ['#1a2a3a', '#52c41a', '#faad14', '#ff4d4f'] },
      textStyle: { color: '#fff', fontSize: 9 },
      itemWidth: 10, itemHeight: 80
    },
    series: [{ type: 'heatmap', data: chartData, itemStyle: { borderColor: '#001529', borderWidth: 1 } }]
  });
};

// --- Chart 2: Usage Level ---
const initChart2 = (data) => {
  if (!chart2Ref.value) return;
  const chart = echarts.init(chart2Ref.value, 'dark');
  charts.push(chart);

  let empty = 0, low = 0, medium = 0, high = 0;
  data.forEach(d => {
    if (d.usage === 0) empty++;
    else if (d.usage <= 30) low++;
    else if (d.usage <= 70) medium++;
    else high++;
  });

  const pieData = [
    { value: empty, name: '空置', itemStyle: { color: '#434343' } },
    { value: low, name: '低占用', itemStyle: { color: '#52c41a' } },
    { value: medium, name: '中占用', itemStyle: { color: '#faad14' } },
    { value: high, name: '高占用', itemStyle: { color: '#ff4d4f' } }
  ];

  chart.setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    legend: { orient: 'vertical', right: '0', top: 'middle', textStyle: { color: '#fff', fontSize: 10 } }, // 右侧图例
    series: [{
      name: '占用等级',
      type: 'pie',
      radius: ['40%', '65%'],
      center: ['40%', '50%'], // 图表左移
      avoidLabelOverlap: false,
      itemStyle: { borderRadius: 5, borderColor: '#001529', borderWidth: 2 },
      label: { show: false, position: 'center' },
      emphasis: { label: { show: true, fontSize: '14', fontWeight: 'bold', color: '#fff', formatter: '{d}%' } },
      labelLine: { show: false },
      data: pieData
    }]
  });
};

// --- Chart 3: Area Stats ---
const initChart3 = (data) => {
  if (!chart3Ref.value) return;
  const chart = echarts.init(chart3Ref.value, 'dark');
  charts.push(chart);

  const stats = {};
  data.forEach(d => {
    if (!stats[d.area]) stats[d.area] = { total: 0, used: 0 };
    stats[d.area].total++;
    if (d.usage > 0) stats[d.area].used++;
  });
  const areas = Object.keys(stats).sort();
  const totalData = areas.map(a => stats[a].total);
  const usedData = areas.map(a => stats[a].used);
  const rateData = areas.map(a => Math.round((stats[a].used / stats[a].total) * 100));

  chart.setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { orient: 'vertical', right: '0', top: 'middle', textStyle: { color: '#fff', fontSize: 10 } }, // 右侧图例
    grid: { left: '30', right: '80', bottom: '20', top: '10', containLabel: true },
    xAxis: { type: 'category', data: areas, axisLabel: { color: '#fff' } },
    yAxis: [
      { type: 'value', name: '', show: false },
      { type: 'value', name: '', show: false }
    ],
    series: [
      { name: '总数', type: 'bar', data: totalData, itemStyle: { color: 'rgba(255, 255, 255, 0.1)' }, barGap: '-100%' },
      { name: '已占用', type: 'bar', data: usedData, itemStyle: { color: '#1890ff' } },
      { name: '占用率', type: 'line', yAxisIndex: 1, data: rateData, itemStyle: { color: '#52c41a' }, label: { show: true, formatter: '{c}%', color: '#fff' } }
    ]
  });
};

// --- Chart 4: Level Stats ---
const initChart4 = (data) => {
  if (!chart4Ref.value) return;
  const chart = echarts.init(chart4Ref.value, 'dark');
  charts.push(chart);

  const stats = {};
  data.forEach(d => {
    if (!stats[d.level]) stats[d.level] = 0;
    if (d.usage > 0) stats[d.level]++;
  });
  const levels = Object.keys(stats).sort((a, b) => a - b);
  const chartData = levels.map(l => stats[l]);

  chart.setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '10', right: '30', bottom: '20', top: '10', containLabel: true },
    xAxis: { type: 'value', show: false },
    yAxis: { type: 'category', data: levels.map(l => `${l}层`), axisLabel: { color: '#fff' } },
    series: [
      {
        name: '占用数量',
        type: 'bar',
        data: chartData,
        itemStyle: { color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{offset: 0, color: '#f7b500'}, {offset: 1, color: '#b620e0'}]) },
        label: { show: true, position: 'right', color: '#fff' }
      }
    ]
  });
};

const handleResize = () => {
  charts.forEach(c => c.resize());
};

onMounted(() => {
  loadData();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  charts.forEach(c => c.dispose());
});
</script>

<style scoped>
/* 表头居中 */
:deep(.ant-table-thead > tr > th) {
  background: rgba(0, 0, 0, 0.2);
  color: #a0c4ff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center !important;
}

/* 自定义表格滚动条样式 */
:deep(.ant-table-body)::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
:deep(.ant-table-body)::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}
:deep(.ant-table-body)::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}
:deep(.ant-table-body)::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.4);
}

/* 表格透明背景 */
:deep(.ant-table) {
  background: transparent;
  color: #fff;
}
:deep(.ant-table-thead > tr > th) {
  background: rgba(0, 0, 0, 0.2);
  color: #a0c4ff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
:deep(.ant-table-tbody > tr > td) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: #fff;
}
:deep(.ant-table-tbody > tr:hover > td) {
  background: rgba(255, 255, 255, 0.05) !important;
}
:deep(.ant-empty-description) {
  color: rgba(255, 255, 255, 0.45);
}
</style>
