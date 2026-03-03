# 智能仓储可视化看板 (Smart Warehouse Dashboard)

基于 Vue 3 + Vite + ECharts + Ant Design Vue 开发的现代化智能仓储管理可视化系统。提供实时的库位状态监控、多维度的库存统计分析以及便捷的交互体验。

## ✨ 核心功能

### 1. 📊 综合看板视图 (Dashboard)
- **实时库位监控**：以网格形式直观展示数千个 BIN 位的实时状态（空置、低/中/高占用）。
- **多维度筛选**：
  - 支持按 BIN 编码搜索。
  - 支持按区域 (A/B/C/D)、排号、层级筛选。
  - **[新增]** 按负责人筛选。
  - **[新增]** 按最小剩余容量筛选。
  - **[新增]** 按占用率区间（Min-Max）筛选。
- **详情交互**：点击任意 BIN 位可查看详细信息（容量、负责人、状态），并支持查看内部物料明细。
- **数据导出**：支持将筛选后的数据导出为 CSV 文件。

### 2. 📈 统计分析 (Statistics)
采用六宫格布局，提供全方位的库存分析：
- **全仓热力图**：基于 ECharts Heatmap，直观展示仓库存储密度分布。
- **占用等级分布**：环形图展示各占用等级（空置/低/中/高）的比例。
- **高/低占用提醒**：
  - **高占用 (>90%)**：自动筛选并预警高负荷库位。
  - **低占用 (1-30%)**：自动筛选低效库位，辅助库存优化。
- **区域/层级统计**：多维度柱状图对比各区域和层级的存储情况。

## 🛠 技术栈

- **核心框架**: [Vue 3](https://vuejs.org/) (Composition API)
- **构建工具**: [Vite](https://vitejs.dev/)
- **UI 组件库**: [Ant Design Vue](https://antdv.com/)
- **图表库**: [ECharts](https://echarts.apache.org/)
- **路由管理**: [Vue Router](https://router.vuejs.org/) (Hash Mode)

## 🚀 快速开始

### 环境要求
- Node.js >= 16.0

### 安装依赖

```bash
npm install
```

### 开发模式运行

```bash
npm run dev
```

访问 `http://localhost:5173` 查看效果。

### 构建生产版本

```bash
npm run build
```

构建产物位于 `dist/` 目录。
- **相对路径支持**：已配置 `base: './'`，支持直接打开 `index.html` 或部署到任意子目录。
- **构建优化**：已分离 Vendor 代码，且关闭了代码混淆以便于阅读（可按需开启）。

## 📂 项目结构

```
src/
├── assets/          # 静态资源 (Logo, SVG)
├── components/      # 公共组件
│   ├── ChartsPanel.vue   # 图表面板
│   └── FilterPanel.vue   # 筛选控制台
├── router/          # 路由配置
├── views/           # 页面视图
│   ├── Dashboard.vue         # 主看板
│   └── StatisticsAnalysis.vue # 统计分析
├── App.vue          # 根组件
└── main.js          # 入口文件
```

## 📝 开发说明

- **数据源**：默认尝试加载 `/public/bins_data.json`。如果加载失败，系统会自动生成模拟数据用于演示。
- **路由模式**：使用 Hash 模式 (`createWebHashHistory`)，无需服务器端特殊的重定向配置，适合纯静态部署。

## 📄 License

MIT
