<template>
  <a-layout style="height: 100%; background: transparent">
    <!-- 左侧筛选 -->
    <a-layout-sider width="240" class="glass-sider" style="padding: 12px; overflow-y: auto">
      <a-space direction="vertical" style="width: 100%" size="middle">
        <FilterPanel 
          v-model="filters" 
          :options="options" 
          @reset="resetFilters" 
        />
      </a-space>
    </a-layout-sider>

    <!-- 中间内容区 -->
    <a-layout-content style="padding: 12px; display: flex; flex-direction: column; height: 100%; overflow: hidden; position: relative">
      
      <!-- 顶部统计概览条 -->
      <a-card size="small" class="glass-card" style="margin-bottom: 12px; flex-shrink: 0">
        <a-row :gutter="16" align="middle" justify="center">
          <a-col :flex="1">
            <a-statistic title="总库存位" :value="stats.total" class="stat-card" :value-style="{color: '#a0c4ff', fontSize: '24px'}">
            </a-statistic>
          </a-col>
          <a-col :flex="1">
            <a-statistic title="已使用" :value="stats.used" class="stat-card" :value-style="{color: '#faad14', fontSize: '24px'}" />
          </a-col>
          <a-col :flex="1">
            <a-statistic title="未使用" :value="stats.available" class="stat-card" :value-style="{color: '#52c41a', fontSize: '24px'}" />
          </a-col>
          <a-col :flex="1">
            <a-statistic title="当前区域占用率" :value="stats.occupancy" suffix="%" class="stat-card" :value-style="{color: '#fff', fontSize: '24px'}" />
          </a-col>
          <a-col :flex="1">
            <a-statistic title="平均使用率" :value="stats.avgUsage" suffix="%" class="stat-card" :value-style="{color: '#fff', fontSize: '24px'}" />
          </a-col>
        </a-row>
      </a-card>

      <!-- 工具条 -->
      <div class="toolbar">
        <a-tooltip title="刷新数据">
          <a-button type="text" style="color: #fff" @click="loadData">
            <template #icon><ReloadOutlined /></template>
          </a-button>
        </a-tooltip>
        <a-tooltip :title="isFullscreen ? '退出全屏' : '全屏模式'">
          <a-button type="text" style="color: #fff" @click="toggleFullscreen">
            <template #icon>
              <FullscreenExitOutlined v-if="isFullscreen" />
              <FullscreenOutlined v-else />
            </template>
          </a-button>
        </a-tooltip>
        <a-tooltip title="导出数据">
          <a-button type="text" style="color: #fff" @click="exportCSV">
            <template #icon><ExportOutlined /></template>
          </a-button>
        </a-tooltip>
      </div>

      <div 
        ref="binsWrapperRef"
        class="bins-wrapper" 
        style="flex: 1; overflow-y: auto; padding: 10px; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 4px" 
        @scroll="handleScroll"
      >
        <div v-if="loading" style="text-align: center; padding: 50px"><a-spin /></div>
        <a-empty v-else-if="filteredBins.length === 0" description="暂无数据" style="margin-top: 100px" />
        <div v-else style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px">
          <div 
            v-for="bin in displayedBins" 
            :key="bin.id" 
            :class="['bin-item', `bin-status-${bin.status}`]"
            @click="showDetail(bin)"
          >
            <div class="bin-item-content">
              <div style="font-size: 12px; font-weight: 600; margin-bottom: 4px">{{ bin.id }}</div>
              <div style="font-size: 18px; font-weight: 800; margin: 4px 0">{{ bin.usage }}%</div>
              <div style="font-size: 10px; opacity: 0.8">{{ bin.location }}</div>
            </div>
          </div>
        </div>
      </div>
    </a-layout-content>

    <!-- 右侧图表区 -->
    <a-layout-sider width="280" class="glass-sider" style="padding: 12px; overflow-y: auto">
      <ChartsPanel :filtered-bins="filteredBins" :options="options" />
    </a-layout-sider>

    <!-- 详情弹窗 -->
    <a-modal
      v-model:open="isModalVisible"
      :footer="null"
      width="320px"
      centered
    >
      <template #title>
        <a-space>
          <HddOutlined />
          库位详情: {{ selectedBin?.id }}
        </a-space>
      </template>
      <div v-if="selectedBin" style="text-align: center">
        <a-typography-title :level="3" style="color: #1890ff; margin: 0">{{ selectedBin.usage }}%</a-typography-title>
        <a-typography-text type="secondary" style="display: block; margin-bottom: 20px">当前占用率</a-typography-text>
        
        <div style="text-align: left; background: rgba(255,255,255,0.04); padding: 16px; border-radius: 4px">
          <p style="margin-bottom: 8px; display: flex; justify-content: space-between">
            <span>位置坐标:</span> 
            <strong>{{ selectedBin.location }}</strong>
          </p>
          <p style="margin-bottom: 8px; display: flex; justify-content: space-between">
            <span>当前状态:</span> 
            <a-tag :color="getStatusColor(selectedBin.status)">{{ selectedBin.status.toUpperCase() }}</a-tag>
          </p>
          <p style="margin-bottom: 8px; display: flex; justify-content: space-between">
            <span>容量情况:</span> 
            <span>{{ selectedBin.items }} / {{ selectedBin.capacity }}</span>
          </p>
          <p style="margin-bottom: 0; display: flex; justify-content: space-between">
            <span>负责人:</span> 
            <span>{{ selectedBin.owner }}</span>
          </p>
        </div>
        <a-space direction="vertical" style="width: 100%; margin-top: 20px">
          <a-button type="primary" ghost block @click="showInventory">查看物料详情</a-button>
          <a-button block @click="isModalVisible = false">关闭</a-button>
        </a-space>
      </div>
    </a-modal>

    <!-- 物料详情弹窗 -->
    <a-modal
      v-model:open="isInventoryModalVisible"
      :footer="null"
      width="600px"
      centered
      title="物料库存详情"
    >
      <a-table 
        :columns="inventoryColumns" 
        :data-source="inventoryData" 
        size="small" 
        :pagination="false" 
        :scroll="{ y: 300 }"
        :loading="inventoryLoading"
        row-key="id"
      />
    </a-modal>
  </a-layout>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch, nextTick } from 'vue';
