<script lang="ts" setup>
import { computed } from "vue"
import { useRouter } from "vue-router"
import { UserFilled } from "@element-plus/icons-vue"
import { removeLocalStorage,getLocalStorage } from "@/utils/localStorage"
// import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
// import Screenfull from "@/components/Screenfull/index.vue"
// import Notify from "@/components/Notify/index.vue"

const router = useRouter()
// const appStore = useAppStore()
// const settingsStore = useSettingsStore()
// const userStore = useUserStore()


const logout = () => {
  removeLocalStorage('token')
  router.push("/login")
}
</script>

<template>
  <div class="navigation-bar">
    <div class="title">Esick Admin</div>
    <div class="right-menu">
      <el-dropdown class="right-menu-item">
        <div class="right-menu-avatar">
          <el-avatar :icon="UserFilled" :size="30" />
          <span>{{ 123 }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item divided @click="logout">
              <span style="display: block">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navigation-bar {
  height: var(--v3-navigationbar-height);
  overflow: hidden;
  background-color: #242f42;
  display: flex;
  justify-content: space-between;
  color: #eee;
  .title{
    line-height: var(--v3-navigationbar-height);
    font-size: 32px;
    width: 220px;
    text-align: center;
  }
  .right-menu {
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #606266;

    .right-menu-item {
      padding: 0 10px;
      cursor: pointer;
      color: #f0f8ff;
      .right-menu-avatar {
        display: flex;
        align-items: center;

        .el-avatar {
          margin-right: 10px;
        }

        span {
          font-size: 16px;
        }
      }
    }
  }
}</style>
