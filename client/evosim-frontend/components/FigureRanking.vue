<template>
  <table class="min-w-full divide-y divide-gray-200">
    <thead>
      <tr>
        <th
          class="
            px-6
            py-3
            text-left text-sm
            font-medium
            text-gray-900
            tracking-wider
          "
          scope="col"
        >
          {{ $t('topSection.topTicks') }}
        </th>
        <th
          class="
            px-6
            py-3
            text-left text-sm
            font-medium
            text-gray-900
            tracking-wider
          "
          scope="col"
        >
          {{ $t('topSection.population') }}
        </th>
        <th
          class="
            px-6
            py-3
            text-left text-sm
            font-medium
            text-gray-900
            tracking-wider
          "
          scope="col"
        >
          {{ $t('topSection.id') }}
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <tr v-for="topFigure in topFigures" :key="topFigure.id">
        <td
          class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
        >
          {{ roundToTwoDigits(topFigure.ticksAlive) }}
        </td>
        <td
          class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
        >
          <span
            :style="'background-color: ' + colors[topFigure.population]"
            class="
              inline-flex
              items-center
              px-2.5
              py-0.5
              rounded-full
              text-xs
              font-medium
              bg-blue-100
            "
            >{{ topFigure.population }}</span
          >
        </td>
        <td
          class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600"
        >
          <a class="cursor-pointer" @click="emitSelect(topFigure.id)">{{
            $t('topSection.select')
          }}</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue, { defineComponent } from 'vue';
import { FigureClient } from '~/models/figure.client';

export default defineComponent({
  name: 'FigureRanking',
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
  },
  data(): {
    topFigures: Array<FigureClient>;
    updateschedule: number;
  } {
    return {
      topFigures: [],
      updateschedule: 10,
    };
  },
  watch: {
    figures: {
      immediate: true,
      handler: 'update',
    },
  },
  methods: {
    roundToTwoDigits(x: number): number {
      return Math.round((x + Number.EPSILON) * 100) / 100;
    },
    emitSelect(id: string): void {
      this.$emit('selectFigure', id);
    },
    update(newVal: Array<FigureClient> | undefined): void {
      if (newVal !== undefined) {
        let top5LongestAlive = [0];
        let top5Figures = [] as Array<FigureClient>;
        const top = 4;
        for (const figure of newVal) {
          if (!figure.alive) {
            continue;
          }
          if (figure.ticksAlive > top5LongestAlive[0]) {
            top5LongestAlive.push(figure.ticksAlive);
            top5Figures.push(figure);
          }
          top5LongestAlive = top5LongestAlive.sort((a, b) => {
            return a - b;
          });
          top5Figures = top5Figures.sort((a, b) => {
            return a.ticksAlive - b.ticksAlive;
          });

          if (top5LongestAlive.length > top) {
            top5LongestAlive.shift();
          }
          if (top5Figures.length > top) {
            top5Figures.shift();
          }
        }
        this.topFigures = top5Figures.reverse();
      }
    },
  },
});
</script>

<style scoped></style>