import { message } from 'ant-design-vue';
import { 
  ReloadOutlined, ExportOutlined, HddOutlined, 
  FullscreenOutlined, FullscreenExitOutlined, InfoCircleOutlined
} from '@ant-design/icons-vue';
import FilterPanel from '@/components/FilterPanel.vue';
import ChartsPanel from '@/components/ChartsPanel.vue';

// --- State Definitions ---
const binsData = ref([]);
const loading = ref(true);
const filters = ref({
  id: '', area: 'all', row: 'all', level: 'all', 
  owner: 'all', status: 'all', usageMin: 0, usageMax: 100,
  minRemaining: null 
});
const selectedBin = ref(null);
const isModalVisible = ref(false);
const isInventoryModalVisible = ref(false);
const inventoryData = ref([]);
const inventoryLoading = ref(false);
const displayCount = ref(100);
const isFullscreen = ref(false);
const binsWrapperRef = ref(null);

// --- Helpers ---
const generateBinsData = (count) => {
  const bins = [];
  for (let i = 1; i <= count; i++) {
    const usage = Number((Math.random() * 100).toFixed(1));
    let status = usage === 0 ? 'empty' : usage <= 40 ? 'low' : usage <= 70 ? 'medium' : 'high';
    const area = ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)];
    const row = Math.ceil(i/25);
    const col = (i%25||25).toString().padStart(2,'0');
    
    bins.push({
      id: `BIN-${i.toString().padStart(3, '0')}`,
      usage, status,
      capacity: Math.floor(Math.random() * 100) + 50,
      items: Math.floor(usage * Math.random() * 0.8) + 1,
      location: `${area}${row}-${col}`,
      area, rowId: row.toString(),
      level: Math.floor(Math.random() * 5) + 1,
      owner: `User${Math.floor(Math.random() * 10)}`,
      lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000)).toISOString()
    });
  }
  return bins;
};

const getStatusColor = (status) => {
  const map = { empty: 'default', low: 'success', medium: 'warning', high: 'error' };
  return map[status];
};

// --- Load Data ---
const loadData = async () => {
  loading.value = true;
  try {
    const response = await fetch('./bins_data.json'); // 使用相对路径
    if (!response.ok) throw new Error('Network error');
    binsData.value = await response.json();
    message.success('数据刷新成功');
  } catch (err) {
    console.warn('Load failed, using mock data:', err);
    binsData.value = generateBinsData(500);
    message.info('演示模式：使用模拟数据');
  } finally {
    loading.value = false;
  }
};

const fetchInventory = async (binId) => {
  inventoryLoading.value = true;
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const count = Math.floor(Math.random() * 5) + 1;
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      id: `${binId}-MAT-${i+1}`,
      materialNo: `M${Math.floor(Math.random()*10000).toString().padStart(4,'0')}`,
      desc: `物料描述 ${String.fromCharCode(65+i)}`,
      unit: ['PCS', 'BOX', 'KG'][Math.floor(Math.random()*3)],
      supplier: `供应商 ${String.fromCharCode(88+i)}`,
      qty: Math.floor(Math.random() * 100) + 10
    });
  }
  inventoryData.value = data;
  inventoryLoading.value = false;
};

