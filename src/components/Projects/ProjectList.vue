<template>
	<div>
		<Spinner v-if="loading" loading/>
		<div v-else v-for="project in projects">
			<ProjectCard
			             :project="project"
			             @click="router.push('/projects/i/' + project._id.$oid)"
			             :reduced="reduced"
			/>
		</div>
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