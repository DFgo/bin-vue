<template>
  <a-card size="small" class="glass-card">
    <template #title>
      <a-space>
        <FilterOutlined />
        筛选控制台
      </a-space>
    </template>
    
    <a-form layout="vertical" size="small">
      <a-form-item style="margin-bottom: 8px">
        <a-input 
          :value="modelValue.id" 
          placeholder="搜索编号..." 
          allow-clear
          @update:value="val => updateField('id', val)"
        >
          <template #prefix><SearchOutlined /></template>
        </a-input>
      </a-form-item>

      <a-row :gutter="8">
        <a-col :span="12">
          <a-form-item label="区域" style="margin-bottom: 8px">
            <a-select :value="modelValue.area" @update:value="onAreaChange">
              <a-select-option value="all">全部</a-select-option>
              <a-select-option v-for="a in options.areas" :key="a" :value="a">{{ a }}区</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="排号" style="margin-bottom: 8px">
            <a-select :value="modelValue.row" @update:value="onRowChange">
              <a-select-option value="all">全部</a-select-option>
              <a-select-option v-for="r in options.rows" :key="r" :value="r">{{ r }}排</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item label="层级" style="margin-bottom: 8px">
        <a-select :value="modelValue.level" @update:value="val => updateField('level', val)">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option v-for="l in options.levels" :key="l" :value="l">{{ l }}层</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="负责人" style="margin-bottom: 8px">
        <a-select 
          :value="modelValue.owner" 
          @update:value="val => updateField('owner', val)"
          placeholder="选择负责人"
          allow-clear
        >
          <a-select-option value="all">全部</a-select-option>
          <a-select-option v-for="o in options.owners" :key="o" :value="o">{{ o }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="状态" style="margin-bottom: 8px">
        <a-select :value="modelValue.status" @update:value="val => updateField('status', val)">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="empty">空置</a-select-option>
          <a-select-option value="low">低占用</a-select-option>
          <a-select-option value="medium">中占用</a-select-option>
          <a-select-option value="high">高占用</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="占用率区间 (%)" style="margin-bottom: 8px">
        <a-row :gutter="8" align="middle">
          <a-col :span="11">
            <a-input-number 
              :value="modelValue.usageMin" 
              :min="0" :max="100" 
              style="width: 100%" 
              @update:value="val => updateField('usageMin', val)" 
            />
          </a-col>
          <a-col :span="2" style="text-align: center">-</a-col>
          <a-col :span="11">
            <a-input-number 
              :value="modelValue.usageMax" 
              :min="0" :max="100" 
              style="width: 100%" 
              @update:value="val => updateField('usageMax', val)" 
            />
          </a-col>
        </a-row>
      </a-form-item>

      <a-form-item label="最小剩余容量" style="margin-bottom: 12px">
        <a-input-number 
          :value="modelValue.minRemaining" 
          placeholder="例如: 50" 
          style="width: 100%" 
          :min="0"
          @update:value="val => updateField('minRemaining', val)"
        />
      </a-form-item>

      <a-button type="dashed" block size="small" @click="$emit('reset')">重置</a-button>
    </a-form>
  </a-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons-vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  options: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue', 'reset']);

const updateField = (key, value) => {
  emit('update:modelValue', { ...props.modelValue, [key]: value });
};

const onAreaChange = (val) => {
  emit('update:modelValue', { 
    ...props.modelValue, 
    area: val, 
    row: 'all', 
    level: 'all' 
  });
};

const onRowChange = (val) => {
  emit('update:modelValue', { 
    ...props.modelValue, 
    row: val, 
    level: 'all' 
  });
};
</script>
