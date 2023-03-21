<template>
  <div class="_tag">
    <el-scrollbar style="margin-right: 6px">
      <div class="left">
        <el-tag v-for="tag in tagsList" :key="tag.title" :closable="!tag.hideclose" :type="isActive(tag)"
          @close="handleCloseTag(tag)">
          <router-link :to="tag.path" class="tag-title">{{ tag.title }}</router-link>
        </el-tag>
      </div>
    </el-scrollbar>

    <el-dropdown @command="handleCloseBtn" class="_dropdown">
      <el-button type="primary" size="small">
        标签选项
        <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="closeOther">
            <span style="display: block">关闭其它</span>
          </el-dropdown-item>
          <el-dropdown-item command="closeAll">
            <span style="display: block">关闭所有</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<style lang="scss">
._tag {
  // border: 1px solid green;
  flex: 0 0 40px;
  display: flex;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid #e6e6e6;
  justify-content: space-between;
  margin-bottom: 10px;

  .left {
    display: flex;
    height: 40px;
    align-items: center;

    .el-tag {
      margin-left: 6px;

      .tag-title {
        color: black;
        padding: 8px 2px;
        text-decoration: none;
      }
    }
  }

  ._dropdown {
    height: 40px;
    display: flex;
    align-items: center;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.1) -3px 0px 15px 3px;
    padding: 0 5px;
  }
}
</style>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
let tagsList: any = ref([])
const route = useRoute()
const router = useRouter()

onMounted(() => {
  setTags(route)
  console.log('route:', route)
})

const setTags = function (route: RouteLocationNormalizedLoaded) {
  const isExsit = tagsList.value.some((item: { path: any; }) => {
    return item.path === route.fullPath
  })
  if (isExsit == false) {
    tagsList.value.push({
      title: route.meta.title, //标签名
      name: route.name, //路由里的name对应vue页的name,标签列表里的name可以做vue页面缓存
      path: route.fullPath, //路由
      hideclose: route.meta.hideclose ? route.meta.hideclose : false //是否隐藏关闭
    })
  }
}
//关闭标签
const handleCloseTag = function (tag: any) {
  tagsList.value.splice(tagsList.value.indexOf(tag), 1)
  // array.splice(index,howmany) 从索引为index处删除howmany个元素
  if (tagsList.value.length > 0) {
    router.push(tagsList.value[tagsList.value.length - 1].path)
  } else {
    // router.push("/index");
    router.push('/')
  }
}
//关闭功能按钮
const handleCloseBtn = function (command: string) {
  if (command == 'closeOther') {
    //关闭其它,保留没有删除的标签。find() 方法返回通过测试（函数内判断）的数组的第一个元素的值。
    const activeTag = tagsList.value.find((item: { path: string; }) => {
      return item.path == route.fullPath
    }) //查找第一个满足的
    let noCloseTags = getNoCloseTabs()
    if (
      noCloseTags.some((item: { path: any; title: any; }) => {
        return item.path == activeTag.path && item.title == activeTag.title
      }) == false
    ) {
      //不包含
      noCloseTags = noCloseTags.concat(activeTag)
    }
    tagsList.value = noCloseTags
  } else if (command == 'closeAll') {
    //关闭所有,保留没有删除的标签
    tagsList.value = getNoCloseTabs()
    router.push(tagsList.value[tagsList.value.length - 1].path)
  }
}
const getNoCloseTabs = function () {
  //获取没有删除的标签
  var noCloseList = tagsList.value.filter((item: { hideclose: boolean; }) => {
    return item.hideclose == true
  })
  return noCloseList
}
//是否选中
const isActive = function (tag: { path: string; }) {
  if (tag.path == route.fullPath) {
    return ''
  } else {
    return 'info'
  }
}
watch(
  route,
  (newValue, oldValue) => {
    setTags(newValue)
  },
  {
    deep: true
  }
)

</script>
