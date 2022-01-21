<template>
  <div>
    <div>
      <nav
        aria-label="Tabs"
        class="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
      >
        <a
          key="GlobalStatsMaxEnergy"
          :aria-current="
            currentTab === 'GlobalStatsAvgLife' ? 'page' : undefined
          "
          :class="[
            currentTab === 'GlobalStatsAvgLife'
              ? 'text-gray-900'
              : 'text-gray-500 hover:text-gray-700',
            'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
          ]"
          href="#"
          @click="currentTab = 'GlobalStatsAvgLife'"
        >
          <span>{{ $t('statsSection.headingAvgLifetimeGen') }}</span>
          <span
            :class="[
              currentTab === 'GlobalStatsAvgLife'
                ? 'bg-black'
                : 'bg-transparent',
              'absolute inset-x-0 bottom-0 h-0.5',
            ]"
            aria-hidden="true"
          />
        </a>
        <a
          key="GlobalStatsAvgEnergy"
          :aria-current="
            currentTab === 'GlobalStatsAvgEnergy' ? 'page' : undefined
          "
          :class="[
            currentTab === 'GlobalStatsAvgEnergy'
              ? 'text-gray-900'
              : 'text-gray-500 hover:text-gray-700',
            'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
          ]"
          href="#"
          @click="currentTab = 'GlobalStatsAvgEnergy'"
        >
          <span>{{ $t('statsSection.headingMaxLifetimeGen') }}</span>
          <span
            :class="[
              currentTab === 'GlobalStatsAvgEnergy'
                ? 'bg-black'
                : 'bg-transparent',
              'absolute inset-x-0 bottom-0 h-0.5',
            ]"
            aria-hidden="true"
          />
        </a>
        <a
          key="GlobalStatsAvgGeneration"
          :aria-current="
            currentTab === 'GlobalStatsAvgGeneration' ? 'page' : undefined
          "
          :class="[
            currentTab === 'GlobalStatsAvgGeneration'
              ? 'text-gray-900'
              : 'text-gray-500 hover:text-gray-700',
            'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
          ]"
          href="#"
          @click="currentTab = 'GlobalStatsAvgGeneration'"
        >
          <span>{{ $t('statsSection.headingAvgEnergyGen') }}</span>
          <span
            :class="[
              currentTab === 'GlobalStatsAvgGeneration'
                ? 'bg-black'
                : 'bg-transparent',
              'absolute inset-x-0 bottom-0 h-0.5',
            ]"
            aria-hidden="true"
          />
        </a>
      </nav>
    </div>
    <div>
      <GenerationStatsAvgLifetime
        v-if="currentTab === 'GlobalStatsAvgLife'"
        :colors="colors"
        :gamestate="gamestate"
      ></GenerationStatsAvgLifetime>
      <GenerationStatsMaxLifetime
        v-if="currentTab === 'GlobalStatsAvgEnergy'"
        :colors="colors"
        :gamestate="gamestate"
      ></GenerationStatsMaxLifetime>
      <GenerationStatsAvgEnergy
        v-if="currentTab === 'GlobalStatsAvgGeneration'"
        :colors="colors"
        :gamestate="gamestate"
      ></GenerationStatsAvgEnergy>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GenerationStatsAvgLifetime from '~/components/GenerationStatsAvgLifetime.vue';
import GenerationStatsMaxLifetime from '~/components/GenerationStatsMaxLifetime.vue';
import GenerationStatsAvgEnergy from '~/components/GenerationStatsAvgEnergy.vue';

export default Vue.extend({
  name: 'GenerationStatsSections',
  components: {
    GenerationStatsAvgEnergy,
    GenerationStatsMaxLifetime,
    GenerationStatsAvgLifetime,
  },
  props: {
    gamestate: {
      type: Object,
      default: () => {
        return {};
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
      currentTab: 'GlobalStatsAvgLife',
    };
  },
});
</script>
