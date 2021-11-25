<template>
  <div id="chart">
    <ApexChart ref="c" :options="chartOptions" :series="chartData" height="200" type="line"></apexchart>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {BlobClient} from "~/models/blob.client";

export default Vue.extend({
  name: "GlobalStatsAvgGeneration",
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
      default: 0
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
        colors: this.colors,
        dataLabels: {
          enabled: false
        },
        chart: {
          toolbar: {
            show: false,
          },
        },
        stroke: {
          width: 2,
          curve: 'smooth'
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
      if (newVal !== undefined) {
        const newChartData = [];
        for (let population = 0; population < this.populations; population++) {
          const newChartDataPopulation = {id: population, name: `Population ${population}`, data: [] as Array<number>};
          const blobsOfPopulation = newVal.filter(b => b.population === population);
          let generationOfPopulation = 0;
          for (const blobOfPopulation of blobsOfPopulation) {
            generationOfPopulation += blobOfPopulation.generation;
          }
          generationOfPopulation = this.roundToTwoDigits(generationOfPopulation / blobsOfPopulation.length);

          const chartDataPopulationSet = this.chartData.find(d => d.id === population);
          if (chartDataPopulationSet !== undefined) {
            for (const element of chartDataPopulationSet.data) {
              newChartDataPopulation.data.push(element);
            }
          }
          newChartDataPopulation.data.push(generationOfPopulation);

          if (newChartDataPopulation.data.length > 10) {
            newChartDataPopulation.data.shift();
          }
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
