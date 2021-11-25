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
      if (newVal !== undefined) {
        const newChartData = [];
        for (let population = 0; population < this.populations; population++) {
          const newChartDataPopulation = {id: population, name: `Population ${population}`, data: [] as Array<number>};
          const blobsOfPopulation = newVal.filter(b => b.population === population);
          let energyOfPopulation = 0;
          for (const blobOfPopulation of blobsOfPopulation) {
            energyOfPopulation += blobOfPopulation.energy;
          }
          energyOfPopulation = this.roundToTwoDigits(energyOfPopulation / blobsOfPopulation.length);

          const chartDataPopulationSet = this.chartData.find(d => d.id === population);
          if (chartDataPopulationSet !== undefined) {
            for (const element of chartDataPopulationSet.data) {
              newChartDataPopulation.data.push(element);
            }
          }
          newChartDataPopulation.data.push(energyOfPopulation);

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
