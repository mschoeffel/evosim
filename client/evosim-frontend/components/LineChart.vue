<template>
  <div class="h-full w-full">
    <Line ref="chartRef" :data="props.data" :options="props.options" style="height:100%;width:100%" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Line } from 'vue-chartjs';
import type { ChartData, ChartOptions } from 'chart.js';

const props = defineProps<{
  data: ChartData<'line', (number | null)[], unknown>;
  options?: ChartOptions<'line'>;
}>();

const chartRef = ref();

watch(() => props.data, () => {
  if (chartRef.value && chartRef.value.chartInstance) {
    chartRef.value.chartInstance.update();
  }
}, { deep: true });

watch(() => props.options, () => {
  if (chartRef.value && chartRef.value.chartInstance) {
    chartRef.value.chartInstance.update();
  }
}, { deep: true });
</script>
