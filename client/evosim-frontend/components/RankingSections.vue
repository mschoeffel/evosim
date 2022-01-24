<template>
  <div>
    <div>
      <nav
        aria-label="Tabs"
        class="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
      >
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
          <span>{{ $t('topSection.headingTopGeneral') }}</span>
          <span
            :class="[
              currentTab === 'global' ? 'bg-black' : 'bg-transparent',
              'absolute inset-x-0 bottom-0 h-0.5',
            ]"
            aria-hidden="true"
          />
        </a>
        <a
          key="population"
          :aria-current="currentTab === 'population' ? 'page' : undefined"
          :class="[
            currentTab === 'population'
              ? 'text-gray-900'
              : 'text-gray-500 hover:text-gray-700',
            'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
          ]"
          href=""
          @click.prevent="currentTab = 'population'"
        >
          <span>{{ $t('topSection.headingTopPopulation') }}</span>
          <span
            :class="[
              currentTab === 'population' ? 'bg-black' : 'bg-transparent',
              'absolute inset-x-0 bottom-0 h-0.5',
            ]"
            aria-hidden="true"
          />
        </a>
      </nav>
    </div>
    <div>
      <div v-if="currentTab === 'global'">
        <CreatureRanking
          :colors="colors"
          :creatures="creatures"
          @selectCreature="emitSelect"
        ></CreatureRanking>
      </div>
      <div v-if="currentTab === 'population'">
        <PopulationRanking
          :colors="colors"
          :creatures="creatures"
          @selectCreature="emitSelect"
        ></PopulationRanking>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CreatureRanking from '~/components/CreatureRanking.vue';
import PopulationRanking from '~/components/PopulationRanking.vue';

export default Vue.extend({
  name: 'RankingSections',
  components: {
    PopulationRanking,
    CreatureRanking,
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
  },
  data: () => {
    return {
      currentTab: 'global',
    };
  },
  methods: {
    emitSelect(id: string): void {
      this.$emit('selectCreature', id);
    },
  },
});
</script>
