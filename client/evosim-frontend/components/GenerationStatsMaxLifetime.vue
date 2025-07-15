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
import { GamestateClientDto } from '~/models/dto/gamestate.client.dto';

export default defineComponent({
  name: 'GenerationStatsMaxLifetime',
  components: {
    LineChart,
  },
  props: {
    gamestate: {
      type: Object,
      default: () => {
        return {};
      },
    },
    colors: {
      type: Array,
      default: () => {
        return [];
      },
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
    renderedSave: number;
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
      },
      renderedSave: 0,
    };
  },
  watch: {
    gamestate: {
      immediate: true,
      handler: 'update',
    },
  },
  methods: {
    update(newVal: GamestateClientDto | undefined): void {
      if (
        newVal !== undefined &&
        newVal._stats !== undefined &&
        newVal._stats.length > this.renderedSave
      ) {
        const newChartData = [];
        const data = new Map<number, Array<number>>();

        let maxGeneration = 0;
        for (const stat of newVal._stats) {
          if (stat._generation > maxGeneration) {
            maxGeneration = stat._generation;
          }
        }

        for (const stat of newVal._stats) {
          if (!data.has(stat._population)) {
            data.set(stat._population, [maxGeneration]);
          }
          const arr = data.get(stat._population);
          if (arr !== undefined) {
            arr[stat._generation] = stat._maxLifetime;
          }
        }

        for (
          let population = 0;
          population < newVal._populations;
          population++
        ) {
          const newChartDataPopulation = {
            id: population,
            label: `${this.$t('statsSection.population')} ${population}`,
            borderColor: this.colors[population],
            fill: false,
            data: [] as Array<any>,
          };
          const arr = data.get(population);
          if (arr !== undefined) {
            let index = arr.length - 1;
            while (index >= 0 && index >= arr.length - 26) {
              newChartDataPopulation.data.push(
                this.roundToTwoDigits(arr[index]),
              );
              index--;
            }
            while (newChartDataPopulation.data.length < 26) {
              newChartDataPopulation.data.push(null);
            }
          }
          newChartDataPopulation.data.reverse();
          newChartData.push(newChartDataPopulation);
        }
        this.chartData = {
          labels: [
            -25, -24, -23, -22, -21, -20, -19, -18, -17, -16, -15, -14, -13,
            -12, -11, -10, -9, -8, -7, -6, -5, -5, -4, -3, -2, -1,
          ],
          datasets: newChartData,
        };
        this.renderedSave = newVal._stats.length;
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
