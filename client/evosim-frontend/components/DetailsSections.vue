<template>
  <div>
    <div>
      <nav
        aria-label="Tabs"
        class="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
      >
        <a
          key="Info"
          :aria-current="currentTab === 'info' ? 'page' : undefined"
          :class="[
            currentTab === 'info'
              ? 'text-gray-900'
              : 'text-gray-500 hover:text-gray-700',
            'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
          ]"
          href=""
          @click.prevent="currentTab = 'info'"
        >
          <span>Info</span>
          <span
            :class="[
              currentTab === 'info' ? 'bg-black' : 'bg-transparent',
              'absolute inset-x-0 bottom-0 h-0.5',
            ]"
            aria-hidden="true"
          />
        </a>
        <a
          key="global"
          :aria-current="currentTab === 'global' ? 'page' : undefined"
          :class="[
            currentTab === 'global'
              ? 'text-gray-900'
              : 'text-gray-500 hover:text-gray-700',
            'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
          ]"
          href=""
          @click.prevent="currentTab = 'global'"
        >
          <span>{{ $t('globalSection.heading') }}</span>
          <span
            :class="[
              currentTab === 'global' ? 'bg-black' : 'bg-transparent',
              'absolute inset-x-0 bottom-0 h-0.5',
            ]"
            aria-hidden="true"
          />
        </a>
        <a
          key="figure"
          :aria-current="currentTab === 'figure' ? 'page' : undefined"
          :class="[
            currentTab === 'figure'
              ? 'text-gray-900'
              : 'text-gray-500 hover:text-gray-700',
            'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
          ]"
          href=""
          @click.prevent="currentTab = 'figure'"
        >
          <span>{{ $t('detailSection.heading') }}</span>
          <span
            :class="[
              currentTab === 'figure' ? 'bg-black' : 'bg-transparent',
              'absolute inset-x-0 bottom-0 h-0.5',
            ]"
            aria-hidden="true"
          />
        </a>
      </nav>
    </div>
    <div>
      <div v-if="currentTab === 'info'">
        <InfoDetailsText @updateSnapshot="updateSnapshot"></InfoDetailsText>
      </div>
      <div v-if="currentTab === 'global'">
        <GlobalDetailsText :gamestate="gamestate"></GlobalDetailsText>
      </div>
      <div v-if="currentTab === 'figure'">
        <FigureDetailsText
          :colors="colors"
          :figure="figure"
        ></FigureDetailsText>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GlobalDetailsText from '~/components/GlobalDetailsText.vue';
import { FigureClient } from '~/models/figure.client';
import InfoDetailsText from '~/components/InfoDetailsText.vue';
import FigureDetailsText from '~/components/FigureDetailsText.vue';

export default Vue.extend({
  name: 'DetailsSections',
  components: {
    FigureDetailsText,
    InfoDetailsText,
    GlobalDetailsText,
  },
  props: {
    gamestate: {
      type: Object,
      default: () => {
        return {};
      },
    },
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
  data: () => {
    return {
      currentTab: 'info',
    };
  },
  methods: {
    updateSnapshot(args: any): void {
      this.$emit('updateSnapshot', args);
    },
  },
});
</script>
