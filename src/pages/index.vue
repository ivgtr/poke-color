<template>
  <main class="wrapper relative z-10 mx-10">
    <Title />
    <Colors />
    <portal-target name="notification" />
  </main>
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
  max-width: 720px;
}
</style>
