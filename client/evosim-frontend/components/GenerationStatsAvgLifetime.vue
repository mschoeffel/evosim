<template>
  <div class="pt-4">
    <line-chart
      :height="150"
      :chart-data="chartData"
      :options="chartOptions"
    ></line-chart>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import LineChart from './../js/linechart.js';
import { GamestateClientDto } from '~/models/dto/gamestate.client.dto';

export default Vue.extend({
  name: 'GenerationStatsAvgLifetime',
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
        tooltips: {
          enabled: false,
        },
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
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
            arr[stat._generation] = stat._avgLifetime;
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
