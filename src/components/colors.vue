<template>
  <div class="items flex gap-4 mt-12 content-center justify-center">
    <div
      v-for="p in pokemon"
      :key="p.Number"
      class="item inline-block w-32 mx-auto"
    >
      <div
        class="container relative h-32 w-full rounded-md overflow-hidden bg-white shadow-md hover:shadow-lg"
      >
        <div
          class="color relative z-10 grid h-full w-full rounded"
          @mouseover.self="colorPreview(p.Color)"
          @mouseleave="colorPreview('#fff')"
          @click.self="onCopy(p.Color)"
        >
          <span
            class="inline-block w-full cursor-pointer"
            :style="{ backgroundColor: p.Color }"
            @mouseover.self="colorPreview(p.Color)"
            @click="onCopy(p.Color)"
          />
          <span
            class="inline-block w-full cursor-pointer"
            :style="{ backgroundColor: p.SubColor }"
            @mouseover.self="colorPreview(p.SubColor)"
            @click="onCopy(p.SubColor)"
          />
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
    <transition name="fade">
      <Notification
        v-if="open"
        :color="color"
        :msg="msg"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import pokemon from '../localize/pokemon/ja.json'
import Notification from './notification.vue'
import { copyText } from '../utils/clipboard'

const emit = defineEmits<{ preview: [color: string] }>()
const preview = ref('#fff')
const open = ref(false)
const color = ref('')
const msg = 'コピーしました'
let timer: ReturnType<typeof setTimeout> | undefined

function colorPreview(value: string): void {
  preview.value = value
  emit('preview', value)
}

async function onCopy(colorCode: string): Promise<void> {
  try {
    await copyText(colorCode)
    color.value = colorCode
    clearTimeout(timer)
    open.value = true
    timer = setTimeout(() => { open.value = false }, 3000)
  } catch (error) {
    console.error(error)
  }
}

onBeforeUnmount(() => {
  clearTimeout(timer)
  colorPreview('#fff')
})
</script>

<style lang="scss" scoped>
.items {
  flex-wrap: wrap;
  .item {
    .container {
      .color {
        grid-template-rows: 7fr 3fr;
        transition: all 0.2s ease-in;
      }
      &:hover {
        transition: box-shadow 0.2s ease-in;

        .color {
          height: 50%;
        }
      }
    }
    &:hover {
      .number {
        transition: all 0.2s ease-in;
        &.active {
          color: #fff;
        }
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0.1s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
