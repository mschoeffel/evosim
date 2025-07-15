<template>
  <div class="pt-4 h-full">
    <line-chart
      v-if="(chartData && chartData.labels && chartData.datasets) || true"
      :data="chartData || { labels: [], datasets: [] }"
      :options="chartOptions"
      class="h-full w-full"
    ></line-chart>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LineChart from './../components/LineChart.vue';
import { FigureClient } from '~/models/figure.client';

export default defineComponent({
  name: 'GlobalStatsAvgEnergy',
  components: {
    LineChart,
  },
  props: {
    figures: {
      type: Array,
      default: () => {
        return [];
      },
    },
    colors: {
      type: Array,
      default: () => {
        return [];
      },
    },
    populations: {
      type: Number,
      default: 0,
    },
  },
  data(): {
    chartData: {
      labels: Array<number>;
      datasets: Array<{
        label: string;
        data: Array<number>;
      }>;
    };
    chartOptions: {};
  } {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Population 0',
            data: [],
          },
          {
            label: 'Population 1',
            data: [],
          },
          {
            label: 'Population 2',
            data: [],
          },
          {
            label: 'Population 3',
            data: [],
          },
          {
            label: 'Population 4',
            data: [],
          },
        ],
      },
      chartOptions: {
        plugins: {
          tooltip: {
            enabled: false,
          },
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
            },
          },
        },
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true,
                steps: 10,
                stepValue: 5,
                max: 100,
              },
            },
          ],
        },
      },
    };
  },
  watch: {
    figures: {
      immediate: true,
      handler: 'update',
    },
  },
  methods: {
    update(newVal: Array<FigureClient> | undefined): void {
      if (newVal !== undefined) {
        const newChartData = [];
        const sumOfEachPopulation = [];
        const countOfEachPopulation = [];

        for (let p = 0; p < this.populations; p++) {
          sumOfEachPopulation[p] = 0;
          countOfEachPopulation[p] = 0;
        }

        for (const figure of newVal) {
          sumOfEachPopulation[figure.population] += figure.energy;
          countOfEachPopulation[figure.population]++;
        }

        for (let population = 0; population < this.populations; population++) {
          const newChartDataPopulation = {
            id: population,
            label: `${this.$t('statsSection.population')} ${population}`,
            borderColor: this.colors[population],
            fill: false,
            data: [] as Array<number>,
          };
          const chartDataPopulationSet = this.chartData.datasets[population];
          if (chartDataPopulationSet !== undefined) {
            for (const element of chartDataPopulationSet.data) {
              newChartDataPopulation.data.push(element);
            }
            if (newChartDataPopulation.data.length > 9) {
              newChartDataPopulation.data.shift();
            }
          }
          newChartDataPopulation.data.push(
            this.roundToTwoDigits(
              sumOfEachPopulation[population] /
                countOfEachPopulation[population],
            ),
          );
          newChartData.push(newChartDataPopulation);
        }
        this.chartData = {
          labels: [-9, -8, -7, -6, -5, -4, -3, -2, -1, 0],
          datasets: newChartData,
        };
      }
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
    roundToTwoDigits(x: number): number {
      return Math.round((x + Number.EPSILON) * 100) / 100;
    },
  },
});
</script>
