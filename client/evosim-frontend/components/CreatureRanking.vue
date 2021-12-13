<template>
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="border-b-2 border-black">
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
          {{ $t('topSection.topEnergy') }}
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
          {{ roundToTwoDigits(topCreature.energy) }}
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
          class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
        >
          <a class="cursor-pointer" @click="emitSelect(topCreature.id)">{{
            topCreature.id
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
  name: 'CreatureRanking',
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
        let top5Energy = [0];
        let top5Creature = [] as Array<BlobClient>;
        const top = 4;
        for (const blob of newVal) {
          if (blob.energy > top5Energy[0]) {
            top5Energy.push(blob.energy);
            top5Creature.push(blob);
          }
          top5Energy = top5Energy.sort((a, b) => {
            return a - b;
          });
          top5Creature = top5Creature.sort((a, b) => {
            return a.energy - b.energy;
          });

          if (top5Energy.length > top) {
            top5Energy.shift();
          }
          if (top5Creature.length > top) {
            top5Creature.shift();
          }
        }
        this.topCreatures = top5Creature.reverse();
      }
    },
  },
});
</script>

<style scoped></style>
