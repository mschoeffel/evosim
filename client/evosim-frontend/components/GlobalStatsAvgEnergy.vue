<template>
  <div id="chart">
    <ApexChart ref="c" :options="chartOptions" :series="chartData" height="200" type="line"></ApexChart>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {BlobClient} from "~/models/blob.client";

export default Vue.extend({
  name: "GlobalStatsAvgEnergy",
  props: {
    creatures: {
      type: Array,
      default: () => {
        return []
      }
    },
    colors: {
      type: Array,
      default: () => {
        return []
      }
    },
    populations: {
      type: Number,
      default: 0,
    }
  },
  data(): {
    chartData: Array<{
      id: number,
      name: string,
      data: Array<number>
    }>,
    chartOptions: {}
  } {
    return {
      chartData: [],
      chartOptions: {
        id: 'GlobalStatsMaxEnergyChart',
        colors: this.colors,
        dataLabels: {
          enabled: false
        },
        tooltip: {
          enabled: false
        },
        chart: {
          toolbar: {
            show: false,
          },
          selection: {
            enabled: false,
          },
          zoom: {
            enabled: false
          },
          animations: {
            enabled: false
          }
        },
        stroke: {
          width: 2,
          curve: 'smooth'
        },
        xaxis: {
          labels: {
            show: false
          }
        },
        yaxis: {
          min: 0,
          max: 110,
          tickAmount: 11,
        },
      },
    }
  },
  watch: {
    creatures: {
      immediate: true,
      handler: 'update'
    }
  },
  methods: {
    roundToTwoDigits(x: number): number {
      return Math.round((x + Number.EPSILON) * 100) / 100
    },
    update(newVal: Array<BlobClient> | undefined): void {
      // TODO: Optimize
      if (newVal !== undefined) {
        const newChartData = [];
        const sumOfEachPopulation = [];
        const countOfEachPopulation = [];

        for (let p = 0; p < this.populations; p++) {
          sumOfEachPopulation[p] = 0;
          countOfEachPopulation[p] = 0;
        }

        for (const blob of newVal) {
          sumOfEachPopulation[blob.population] += blob.energy;
          countOfEachPopulation[blob.population]++;
        }

        for (let population = 0; population < this.populations; population++) {
          const newChartDataPopulation = {
            id: population,
            name: `${this.$t("statsSection.population")} ${population}`,
            data: [] as Array<number>
          };
          const chartDataPopulationSet = this.chartData.find(d => d.id === population);
          if (chartDataPopulationSet !== undefined) {
            for (const element of chartDataPopulationSet.data) {
              newChartDataPopulation.data.push(element);
            }
            if (newChartDataPopulation.data.length > 9) {
              newChartDataPopulation.data.shift();
            }
          }
          newChartDataPopulation.data.push(this.roundToTwoDigits(sumOfEachPopulation[population] / countOfEachPopulation[population]));
          newChartData.push(newChartDataPopulation);
        }
        this.chartData = newChartData;
      }
    }
  }
})
</script>

<style scoped>

</style>
