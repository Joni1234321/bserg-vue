<template>
	<AppTitle header="PROJECTS"/>
	<RouterView
		:projects="projects"
		@refresh="loadProjects()"
	/>
</template>

<script lang="ts" setup>
import AppTitle from "@/components/AppTitle.vue";
import type {Ref} from "vue"
import {onMounted, provide, ref} from "vue";
import backend from "@/backend";

const projects: Ref<Project[]> = ref([])
const loading: Ref<boolean> = ref(false)
provide("loading-projects", loading)
onMounted(() => loadProjects())

function loadProjects() {
	loading.value = true
	backend.getProjects().then(r => {
		projects.value = r
		loading.value = false
	})
}

</script>

<style scoped>

</style>