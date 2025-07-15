import { Line } from 'vue-chartjs';

export default {
  name: 'LineChart',
  props: {
    chartData: { type: Object, required: true },
    chartOptions: { type: Object, required: false, default: () => ({}) },
  },
  watch: {
    chartData: {
      handler() {
        if (this.$refs.chartRef && this.$refs.chartRef.chartInstance) {
          this.$refs.chartRef.chartInstance.update();
        }
      },
      deep: true,
    },
    chartOptions: {
      handler() {
        if (this.$refs.chartRef && this.$refs.chartRef.chartInstance) {
          this.$refs.chartRef.chartInstance.update();
        }
      },
      deep: true,
    },
  },
  render() {
    return this.$createElement(Line, {
      ref: 'chartRef',
      props: {
        chartData: this.chartData,
        options: this.chartOptions,
      },
    });
  },
};
