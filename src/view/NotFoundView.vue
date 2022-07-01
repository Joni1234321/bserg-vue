<template>
	<AppTitle header="404 - Page not found" :sub-header="router.currentRoute.value.fullPath"/>
</template>

<script lang="ts" setup>
import AppTitle from "@/components/AppTitle.vue";
import router from "@/index";
</script>

<style scoped>

</style>