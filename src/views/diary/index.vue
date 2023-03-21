<template>
    <div @click="gotoBlog">456</div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
function gotoBlog() {
    router.push('/blog')
}

</script>