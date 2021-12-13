<template>
  <div class="w-full" style="height: 95vh">
    <!--<p class="text-red-600 font-mono"><b>TECH - DEMO</b> <i>[Websocket update is sent every 0.1 seconds | Game tick is every 0.1 second | Click on a creature will select it and show details | Creatures are acting depending on their neuronal network]</i></p>-->
    <Map />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Map from '~/components/Map.vue';

export default Vue.extend({
  components: { Map },
});
</script>
