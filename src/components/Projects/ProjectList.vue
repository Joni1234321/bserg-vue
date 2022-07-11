<template>
	<div>
		<Spinner v-if="loading" loading/>
		<ProjectCard v-for="project in projects" v-else
		             :project="project"
		             :reduced="reduced"
		             @click="router.push('/projects/i/' + project._id.$oid)"
		/>
	</div>
</template>

<script lang="ts" setup>

import ProjectCard from "@/components/Projects/ProjectCard.vue";
import router from "@/index";
import Spinner from "@/components/Spinner.vue";
import {inject} from "vue";

const loading = inject("loading-projects", false)
defineProps<{
	projects: Project[],
	reduced?: boolean,
}>()

</script>

<style scoped>

</style>