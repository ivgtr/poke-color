<template>
  <div class="items flex gap-4 mt-12 content-center justify-center">
    <div
      v-for="p in pokemon"
      :key="p.id"
      class="item inline-block w-32 mx-auto"
    >
      <div
        class="container relative h-32 w-full rounded-md overflow-hidden bg-white shadow-md cursor-pointer"
      >
        <div
          class="color relative z-10 grid h-full w-full rounded"
          @mouseover.self="colorPreview(p.Color)"
          @mouseleave="colorPreview('#fff')"
          @click.self="onCopy(p.Color)"
        >
          <span
            class="inline-block w-full"
            :style="{ backgroundColor: p.Color }"
            @mouseover.self="colorPreview(p.Color)"
            @click="onCopy(p.Color)"
          ></span>
          <span
            class="inline-block w-full"
            :style="{ backgroundColor: p.SubColor }"
            @mouseover.self="colorPreview(p.SubColor)"
            @click="onCopy(p.SubColor)"
          ></span>
        </div>
        <div class="absolute z-0 w-full bottom-0">
          <p
            class="text-xs w-full text-center pointer-events-none"
            :style="{ color: p.Color }"
          >
            {{ p.Color }}
          </p>
          <p
            class="text-xs w-full text-center pb-1 pointer-events-none"
            :style="{ color: p.SubColor }"
          >
            {{ p.SubColor }}
          </p>
        </div>
      </div>

      <p
        class="number text-xs mt-2 w-full text-center pointer-events-none"
        :class="{ active: preview && preview !== '#fff' }"
      >
        No. {{ p.Number }}
      </p>
    </div>
    <portal to="notification">
      <transition name="fade">
        <Notification v-if="open" :color="color" :msg="msg" />
      </transition>
    </portal>
    <portal to="backgroundColor">
      <div
        class="bg fixed inset-0 z-0 h-full w-full"
        :style="{
          backgroundColor: preview,
          opacity: preview === '#fff' ? '0' : '1'
        }"
      ></div>
    </portal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import pokemon from '~/localize/pokemon/ja.json'

declare module 'vue/types/vue' {
  interface Vue {
    $copyText(message: string): void
  }
}

type poekmon = {
  Number: string
  Name: string
  Color: string
  Region: string
}

type localData = {
  pokemon: poekmon[]
  preview: string
  open: boolean
  timer: any
  color: string
  msg: string
}

export default Vue.extend({
  data(): localData {
    return {
      pokemon,
      preview: '',
      open: false,
      timer: undefined,
      color: '',
      msg: 'コピーしました'
    }
  },
  mounted() {},
  methods: {
    colorPreview(color: string): void {
      this.preview = color
    },
    async onCopy(colorCode: string): Promise<void> {
      try {
        await this.$copyText(colorCode)
        this.color = colorCode

        await clearTimeout(this.timer)
        this.open = true
        this.timer = setTimeout(() => {
          this.open = false
        }, 3000)
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.items {
  flex-wrap: wrap;
  .item {
    .color {
      transition: all 0.2s ease-in;
      grid-template-rows: 7fr 3fr;
    }
    &:hover {
      .number {
        transition: all 0.2s ease-in;
        &.active {
          color: #fff;
        }
      }
      .color {
        height: 50%;
      }
    }
  }
}
.bg {
  transition: all 0.2s ease-in;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
