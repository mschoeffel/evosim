<template>
  <div class="h-full">
    <Board ref="board" />
  </div>
</template>

<script lang="ts">
import Board from '~/components/Board.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { Board },
});
</script>
