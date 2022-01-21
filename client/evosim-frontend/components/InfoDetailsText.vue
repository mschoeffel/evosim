<template>
  <div class="px-4 py-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:items-start">
    <div class="mt-1 sm:mt-0">
      {{ $t('statsSection.infoText') }}
    </div>
    <div class="mt-1 sm:mt-0">
      <div
        class="
          flex
          h-full
          justify-center
          px-6
          pt-5
          pb-6
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
                text-indigo-600
                hover:text-indigo-500
                focus-within:outline-none
                focus-within:ring-2
                focus-within:ring-offset-2
                focus-within:ring-indigo-500
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
          <p class="text-xs text-gray-500">Snapshot JSON</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
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
