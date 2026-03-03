import { createRouter, createWebHashHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import StatisticsAnalysis from '../views/StatisticsAnalysis.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: StatisticsAnalysis
  }
];

const router = createRouter({
  history: createWebHashHistory(), // 改为 Hash 模式，适应性更强
  routes
});

export default router;
