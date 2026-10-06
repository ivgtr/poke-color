<template>
  <div class="root relative w-full grid items-center justify-center overflow-hidden">
    <main class="wrapper relative z-10 mx-10 pb-20">
      <AppTitle />
      <Colors @preview="preview = $event" />
    </main>
    <AppFooter />
    <div
      class="bg fixed inset-0 z-0 h-full w-full pointer-events-none"
      :style="{ backgroundColor: preview, opacity: preview === '#fff' ? '0' : '1' }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppTitle from './components/Title.vue'
import AppFooter from './components/Footer.vue'
import Colors from './components/colors.vue'

const preview = ref('#fff')
</script>

<style scoped>
.wrapper {
  max-width: 720px;
}
.bg {
  transition: all 0.2s ease-in;
}
</style>
