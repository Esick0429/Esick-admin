<script setup lang="ts">
import { AppMain, Sidebar, NavigationBar, TagsView } from "./components"
</script>
<template>
  <div class="app-wrapper flex-column">
    <div>
      <NavigationBar />
    </div>
    <div class="down-container">
      <div>
        <Sidebar class="sidebar-container" />
        <TagsView />
      </div>
      <AppMain />
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "@/styles/mixins.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100%;
  display: flex;
}

.sidebar-container {
  transition: width 0.28s;
  width: var(--v3-sidebar-width) !important;
  height: 100%;
  // position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.down-container {
  display: flex
}
</style>