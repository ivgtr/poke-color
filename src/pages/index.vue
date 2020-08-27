<template>
  <div class="wrapper">
    <h1 class="text-center text-5xl font-bold mt-12">poke color</h1>
    <div class="colors grid grid-cols-5 gap-4 mt-12">
      <div
        v-for="p in pokemon"
        :key="p.id"
        class="pokeomn inline-block rounded-md h-32 w-32"
        :style="{ backgroundColor: p.Color }"
      >
        <p>
          {{ p.Name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import pokemon from '~/localize/pokemon/ja.json'

export default Vue.extend({
  data() {
    return {
      pokemon
    }
  },
  mounted() {
    this.test()
  },
  methods: {
    test(): void {
      console.log('test')
    }
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
}
</style>
