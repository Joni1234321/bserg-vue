<template>
	<div class="view">
		<div>
			<h1> Form </h1>
			<ProjectForm @refresh="emits('refresh')"/>
		</div>
		<div>
			<h1> Projects </h1>
			<ProjectList class="projects" :projects="projects" :loading="loading"
			             reduced/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import ProjectForm from "@/components/Projects/ProjectForm.vue";
import ProjectList from "@/components/Projects/ProjectList.vue";

defineProps<{
	projects: Project[],
	loading?: boolean,
}>()

const emits = defineEmits<{
	(name: "refresh") : void,
}> ()
</script>

<style scoped>

h1 {
	text-align: center;
}
.view {
	display:grid;
	grid-template-columns: minmax(400px, 1fr) 200px;
}
.projects {
	border-left: 2px solid black;
	display: grid;
	gap: 10px;
	padding: 0 10px;
}
</style>