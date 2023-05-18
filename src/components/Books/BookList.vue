<template>
	<div>
		<Spinner v-if="loading" loading/>
		<ProjectCard v-for="project in projects" v-else
		             :project="project"
		             @click="router.push('/projects/' + (project._id?.$oid ?? '404'))"
		/>
	</div></template>

<script lang="ts" setup>

import ProjectCard from "@/components/Projects/ProjectCard.vue";
import router from "@/index";
import Spinner from "@/components/Spinner.vue";
import {inject} from "vue";

const loading = inject("loading-books", false)
defineProps<{
	books: Book[],
}>()

</script>

<style scoped>

</style>