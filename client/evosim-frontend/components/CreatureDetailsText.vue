<template>
  <div class="px-4 py-4 grid grid-cols-2 sm:grid-cols-4">
    <div class="sm:col-span-1">
      <div>{{ $t('detailSection.state') }}</div>
    </div>
    <div class="sm:col-span-3">
      <div
        v-if="creature !== undefined"
        :class="creature.alive ? 'text-green-600' : 'text-red-600'"
      >
        {{ $t(`detailSection.alive.${creature.alive}`) }}
      </div>
    </div>

    <div class="sm:col-span-1">
      <div>{{ $t('detailSection.id') }}</div>
    </div>
    <div class="sm:col-span-3">
      <div v-if="creature !== undefined">{{ creature.id }}</div>
    </div>

    <div class="sm:col-span-1">
      <div>{{ $t('detailSection.x') }}</div>
    </div>
    <div class="sm:col-span-1">
      <div v-if="creature !== undefined && creature.x !== undefined">
        {{ roundToTwoDigits(creature.x) }}
      </div>
    </div>

    <div class="sm:col-span-1">
      <div>{{ $t('detailSection.y') }}</div>
    </div>
    <div class="sm:col-span-1">
      <div v-if="creature !== undefined && creature.y !== undefined">
        {{ roundToTwoDigits(creature.y) }}
      </div>
    </div>

    <div class="sm:col-span-1">
      <div>{{ $t('detailSection.direction') }}</div>
    </div>
    <div class="sm:col-span-1">
      <div v-if="creature !== undefined && creature.y !== undefined">
        {{ roundToTwoDigits(creature.direction) }}
      </div>
    </div>

    <div class="sm:col-span-1">
      <div>{{ $t('detailSection.energy') }}</div>
    </div>
    <div class="sm:col-span-1">
      <div v-if="creature !== undefined && creature.y !== undefined">
        {{ roundToTwoDigits(creature.energy) }}
      </div>
    </div>

    <div class="sm:col-span-1">
      <div>{{ $t('detailSection.population') }}</div>
    </div>
    <div class="sm:col-span-1">
      <div v-if="creature !== undefined && creature.population !== undefined">
        <span
          :style="'background-color: ' + colors[creature.population]"
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
          >{{ creature.population }}</span
        >
      </div>
    </div>

    <div class="sm:col-span-1">
      <div>{{ $t('detailSection.generation') }}</div>
    </div>
    <div class="sm:col-span-1">
      <div v-if="creature !== undefined && creature.y !== undefined">
        {{ creature.generation }}
      </div>
    </div>

    <div class="sm:col-span-1">
      <div>{{ $t('detailSection.initTick') }}</div>
    </div>
    <div class="sm:col-span-1">
      <div v-if="creature !== undefined && creature.y !== undefined">
        {{ creature.initTick }}
      </div>
    </div>

    <div class="sm:col-span-1">
      <div>{{ $t('detailSection.ticksAlive') }}</div>
    </div>
    <div class="sm:col-span-1">
      <div v-if="creature !== undefined && creature.y !== undefined">
        {{ creature.ticksAlive }}
      </div>
    </div>

    <div class="sm:col-span-1">
      <div>{{ $t('detailSection.algorithm') }}</div>
    </div>
    <div class="sm:col-span-1">
      <div v-if="creature !== undefined && creature.y !== undefined">
        {{ creature.algorithm }}
      </div>
    </div>

    <div class="sm:col-span-1">
      <div>{{ $t('detailSection.activation') }}</div>
    </div>
    <div class="sm:col-span-1">
      <div v-if="creature !== undefined && creature.y !== undefined">
        {{ creature.activation }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { BlobClient } from '~/models/blob.client';

export default Vue.extend({
  name: 'CreatureDetailsText',
  props: {
    creature: {
      type: BlobClient,
      default: () => {
        return undefined;
      },
    },
    colors: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    roundToTwoDigits(n: number): number {
      return Math.round((n + Number.EPSILON) * 1000) / 1000;
    },
  },
});
</script>

<style scoped></style>
