<template>
  <div>
    <h1>Creature Details</h1>
    <div class="flex">
      <div class="w-1/3">State</div>
      <div v-if="creature !== undefined" class="w-2/3">{{ creature.state }}</div>
    </div>
    <div class="flex">
      <div class="w-1/3">ID</div>
      <div v-if="creature !== undefined" class="w-2/3">{{ creature.id }}</div>
    </div>
    <div class="flex">
      <div class="w-1/3">X-Position</div>
      <div v-if="creature !== undefined && creature.x !== undefined" class="w-2/3">{{ roundToTwoDigits(creature.x) }}
      </div>
    </div>
    <div class="flex">
      <div class="w-1/3">Y-Position</div>
      <div v-if="creature !== undefined && creature.y !== undefined" class="w-2/3">{{ roundToTwoDigits(creature.y) }}
      </div>
    </div>
    <div class="flex">
      <div class="w-1/3">Direction</div>
      <div v-if="creature !== undefined && creature.direction !== undefined" class="w-2/3">
        {{ roundToTwoDigits(creature.direction) }}
      </div>
    </div>
    <div class="flex">
      <div class="w-1/3">Energy</div>
      <div v-if="creature !== undefined && creature.energy !== undefined" class="w-2/3">
        {{ roundToTwoDigits(creature.energy) }}
      </div>
    </div>
    <div class="flex">
      <div class="w-1/3">Population</div>
      <div v-if="creature !== undefined && creature.population !== undefined" class="w-2/3"><span
        :style="'background-color: '+ colors[creature.population] "
        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100">{{ creature.population }}</span></div>
    </div>
    <div class="flex">
      <div class="w-1/3">Generation</div>
      <div v-if="creature !== undefined" class="w-2/3">{{ creature.generation }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {BlobClient} from "~/models/blob.client";

export default Vue.extend({
  name: "CreatureDetailsText",
  props: {
    creature: {
      type: BlobClient,
      default: () => {
        return undefined
      }
    },
    colors: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  methods: {
    roundToTwoDigits(n: number): number {
      return Math.round((n + Number.EPSILON) * 1000) / 1000
    }
  }
})
</script>

<style scoped>

</style>
