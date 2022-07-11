<template>
	<AppTitle :sub-header="router.currentRoute.value.fullPath" header="404 - Page not found"/>
</template>

<script lang="ts" setup>
import AppTitle from "@/components/AppTitle.vue";
import router from "@/index";</script>

<style scoped>

</style>