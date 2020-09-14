<template>
  <div
    class="chip fixed z-50 inline-block rounded-md shadow-md"
    :style="{ backgroundColor: color }"
  >
    <p class="mx-6 my-2 text-white text-xs">{{ msg }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    msg: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#000',
      validator: (val) => {
        return val.charAt(0) === '#'
      }
    }
  },
  data() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.chip {
  right: 20px;
  bottom: 20px;
}
</style>
