<template>
  <div
    role="status"
    class="chip fixed z-50 inline-block rounded-md shadow-md"
    :style="{ backgroundColor: color }"
  >
    <p class="mx-6 my-2 text-white text-xs">
      {{ msg }}
    </p>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ msg?: string; color?: string }>(), {
  msg: '',
  color: '#000'
})
</script>

<style lang="scss" scoped>
.chip {
  right: 20px;
  bottom: 20px;
}
</style>
