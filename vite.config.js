import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  base: './', // 设置为相对路径，支持直接预览构建产物
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    minify: false, // 关闭代码压缩和混淆
    sourcemap: true, // 生成 source map 方便调试
    rollupOptions: {
      output: {
        // 自定义分包策略
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 将所有 node_modules 打包到 vendor
            // 也可以进一步细分，例如：
            if (id.includes('echarts')) {
              return 'echarts';
            }
            if (id.includes('ant-design-vue') || id.includes('@ant-design')) {
              return 'ant-design';
            }
            if (id.includes('vue') || id.includes('vue-router')) {
              return 'vue-core';
            }
            return 'vendor'; // 其他第三方库
          }
          // src 下的代码将根据入口自动打包，或者在这里定义更多规则
        },
        // 移除文件名中的 hash，方便阅读 (可选，如果为了缓存控制建议保留 hash)
        entryFileNames: 'assets/js/[name].js',
        chunkFileNames: 'assets/js/[name].js',
        assetFileNames: 'assets/[ext]/[name].[ext]'
      }
    }
  }
})
