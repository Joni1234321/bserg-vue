<template>
	<div>
		<div class="buttons">
			<button :disabled="elementsToBeDeleted.length === 0" class="delete" type="button" @click="deleteProjects()">
				DELETE {{ elementsToBeDeleted.length }}
			</button>
		</div>
		<div class="projects main">
			<Spinner v-if="loading" loading/>
			<div v-for="(project,i) in projects" v-else>
				<ProjectCard
					:class="{'selected': checkboxes[i]}"
					:project="project"
					reduced
					@click="checkboxes[i] = !checkboxes[i]"
				/>
				<input v-model="checkboxes[i]" class="select" type="checkbox"/>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import ProjectCard from "@/components/Projects/ProjectCard.vue";
import {computed, defineEmits, inject, ref, watchEffect} from "vue";
import backend from "@/backend";
import Spinner from "@/components/Spinner.vue";

const props = defineProps<{
	projects: Project[],
}>()
const emits = defineEmits<{
	(name: "refresh"): void,
}>();

const loading = inject("loading-projects", false)

const checkboxes = ref([] as boolean[])

watchEffect(() => {
	checkboxes.value = new Array(props.projects.length).fill(false)
})

const elementsToBeDeleted = computed(() => {
	const re: number[] = []
	checkboxes.value.forEach((b, i) => {
		if (b) re.push(i)
	})
	return re
})

function deleteProjects() {
	elementsToBeDeleted.value.forEach((el, i, a) => {
		const project: Project = props.projects[el]
		if (!confirm("YOU SURE YOU WANT TO DELETE\n" + project.title))
			return

		if (!project._id?.$oid)
			alert("PROJECT DOES NOT HAVE ID, WHICH SHOULD BE IMPOSSIBLE\n" + project.title)
		else
			backend.deleteProject(project._id.$oid).then(r => {
				emits('refresh')
			})
	})

}

</script>

<style scoped>
.projects {
	display: grid;
	grid-template-columns: repeat(auto-fit, 200px);
	margin: auto;
	justify-content: center;
	gap: 30px;
}

.select {
	position: absolute;
	top: -5px;
	right: -5px;
}

.selected {
	opacity: 0.6;
	background-color: black;
	color: white;
}

.buttons {
	display: grid;
	justify-content: center;
	margin-bottom: 30px;
}

.delete {
	width: 10em;
	height: 3em;
	color: white;
	font-weight: bold;
	background-color: #C70039;
	border: none;
	border-radius: 4px;
}

.delete:hover:not(:disabled) {
	box-shadow: 2px 2px grey;
	cursor: pointer;
}

.delete:disabled {
	background-color: grey;
}

</style>