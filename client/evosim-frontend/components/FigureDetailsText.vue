<template>
  <div class="px-4 py-4 grid grid-cols-2 sm:grid-cols-4">
    <div class="sm:col-span-1">
      <div>{{ $t('detailSection.state') }}</div>
    </div>
    <div class="sm:col-span-3">
      <div
        v-if="figure !== undefined"
        :class="figure.alive ? 'text-green-600' : 'text-red-600'"
      >
        {{ $t(`detailSection.alive.${figure.alive}`) }}
      </div>
    </div>

    <div class="sm:col-span-1">
      <div>{{ $t('detailSection.id') }}</div>
    </div>
    <div class="sm:col-span-3">
      <div v-if="figure !== undefined">{{ figure.id }}</div>
    </div>

    <div class="sm:col-span-1">
      <div>{{ $t('detailSection.x') }}</div>
    </div>
    <div class="sm:col-span-1">
      <div v-if="figure !== undefined && figure.x !== undefined">
        {{ roundToTwoDigits(figure.x) }}
      </div>
    </div>

    <div class="sm:col-span-1">
      <div>{{ $t('detailSection.y') }}</div>
    </div>
    <div class="sm:col-span-1">
      <div v-if="figure !== undefined && figure.y !== undefined">
        {{ roundToTwoDigits(figure.y) }}
      </div>
    </div>

    <div class="sm:col-span-1">
      <div>{{ $t('detailSection.direction') }}</div>
    </div>
    <div class="sm:col-span-1">
      <div v-if="figure !== undefined && figure.y !== undefined">
        {{ roundToTwoDigits(figure.direction) }}
      </div>
    </div>

    <div class="sm:col-span-1">
      <div>{{ $t('detailSection.energy') }}</div>
    </div>
    <div class="sm:col-span-1">
      <div v-if="figure !== undefined && figure.y !== undefined">
        {{ roundToTwoDigits(figure.energy) }}
      </div>
    </div>

    <div class="sm:col-span-1">
      <div>{{ $t('detailSection.population') }}</div>
    </div>
    <div class="sm:col-span-1">
      <div v-if="figure !== undefined && figure.population !== undefined">
        <span
          :style="'background-color: ' + colors[figure.population]"
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
          >{{ figure.population }}</span
        >
      </div>
    </div>

    <div class="sm:col-span-1">
      <div>{{ $t('detailSection.generation') }}</div>
    </div>
    <div class="sm:col-span-1">
      <div v-if="figure !== undefined && figure.y !== undefined">
        {{ figure.generation }}
      </div>
    </div>

    <div class="sm:col-span-1">
      <div>{{ $t('detailSection.initTick') }}</div>
    </div>
    <div class="sm:col-span-1">
      <div v-if="figure !== undefined && figure.y !== undefined">
        {{ figure.initTick }}
      </div>
    </div>

    <div class="sm:col-span-1">
      <div>{{ $t('detailSection.ticksAlive') }}</div>
    </div>
    <div class="sm:col-span-1">
      <div v-if="figure !== undefined && figure.y !== undefined">
        {{ figure.ticksAlive }}
      </div>
    </div>

    <div class="sm:col-span-1">
      <div>{{ $t('detailSection.algorithm') }}</div>
    </div>
    <div class="sm:col-span-1">
      <div v-if="figure !== undefined && figure.y !== undefined">
        {{ figure.algorithm }}
      </div>
    </div>

    <div class="sm:col-span-1">
      <div>{{ $t('detailSection.activation') }}</div>
    </div>
    <div class="sm:col-span-1">
      <div v-if="figure !== undefined && figure.y !== undefined">
        {{ figure.activation }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from 'vue';
import { FigureClient } from '~/models/figure.client';

export default defineComponent({
  name: 'FigureDetailsText',
  props: {
    figure: {
      type: FigureClient,
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
