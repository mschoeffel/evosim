<template>
  <div>
    <h1>{{ $t('globalSection.heading') }}</h1>
    <div class="flex">
      <div class="w-1/3">{{ $t('globalSection.selectedLanguage') }}</div>
      <div class="w-2/3">
        <a
          :class="lang === 'en' ? 'underline text-blue-600' : 'text-blue-600'"
          href="#"
          @click.prevent.stop="changeLanguage('en')"
          >English</a
        >
        <a
          :class="lang === 'de' ? 'underline text-blue-600' : 'text-blue-600'"
          href="#"
          @click.prevent.stop="changeLanguage('de')"
          >Deutsch</a
        >
      </div>
    </div>
    <div class="flex">
      <div class="w-1/3">{{ $t('globalSection.currentTick') }}</div>
      <div class="w-2/3">{{ gamestate._currentTick }}</div>
    </div>
    <div class="flex">
      <div class="w-1/3">{{ $t('globalSection.populations') }}</div>
      <div class="w-2/3">{{ gamestate._populations }}</div>
    </div>
    <div class="flex">
      <div class="w-1/3">{{ $t('globalSection.creaturesPerPopulation') }}</div>
      <div class="w-2/3">{{ gamestate._creaturesPerPopulation }}</div>
    </div>
    <div class="flex">
      <div class="w-1/3">{{ $t('globalSection.gameTicksPerSecond') }}</div>
      <div class="w-2/3">{{ gamestate._ticksPerSecond }}</div>
    </div>
    <div class="flex">
      <div class="w-1/3">{{ $t('globalSection.renderTicksPerSecond') }}</div>
      <div class="w-2/3">{{ gamestate._ticksPerSecond }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'GlobalDetailsText',
  props: {
    gamestate: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      lang: 'en',
    };
  },
  beforeMount() {
    this.$i18n.setLocale(this.lang);
  },
  methods: {
    changeLanguage(l: string): void {
      this.$i18n.setLocale(l);
      this.lang = l;
    },
  },
});
</script>

<style scoped></style>
