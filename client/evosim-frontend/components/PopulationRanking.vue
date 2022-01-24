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
      <tr v-for="topCreature in topCreatures" :key="topCreature.id">
        <td
          class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
        >
          {{ roundToTwoDigits(topCreature.ticksAlive) }}
        </td>
        <td
          class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
        >
          <span
            :style="'background-color: ' + colors[topCreature.population]"
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
            >{{ topCreature.population }}</span
          >
        </td>
        <td
          class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600"
        >
          <a class="cursor-pointer" @click="emitSelect(topCreature.id)">{{
            $t('topSection.select')
          }}</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue';
import { BlobClient } from '~/models/blob.client';

export default Vue.extend({
  name: 'PopulationRanking',
  props: {
    creatures: {
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
    topCreatures: Array<BlobClient>;
    updateschedule: number;
  } {
    return {
      topCreatures: [],
      updateschedule: 10,
    };
  },
  watch: {
    creatures: {
      immediate: true,
      handler: 'update',
    },
  },
  methods: {
    roundToTwoDigits(x: number): number {
      return Math.round((x + Number.EPSILON) * 100) / 100;
    },
    emitSelect(id: string): void {
      this.$emit('selectCreature', id);
    },
    update(newVal: Array<BlobClient> | undefined): void {
      if (newVal !== undefined) {
        const topMap = new Map<number, BlobClient>();
        for (const blob of newVal) {
          if (!blob.alive) {
            continue;
          }
          if (!topMap.has(blob.population)) {
            topMap.set(blob.population, blob);
            continue;
          }
          const blobMap = topMap.get(blob.population);
          if (blobMap !== undefined && blob.ticksAlive > blobMap.ticksAlive) {
            topMap.set(blob.population, blob);
          }
        }
        this.topCreatures = Array.from(topMap.values());
      }
    },
  },
});
</script>

<style scoped></style>
