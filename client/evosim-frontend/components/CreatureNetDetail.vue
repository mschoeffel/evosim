<template>
  <Network
    ref="network"
    :edges="renderEdges"
    :nodes="renderNodes"
    :options="options"
    class="w-full h-full"
    @select-node="selectNode"
    @deselect-node="deselectNode"
  >
  </Network>
</template>
<script lang="ts">
import Vue from 'vue';
import { NodeRenderDto } from '~/models/dto/node.render.dto';
import { EdgeRenderDto } from '~/models/dto/edge.render.dto';
import { BlobClient } from '~/models/blob.client';

export default Vue.extend({
  name: 'CreatureNetDetail',
  props: {
    selectedCreature: {
      type: BlobClient,
      default: () => {
        return new BlobClient();
      },
    },
  },
  data(): {
    nodes: Array<NodeRenderDto>;
    edges: Array<EdgeRenderDto>;
    options: {};
    nodeSelected: boolean;
    selectedEdgeIds: Array<string>;
  } {
    return {
      nodes: [],
      edges: [],
      options: {
        physics: false,
        // interaction: {
        //   dragNodes: false,
        // },
        nodes: {
          borderWidth: 1,
          // fixed: true,
        },
        edges: {
          color: 'lightgray',
        },
      },
      nodeSelected: false,
      selectedEdgeIds: [],
    };
  },
  computed: {
    renderNodes(): Array<NodeRenderDto> {
      // TODO: Cleanup & Optimize performance
      if (this.nodes.length > 0) {
        const nodesRender = this.nodes;

        const start = [
          this.$t('netSection.inputNodeLabels.energy'),
          this.$t('netSection.inputNodeLabels.energyCurrentTile'),
          this.$t('netSection.inputNodeLabels.energyTileAhead'),
        ];
        const end = [
          this.$t('netSection.outputNodeLabels.rotation'),
          this.$t('netSection.outputNodeLabels.move'),
          this.$t('netSection.outputNodeLabels.eat'),
        ];

        for (let i = 0; i < start.length; i++) {
          nodesRender[i].label = `${start[i]}: ${nodesRender[i].label}`;
          nodesRender[i].shape = 'dot';
        }

        let index = 0;
        for (
          let i = nodesRender.length - end.length;
          i < nodesRender.length;
          i++
        ) {
          nodesRender[i].label = `${end[index]}: ${nodesRender[i].label}`;
          nodesRender[i].shape = 'dot';
          index++;
        }

        return nodesRender;
      } else {
        return this.nodes;
      }
    },
    renderEdges(): Array<EdgeRenderDto> {
      // TODO: Cleanup & Optimize performance
      if (this.edges.length > 0) {
        const edgesRender = this.edges;

        if (this.nodeSelected) {
          for (const edge of edgesRender.filter(
            (e) => !this.selectedEdgeIds.includes(e.id),
          )) {
            edge.width = 0.1;
          }
          for (const edge of edgesRender.filter((e) =>
            this.selectedEdgeIds.includes(e.id),
          )) {
            edge.width = edge.widthHidden;
          }
        } else {
          for (const edge of edgesRender) {
            edge.width = edge.widthHidden + 1;
          }
        }

        return edgesRender;
      } else {
        return this.edges;
      }
    },
  },
  watch: {
    selectedCreature: {
      immediate: true,
      handler: 'update',
    },
  },
  methods: {
    update(newVal: BlobClient | undefined): void {
      if (newVal === undefined) {
        this.reset();
      } else {
        const nodes = [];
        for (const clientNode of this.selectedCreature.brain.nodes) {
          nodes.push(clientNode.toRenderDto());
        }
        this.nodes = nodes;

        const edges = [];
        for (const clientEdge of this.selectedCreature.brain.edges) {
          edges.push(clientEdge.toRenderDto());
        }
        this.edges = edges;
      }
    },
    reset(): void {
      this.nodes = [];
      this.edges = [];
      this.nodeSelected = false;
      this.selectedEdgeIds = [];
    },
    selectNode(e: any): void {
      this.nodeSelected = true;
      this.selectedEdgeIds = e.edges;
      for (const edgeId of e.edges) {
        const connectedEdges = this.edges.filter((e) => e.id === edgeId);
        for (const connectedEdge of connectedEdges) {
          connectedEdge.label = connectedEdge.labelHidden;
        }
      }
    },
    deselectNode(): void {
      this.nodeSelected = false;
      for (const edgeId of this.selectedEdgeIds) {
        const edge = this.edges.find((e) => e.id === edgeId);
        if (edge !== undefined) {
          edge.labelHidden = edge.label;
          edge.label = ' ';
        }
      }
    },
  },
});
</script>
