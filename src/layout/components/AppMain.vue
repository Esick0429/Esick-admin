<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const key = computed(() => {
  return route.path;
});
console.log(key);
</script>
<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <Transition name="fade">
        <component :is="Component" :key="key" />
      </transition>
    </router-view>
  </section>
</template>
<style scoped lang="scss">
.app-main {
  min-height: calc(100vh - var(--v3-navigationbar-height));
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: var(--v3-body-bg-color);
}
</style>
