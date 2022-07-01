<template>
	<AppTitle :header="project.title ?? ''" :sub-header="project.description"/>
</template>

<script lang="ts" setup>
import AppTitle from "@/components/AppTitle.vue";

defineProps<{
	project: Project,
}>()

</script>

<style scoped>

</style>