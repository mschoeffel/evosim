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
  name: 'PopulationRanking',
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
        const topMap = new Map<number, FigureClient>();
        for (const figure of newVal) {
          if (!figure.alive) {
            continue;
          }
          if (!topMap.has(figure.population)) {
            topMap.set(figure.population, figure);
            continue;
          }
          const figureMap = topMap.get(figure.population);
          if (
            figureMap !== undefined &&
            figure.ticksAlive > figureMap.ticksAlive
          ) {
            topMap.set(figure.population, figure);
          }
        }
        this.topFigures = Array.from(topMap.values());
      }
    },
  },
});
</script>

<style scoped></style>
