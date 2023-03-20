<script setup lang="ts">
import { formatDateTime } from '@/utils'
import { getBlogDataApi, updatBlogDataApi, deletBlogDataApi, creatBlogDataApi } from '@/api/table'
import { getTagListApi, creatTagApi, deletTagApi } from '@/api/table/tag'
import { onMounted, reactive, Ref, ref } from 'vue';
import { type GetBlogData } from "@/api/table/types/blog"
import { ElMessage, ElMessageBox } from 'element-plus'
const tableData: Ref<GetBlogData[]> = ref([])
const tagList: any = ref([])
let formData = reactive({
    archiveTitle: '',
    tagId: '',
    archiveContent: '',
    date: 0, archiveId: '', updateTime: 0, tagName: ''
})
let title = ref<string>('')
let dialogVisible = ref<boolean>(false)
async function getTagList() {
    let result: any = await getTagListApi()
    tagList.value = result.data
    console.log(tagList.value);

}
async function getBlogData() {
    try {
        let blogDataList = await getBlogDataApi({
            currentPage: 1,
            pageSize: 10,
            startTime: 0,
            endTime: 0
        })
        tableData.value = blogDataList.data.list
    }
    catch (err) {
        console.log(err)
    }
}
onMounted(async () => {
    await getBlogData()
    await getTagList()
})
const formatDate = function (row: GetBlogData, column: number) {
    var date = row[column.property]
    if (date == undefined) {
        return ''
    }
    if (date == 0) {
        return ''
    }
    return formatDateTime(date)
}
const handleEdit = function (row: GetBlogData) {
    console.log(row)
    dialogVisible.value = true
    title.value = '编辑文章'
    let rowData = Object.assign({}, row)
    formData = rowData
}
const handleDelete = function (row: GetBlogData) {
    console.log(row)
    // 设置类似于console类型的功能
    ElMessageBox.confirm('是否删除该条文章？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    })
        .then(async () => {
            // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
            let res = await deletBlogDataApi({ archiveId: row.archiveId })
            if (res) {
                if (res.data.status === 200) {
                    ElMessage({
                        type: 'success',
                        message: '删除成功!'
                    })
                } else if (res.data.status === 403) {
                    ElMessage.error('删除失败，权限不足')
                }
                await getBlogData()
            }
        })
        .catch((err) => {
            console.log(err)
            ElMessage({
                type: 'info',
                message: '已取消删除'
            })
        })
}
async function onSubmit() {
    if (title.value === '新增文章') {
        let data = await creatBlogDataApi(formData)
    }
    if (title.value === '编辑文章') {
        let data = await updatBlogDataApi(formData)
    }
    getBlogData()
}
const closeDialog = function () {
    formData = {
        archiveTitle: '',
        tagId: '',
        archiveContent: '',
        date: 0, archiveId: '', updateTime: 0, tagName: ''
    }
    dialogVisible.value = false
    // getAllArchive()
}
const changeEditor = function (e: any) {
    formData.archiveContent = e
}
</script>
<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="创建时间" width="150" :formatter="formatDate"></el-table-column>
            <el-table-column prop="archiveTitle" label="标题" width="200"></el-table-column>
            <el-table-column prop="tagName" label="标签名" width="150"></el-table-column>
            <el-table-column prop="archiveContent" label="内容" min-width="300">
                <template #default="scope">
                    <div v-html="scope.row.archiveContent" class="table-column-content"></div>
                </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="最后编辑时间" :formatter="formatDate"></el-table-column>
            <el-table-column label="操作" fixed="right">
                <template #default="scope">
                    <!-- 点击编辑进入编辑页面进行编辑表格数据 -->
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <!-- 点击编辑进入编辑页面进行编辑表格数据 -->
                    <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="arhive_dialog">
        <el-dialog v-model="dialogVisible" :title="title" width="30%" :before-close="closeDialog"
            :close-on-click-modal="false">
            <el-form ref="form" :model="formData" label-width="80px">
                <el-form-item label="文章名称">
                    <el-input v-model="formData.archiveTitle"></el-input>
                </el-form-item>
                <el-form-item label="文章类型">
                    <el-select v-model="formData.tagId" placeholder="Select" size="large">
                        <el-option v-for="item in tagList" :key="item.tagId" :label="item.tagName" :value="item.tagId" />
                    </el-select>
                </el-form-item>
                <el-form-item label="文章内容">
                    <!-- <newEditor v-model="formData.archiveContent" @change="changeEditor" /> -->
                    <div v-html="formData.archiveContent"></div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit()">立即创建</el-button>
                    <el-button @click="closeDialog">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<style scoped lang="scss">
.table-column-content {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical
}
</style>