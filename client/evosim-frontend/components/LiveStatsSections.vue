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
          <span>{{ $t('statsSection.headingAvgLifeNow') }}</span>
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
          <span>{{ $t('statsSection.headingAvgEnergyNow') }}</span>
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
          <span>{{ $t('statsSection.headingAvgGenerationNow') }}</span>
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
      <GlobalStatsAvgLife
        v-if="currentTab === 'GlobalStatsAvgLife'"
        :colors="colors"
        :creatures="creatures"
        :populations="populations"
      ></GlobalStatsAvgLife>
      <GlobalStatsAvgEnergy
        v-if="currentTab === 'GlobalStatsAvgEnergy'"
        :colors="colors"
        :creatures="creatures"
        :populations="populations"
      ></GlobalStatsAvgEnergy>
      <GlobalStatsAvgGeneration
        v-if="currentTab === 'GlobalStatsAvgGeneration'"
        :colors="colors"
        :creatures="creatures"
        :populations="populations"
      ></GlobalStatsAvgGeneration>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GlobalStatsAvgEnergy from '~/components/GlobalStatsAvgEnergy.vue';
import GlobalStatsAvgLife from '~/components/GlobalStatsAvgLife.vue';
import GlobalStatsAvgGeneration from '~/components/GlobalStatsAvgGeneration.vue';

export default Vue.extend({
  name: 'LiveStatsSections',
  components: {
    GlobalStatsAvgEnergy,
    GlobalStatsAvgLife,
    GlobalStatsAvgGeneration,
  },
  props: {
    creatures: {
      type: Array,
      default: () => {
        return [];
      },
    },
    colors: {
      type: Array,
      default: () => {
        return [];
      },
    },
    populations: {
      type: Number,
      default: 0,
    },
  },
  data: () => {
    return {
      currentTab: 'GlobalStatsAvgLife',
    };
  },
});
</script>
