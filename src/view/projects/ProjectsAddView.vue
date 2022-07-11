<template>
	<div class="view">
		<div>
			<h1> Form </h1>
			<p class="error">{{ error }}</p>
			<ProjectForm v-if="showForm" :disabled="fetching" @submit="p => submit(p)"/>
		</div>
		<div>
			<h1> Projects </h1>
			<ProjectList :loading="loading"
			             :projects="projects"
			             class="projects"
			             reduced/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import ProjectForm from "@/components/Projects/ProjectForm.vue";
import ProjectList from "@/components/Projects/ProjectList.vue";
import backend from "@/backend";
import {nextTick, ref} from "vue";

defineProps<{
	projects: Project[],
	loading?: boolean,
}>()

const emits = defineEmits<{
	(name: "refresh"): void,
}>()

const showForm = ref(true)
const fetching = ref(false)
const error = ref("")

function submit(project: Project) {
	fetching.value = true
	// TODO: IMPLEMENT SUCCESS AND FAILURE FEEDBACK
	backend.createProject(project).then(async r => {
		emits("refresh")
		showForm.value = false
		await nextTick()
		showForm.value = true
		fetching.value = false
	})
	.catch(e => {
		fetching.value = false
		error.value = e;
	})
}

</script>

<style scoped>

h1 {
	text-align: center;
}

.view {
	display: grid;
	grid-template-columns: minmax(400px, 1fr) 200px;
}

.projects {
	border-left: 2px solid black;
	display: grid;
	gap: 10px;
	padding: 0 10px;
}

.error {
	font-size: 1.5em;

	background-color: red;
}
</style>