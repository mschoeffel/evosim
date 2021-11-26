<template>
  <div>
    <h1>Global Details</h1>
    <div class="flex">
      <div class="w-1/3">Populations</div>
      <div class="w-2/3">5</div>
    </div>
    <div class="flex">
      <div class="w-1/3">Creatures per Population</div>
      <div class="w-2/3">10</div>
    </div>
    <div class="flex">
      <div class="w-1/3">Game ticks per second</div>
      <div class="w-2/3">10</div>
    </div>
    <div class="flex">
      <div class="w-1/3">Render ticks per second</div>
      <div class="w-2/3">10</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "GlobalDetailsText"
})
</script>

<style scoped>

</style>
