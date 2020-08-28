<template>
  <div class="items grid gap-4 mt-12 content-center justify-center">
    <div
      v-for="p in pokemon"
      :key="p.id"
      class="container inline-block rounded-md h-32 w-24 overflow-hidden cursor-pointer mx-auto"
      :mouseover="colorPreview(p.color)"
    >
      <div
        class="item inline-block h-0 w-full"
        :style="{ backgroundColor: p.Color }"
      ></div>
      <p class="text-center text-xs">No. {{ p.Number }}</p>
    </div>
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
.items {
  grid-template-columns: repeat(auto-fit, 120px);
  grid-template-rows: auto;
  transition: all 0.3s ease-in;
  .container {
    // box-shadow: 2px 2px 6px #d9d9d9;
    .item {
      padding-bottom: 50%;
      margin-bottom: 50%;
      border-radius: 50% / 100% 100% 0 0;
    }
    &:hover {
      // transition: transform 0.2s ease-in;
      // transform: translateY(-5px);
      .item {
        border-radius: 50%;
        transition: all 0.2s ease-in;
        transform: scale(0.7);
        padding-bottom: 100%;
        margin-bottom: 0;
      }
    }
  }
}
</style>
