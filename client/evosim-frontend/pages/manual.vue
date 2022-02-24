<template>
  <div class="relative py-16 bg-white overflow-hidden">
    <div class="relative px-4 sm:px-6 lg:px-8">
      <div class="text-lg max-w-prose mx-auto">
        <h1>
          <span
            class="
              block
              text-base text-center text-blue-600
              font-semibold
              tracking-wide
              uppercase
            "
            >EvoSim</span
          >
          <span
            class="
              mt-2
              block
              text-3xl text-center
              leading-8
              font-extrabold
              tracking-tight
              text-gray-900
              sm:text-4xl
            "
            >{{ $t('manual.heading') }}</span
          >
        </h1>
        <p class="text-center text-sm text-blue-600">
          <a
            :class="lang === 'en' ? 'underline' : ''"
            href="#"
            @click.prevent.stop="changeLanguage('en')"
            >English</a
          >
          <a
            :class="lang === 'de' ? 'underline' : ''"
            href="#"
            @click.prevent.stop="changeLanguage('de')"
            >Deutsch</a
          >
        </p>
        <p class="mt-8 text-xl text-gray-500 leading-8">
          {{ $t('manual.subtitle') }}
        </p>
      </div>
      <div class="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
        <p>
          {{ $t('manual.summary') }}<br />{{ $t('manual.back') }}
          <NuxtLink class="text-blue-600 no-underline" to="/">{{
            $t('manual.backlink')
          }}</NuxtLink
          >.
        </p>
        <h2>{{ $t('manual.section1.heading') }}</h2>
        <p>{{ $t('manual.section1.text1') }}</p>
        <blockquote>
          <p>{{ $t('manual.section1.quote') }}</p>
        </blockquote>
        <p>{{ $t('manual.section1.text2') }}</p>
        <h2>{{ $t('manual.section2.heading') }}</h2>
        <p>{{ $t('manual.section2.introduction') }}</p>
        <h3>{{ $t('manual.section2.subheading1') }}</h3>
        <p>{{ $t('manual.section2.text1') }}</p>
        <h3>{{ $t('manual.section2.subheading2') }}</h3>
        <p>{{ $t('manual.section2.text2') }}</p>
        <p>{{ $t('manual.section2.text3') }}</p>
        <p>{{ $t('manual.section2.text4') }}</p>
        <p>{{ $t('manual.section2.text5') }}</p>
        <p>{{ $t('manual.section2.text6') }}</p>
        <p>{{ $t('manual.section2.text7') }}</p>
        <h3>{{ $t('manual.section2.subheading3') }}</h3>
        <p>{{ $t('manual.section2.text8') }}</p>
        <h3>{{ $t('manual.section2.subheading4') }}</h3>
        <p>{{ $t('manual.section2.text9') }}</p>
        <h2>{{ $t('manual.section3.heading') }}</h2>
        <p>{{ $t('manual.section3.introduction') }}</p>
        <p>{{ $t('manual.section3.introduction2') }}</p>
        <h3>{{ $t('manual.section3.subheading1') }}</h3>
        <figure>
          <img
            class="w-full rounded-lg border-2"
            src="/leftSide.png"
            alt=""
            width="1196"
            height="1196"
          />
          <figcaption>{{ $t('manual.section3.image1') }}</figcaption>
        </figure>
        <p>{{ $t('manual.section3.text1') }}</p>
        <figure>
          <img
            class="w-full rounded-lg border-2"
            src="/gradient.png"
            alt=""
            width="356"
            height="75"
          />
          <figcaption>{{ $t('manual.section3.image2') }}</figcaption>
        </figure>
        <p>{{ $t('manual.section3.text2') }}</p>
        <p>{{ $t('manual.section3.text3') }}</p>
        <h3>{{ $t('manual.section3.subheading2') }}</h3>
        <figure>
          <img
            class="w-full rounded-lg border-2"
            :src="lang === 'de' ? '/rightSide.png' : '/rightSide-en.png'"
            alt=""
            width="1280"
            height="1297"
          />
          <figcaption>{{ $t('manual.section3.image3') }}</figcaption>
        </figure>
        <p>{{ $t('manual.section3.text4') }}</p>
        <h4>{{ $t('manual.section3.subheading3') }}</h4>
        <figure>
          <img
            class="w-full rounded-lg border-2"
            :src="lang === 'de' ? '/leftTop.png' : '/leftTop-en.png'"
            alt=""
            width="636"
            height="316"
          />
          <figcaption>{{ $t('manual.section3.image4') }}</figcaption>
        </figure>
        <p>{{ $t('manual.section3.text5') }}</p>
        <h4>{{ $t('manual.section3.subheading4') }}</h4>
        <figure>
          <img
            class="w-full rounded-lg border-2"
            :src="lang === 'de' ? '/rightTop.png' : '/rightTop-en.png'"
            alt=""
            width="636"
            height="316"
          />
          <figcaption>{{ $t('manual.section3.image5') }}</figcaption>
        </figure>
        <p>{{ $t('manual.section3.text6') }}</p>
        <h4>{{ $t('manual.section3.subheading5') }}</h4>
        <figure>
          <img
            class="w-full rounded-lg border-2"
            :src="lang === 'de' ? '/middle.png' : '/middle-en.png'"
            alt=""
            width="657"
            height="557"
          />
          <figcaption>{{ $t('manual.section3.image6') }}</figcaption>
        </figure>
        <p>{{ $t('manual.section3.text7') }}</p>
        <h4>{{ $t('manual.section3.subheading6') }}</h4>
        <figure>
          <img
            class="w-full rounded-lg border-2"
            :src="lang === 'de' ? '/leftBot.png' : '/leftBot-en.png'"
            alt=""
            width="636"
            height="316"
          />
          <figcaption>{{ $t('manual.section3.image7') }}</figcaption>
        </figure>
        <p>{{ $t('manual.section3.text8') }}</p>
        <h4>{{ $t('manual.section3.subheading7') }}</h4>
        <figure>
          <img
            class="w-full rounded-lg border-2"
            :src="lang === 'de' ? '/rightBot.png' : '/rightBot-en.png'"
            alt=""
            width="636"
            height="316"
          />
          <figcaption>{{ $t('manual.section3.image8') }}</figcaption>
        </figure>
        <p>{{ $t('manual.section3.text9') }}</p>
        <h2>{{ $t('manual.section4.heading') }}</h2>
        <p>{{ $t('manual.section4.text1') }}</p>
        <p>{{ $t('manual.section4.text2') }}</p>
        <p>{{ $t('manual.section4.text3') }}</p>
        <p>{{ $t('manual.section4.text4') }}</p>
        <h2>{{ $t('manual.section5.heading') }}</h2>
        <p>{{ $t('manual.section5.text') }}</p>
        <h2>{{ $t('manual.section6.heading') }}</h2>
        <p>{{ $t('manual.section6.text1') }}</p>
        <p>{{ $t('manual.section6.text2') }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Manual',
  data() {
    return {
      lang: this.$i18n.locale,
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
