<template>
  <div class="wrapper mx-20">
    <h1 class="text-center text-5xl font-bold mt-12">poke color</h1>
    <colors />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import pokemon from '~/localize/pokemon/ja.json'

export default Vue.extend({
  data() {
    return {
      pokemon,
      preview: ''
    }
  },
  mounted() {},
  methods: {
    colorPreview(color: string): void {
      this.preview = color
    }
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  width: calc(100vw - 10rem);
}
</style>
