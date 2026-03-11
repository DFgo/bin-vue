<template>
  <a-config-provider
    :theme="{
      algorithm: theme.darkAlgorithm,
      token: { colorPrimary: '#1890ff', colorBgBase: '#001529', borderRadius: 4 }
    }"
  >
    <a-layout style="height: 100vh; background: transparent">
      <a-layout-header class="glass-header" style="display: flex; align-items: center; justify-content: space-between">
        <div style="display: flex; align-items: center">
          <div style="color: #fff; font-size: 16px; font-weight: 600; display: flex; align-items: center; margin-right: 40px">
            <img src="./assets/logo.svg" alt="Logo" style="height: 32px; margin-right: 12px" />
            <span style="font-size: 16px; font-weight: 600">中心仓库BIN位数字看板</span>
          </div>
          <a-menu 
            v-model:selectedKeys="current" 
            theme="dark" 
            mode="horizontal" 
            style="background: transparent; border-bottom: none; min-width: 300px"
          >
            <a-menu-item key="/">
              <template #icon><DashboardOutlined /></template>
              <router-link to="/">看板视图</router-link>
            </a-menu-item>
            <a-menu-item key="/statistics">
              <template #icon><DeploymentUnitOutlined /></template>
              <router-link to="/statistics">统计分析</router-link>
            </a-menu-item>
          </a-menu>
        </div>
        <a-space size="middle">
          <a-typography-text style="color: rgba(255,255,255,0.45); font-size: 12px">{{ currentTime }}</a-typography-text>
          <a-button type="text" size="small">
            <template #icon><UserOutlined /></template>
          </a-button>
        </a-space>
      </a-layout-header>

      <a-layout-content style="height: calc(100vh - 64px); overflow: hidden">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-config-provider>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { theme } from 'ant-design-vue';
import { 
  UserOutlined, HddOutlined, DashboardOutlined, DeploymentUnitOutlined 
} from '@ant-design/icons-vue';

const route = useRoute();
const current = ref(['/']);
const currentTime = ref(new Date().toLocaleString('zh-CN'));
let timer;

watch(() => route.path, (newPath) => {
  current.value = [newPath];
});

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = new Date().toLocaleString('zh-CN');
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style>
/* Global Styles from previous React App.css */
:root {
  --primary-color: #1890ff;
  --bg-dark: #001529;
  --bg-gradient-start: #0a1929;
  --bg-gradient-end: #0d1b2a;
}

body {
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, var(--bg-gradient-start), var(--bg-gradient-end));
  color: #ffffff;
  font-family: 'Microsoft YaHei', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
  position: relative;
}

body::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(circle at 10% 20%, rgba(30, 136, 229, 0.1) 0%, transparent 40%),
              radial-gradient(circle at 90% 80%, rgba(2, 136, 209, 0.1) 0%, transparent 40%);
  pointer-events: none;
  z-index: -1;
}

#app { height: 100vh; }

/* Custom Scrollbar */
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: rgba(10, 25, 41, 0.5); }
::-webkit-scrollbar-thumb { background: rgba(30, 136, 229, 0.5); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #1e88e5; }

/* Bin Item Card */
.bin-item {
  height: 90px;
  border-radius: 7px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  border: 2px solid transparent;
  backdrop-filter: blur(5px);
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
}

.bin-item::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: inherit;
  opacity: 0.3;
  z-index: 1;
}

.bin-item:hover { 
  transform: translateY(-4px) scale(1.03); 
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25); 
  border-color: rgba(30, 136, 229, 0.5); 
  z-index: 10; 
}

.bin-item-content { position: relative; z-index: 2; text-align: center; width: 100%; }

.bin-status-empty { background: linear-gradient(135deg, #2d3748, #4a5568); border: none; } 
.bin-status-low { background: linear-gradient(135deg, #38a169, #68d391); border: none; }   
.bin-status-medium { background: linear-gradient(135deg, #ecc94b, #faf089); border: none; color: #333; } 
.bin-status-high { background: linear-gradient(135deg, #e53e3e, #fc8181); border: none; }   

/* Glassmorphism Classes */
.glass-sider { 
  background: rgba(10, 25, 41, 0.8) !important; 
  border-right: 1px solid rgba(30, 136, 229, 0.3); 
  border-left: 1px solid rgba(30, 136, 229, 0.3); 
  backdrop-filter: blur(10px);
}

.glass-header { 
  background: rgba(10, 25, 41, 0.8) !important; 
  border-bottom: 1px solid rgba(30, 136, 229, 0.3); 
  padding: 0 20px !important; /* Force padding override */
  height: 60px; 
  line-height: 60px; 
  backdrop-filter: blur(10px);
}

.glass-card { 
  background: rgba(10, 25, 41, 0.6) !important; 
  border: 1px solid rgba(30, 136, 229, 0.3) !important; 
  border-radius: 10px !important;
}

.glass-card .ant-card-head { 
  border-bottom: 1px solid rgba(30, 136, 229, 0.3) !important; 
  min-height: 45px; 
  padding: 0 15px !important; 
}

.glass-card .ant-card-head-title { 
  padding: 12px 0 !important; 
  color: #ffffff !important; 
  font-size: 15px; 
  font-weight: 600;
}

/* Stat Cards */
.stat-card .ant-statistic-title { font-size: 13px; margin-bottom: 4px; color: #a0c4ff; text-align: center; }
.stat-card .ant-statistic-content { text-align: center; }
.stat-card .ant-statistic-content-value { font-size: 24px; font-weight: 700; color: #fff; }

/* AntD Overrides */
.ant-input, .ant-select-selector, .ant-input-number, .ant-btn-dashed {
  background-color: rgba(0, 0, 0, 0.3) !important;
  border-color: rgba(30, 136, 229, 0.3) !important;
  color: #fff !important;
}
.ant-select-selection-item { color: #fff !important; }
.ant-select-arrow { color: #a0c4ff !important; }
</style>
