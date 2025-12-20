<script setup lang="ts">
type Props = {
  onPrimaryCta: () => void;
};

defineProps<Props>();
</script>

<template>
  <div
    class="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(16px,env(safe-area-inset-bottom))] sm:hidden"
    aria-hidden="true"
  >
    <div class="pointer-events-auto rounded-2xl border border-white/10 bg-black/70 p-3 backdrop-blur">
      <button
        type="button"
        class="w-full rounded-xl bg-exury-green px-4 py-3 text-sm font-medium text-black shadow-exury-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-exury-green focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none"
        @click="onPrimaryCta"
      >
        Solicita info
      </button>
    </div>
  </div>
</template>


