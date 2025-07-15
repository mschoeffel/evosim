<template>
  <div class="px-4 py-4 flex w-full h-full flex-wrap 2xl:flex-nowrap">
    <div class="h-full w-full pr-4">
      {{ $t('statsSection.infoText') }}
    </div>
    <div
      class="h-full w-full pt-4 2xl:pt-0 flex flex-col justify-items-stretch"
    >
      <div
        class="
          flex
          h-full
          justify-center
          px-4
          py-4
          border-2 border-gray-300 border-dashed
          rounded-md
        "
      >
        <div class="space-y-1 text-center">
          <div class="flex text-sm text-gray-600">
            <label
              for="file-upload"
              class="
                relative
                cursor-pointer
                bg-white
                rounded-md
                font-medium
                text-blue-600
                hover:text-blue-500
                focus-within:outline-none
                focus-within:ring-2
                focus-within:ring-offset-2
                focus-within:ring-blue-500
              "
            >
              <span>{{ $t('statsSection.infoSnapshotUpload') }}</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                class="sr-only"
                @change="onFileChange"
              />
            </label>
          </div>
          <p class="text-xs m-auto w-32 text-gray-500">
            {{ $t('statsSection.infoSnapshotUploadDescription') }}
          </p>
        </div>
      </div>
      <div class="py-4">
        <p class="font-medium">{{ $t('statsSection.credits') }}</p>
        <ul class="px-4 list-inside list-disc">
          <li>
            <a
              href="https://github.com/mschoeffel/evosim"
              class="text-blue-600 cursor-pointer"
              >GitHub</a
            >
          </li>
          <li>
            <NuxtLink class="text-blue-600" to="/manual">{{
              $t('manual.help')
            }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from 'vue';

export default defineComponent({
  name: 'InfoDetailsText',
  methods: {
    onFileChange(e: any) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      const fr = new FileReader();

      fr.onload = (e) => {
        if (e.target !== null && typeof e.target.result === 'string') {
          const result = JSON.parse(e.target.result);
          this.$emit('updateSnapshot', result);
        }
      };

      fr.readAsText(files[0]);
    },
  },
});
</script>
