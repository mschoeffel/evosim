<template>
  <div ref="networkContainer" class="w-full h-full"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { Network } from 'vis-network/standalone';
import type { Data, Options } from 'vis-network';

export default defineComponent({
  name: 'NetworkWrapper',
  props: {
    nodes: { type: Array, required: true },
    edges: { type: Array, required: true },
    options: { type: Object, default: () => ({}) },
  },
  emits: ['select-node', 'deselect-node'],
  setup(props, { emit }) {
    const networkContainer = ref<HTMLElement | null>(null);
    let network: Network | null = null;

    const updateNetwork = () => {
      if (network && networkContainer.value) {
        // Zoom und Position speichern
        const position = network.getViewPosition();
        const scale = network.getScale();
        network.setData({ nodes: props.nodes, edges: props.edges });
        // Zoom und Position wiederherstellen
        network.moveTo({ position, scale });
      }
    };

    onMounted(() => {
      if (networkContainer.value) {
        network = new Network(
          networkContainer.value,
          { nodes: props.nodes, edges: props.edges } as Data,
          props.options as Options
        );
        network.on('selectNode', (params) => {
          emit('select-node', params);
        });
        network.on('deselectNode', (params) => {
          emit('deselect-node', params);
        });
      }
    });

    watch(() => [props.nodes, props.edges], updateNetwork, { deep: true });

    onBeforeUnmount(() => {
      if (network) {
        network.destroy();
        network = null;
      }
    });

    return { networkContainer, network };
  },
});
</script>

<style scoped>
.w-full {
  width: 100%;
}
.h-full {
  height: 100%;
}
</style>