// --- Computed Properties ---
const filteredBins = computed(() => {
  return binsData.value.filter(bin => {
    if (filters.value.id && !bin.id.toLowerCase().includes(filters.value.id.toLowerCase())) return false;
    if (filters.value.area !== 'all' && bin.area !== filters.value.area) return false;
    if (filters.value.row !== 'all' && String(bin.rowId) !== String(filters.value.row)) return false;
    if (filters.value.level !== 'all' && String(bin.level) !== String(filters.value.level)) return false;
    if (filters.value.owner !== 'all' && bin.owner !== filters.value.owner) return false;
    if (filters.value.status !== 'all' && bin.status !== filters.value.status) return false;
    
    if (bin.usage < filters.value.usageMin || bin.usage > filters.value.usageMax) return false;
    
    if (filters.value.minRemaining !== null && filters.value.minRemaining !== '') {
      const remaining = bin.capacity - bin.items;
      if (remaining < Number(filters.value.minRemaining)) return false;
    }
    
    return true;
  });
});

const displayedBins = computed(() => filteredBins.value.slice(0, displayCount.value));

const options = computed(() => {
  const areas = [...new Set(binsData.value.map(b => b.area))].sort();
  const owners = [...new Set(binsData.value.map(b => b.owner).filter(Boolean))].sort();
  const currentAreaBins = filters.value.area === 'all' ? binsData.value : binsData.value.filter(b => b.area === filters.value.area);
  const rows = [...new Set(currentAreaBins.map(b => b.rowId))].sort();
  const currentRowBins = filters.value.row === 'all' ? currentAreaBins : currentAreaBins.filter(b => b.rowId === filters.value.row);
  const levels = [...new Set(currentRowBins.map(b => b.level))].sort((a,b) => a-b);
  return { areas, rows, levels, owners };
});

const stats = computed(() => {
  const total = filteredBins.value.length;
  const used = filteredBins.value.filter(b => b.usage > 0).length;
  const totalUsageSum = filteredBins.value.reduce((sum, bin) => sum + bin.usage, 0);
  const avgUsage = total > 0 ? (totalUsageSum / total).toFixed(1) : 0;
  const occupancy = total > 0 ? Math.round((used/total)*100) : 0;
  return { total, used, available: total - used, occupancy, avgUsage };
});

const inventoryColumns = [
  { title: '物料号', dataIndex: 'materialNo', width: 100 },
  { title: '描述', dataIndex: 'desc', width: 150, ellipsis: true },
  { title: '单位', dataIndex: 'unit', width: 60, align: 'center' },
  { title: '供应商', dataIndex: 'supplier', width: 100, ellipsis: true },
  { title: '数量', dataIndex: 'qty', width: 80, align: 'right' },
];

// --- Watchers & Lifecycle ---
watch(filteredBins, () => {
  displayCount.value = 100;
  if (binsWrapperRef.value) binsWrapperRef.value.scrollTop = 0;
});

onMounted(() => {
  loadData();
});

// --- Event Handlers ---
const handleScroll = (e) => {
  const { scrollTop, clientHeight, scrollHeight } = e.target;
  if (scrollHeight - scrollTop - clientHeight < 50 && displayCount.value < filteredBins.value.length) {
    displayCount.value += 50;
  }
};

const resetFilters = () => {
  filters.value = { 
    id: '', area: 'all', row: 'all', level: 'all', 
    owner: 'all', status: 'all', usageMin: 0, usageMax: 100, 
    minRemaining: null 
  };
};

const showDetail = (bin) => {
  selectedBin.value = bin;
  isModalVisible.value = true;
};

const showInventory = () => {
  if (selectedBin.value) {
    fetchInventory(selectedBin.value.id);
    isInventoryModalVisible.value = true;
  }
};

const exportCSV = () => {
  const headers = "BIN ID,区域,排,层,状态,使用率,容量,负责人,更新时间\n";
  const rows = filteredBins.value.map(b => `${b.id},${b.area},${b.rowId},${b.level},${b.status},${b.usage}%,${b.capacity},${b.owner},${b.lastUpdated}`).join("\n");
  const blob = new Blob(["\uFEFF" + headers + rows], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "bins_export.csv";
  link.click();
};

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    isFullscreen.value = true;
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      isFullscreen.value = false;
    }
  }
};
</script>

<style scoped>
.toolbar {
  z-index: 100;
  background: rgba(0, 21, 41, 0.8);
  backdrop-filter: blur(4px);
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  margin-bottom: 10px;
  flex-direction: row-reverse;
}
</style>
