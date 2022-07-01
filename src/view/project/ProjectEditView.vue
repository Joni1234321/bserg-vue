<template>
	<div style="display: flex; align-items: center; flex-direction: column;">
		<h1> Edit - {{ project.title }} </h1>
		<ProjectForm :default-project="project"
		             @submit="p => update(p)"
		             submit-text="update"
		             :disabled="fetching"
		/>
	</div>
</template>

<script lang="ts" setup>

import ProjectForm from "@/components/Projects/ProjectForm.vue";
import backend from "@/backend";
import {ref} from "vue";
import router from "@/index";


defineProps<{
	project: Project
}>()

const fetching = ref(false)
function update (project: Project) {
	fetching.value = true
	backend.updateProject(project).then(r => {
		console.log(r)
		fetching.value = false
		// Go back to project page
		router.push({name: "project.show", params: {url: project._id?.$oid }})
	} )
}
</script>

<style scoped>

</style>