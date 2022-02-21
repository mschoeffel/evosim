<template>
  <div class="h-full">
    <Board ref="board" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Board from '~/components/Board.vue';

export default Vue.extend({
  components: { Board },
});
</script>
