<template>
  <div id="chart">
    <ApexChart ref="c" :options="chartOptions" :series="chartData" height="200" type="line"></apexchart>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {BlobClient} from "~/models/blob.client";

export default Vue.extend({
  name: "GlobalStatsMaxGeneration",
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
    update(newVal: Array<BlobClient> | undefined): void {
      if (newVal !== undefined) {
        const newChartData = [];
        for (let population = 0; population < this.populations; population++) {
          const newChartDataPopulation = {id: population, name: `Population ${population}`, data: [] as Array<number>};
          const blobsOfPopulation = newVal.filter(b => b.population === population);
          let maxGenerationOfPopulation = 0;
          for (const blobOfPopulation of blobsOfPopulation) {
            if (blobOfPopulation.generation > maxGenerationOfPopulation) {
              maxGenerationOfPopulation = blobOfPopulation.generation;
            }
          }

          const chartDataPopulationSet = this.chartData.find(d => d.id === population);
          if (chartDataPopulationSet !== undefined) {
            for (const element of chartDataPopulationSet.data) {
              newChartDataPopulation.data.push(element);
            }
          }
          newChartDataPopulation.data.push(maxGenerationOfPopulation);

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
