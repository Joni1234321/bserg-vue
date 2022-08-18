<template>
	<Spinner v-if="loading" loading/>
	<RouterView v-else-if="project"
	            :project="project"
	/>
	<p class="error" v-else>404: Project not found</p>
</template>

<script lang="ts" setup>
import {onMounted,ref} from "vue";
import type {Ref} from "vue";
import router from "@/index";
import backend from "@/backend";
import Spinner from "@/components/Spinner.vue";

const project : Ref<Project | undefined> = ref(undefined)
const loading : Ref<boolean> = ref(false)

onMounted(() => {
	loading.value = true
	backend.getProject(router.currentRoute.value.params.project_id as string).then(p => {
		project.value = p
		loading.value = false
	}).catch(e => {
		console.log("Failed getting project:");
		console.error(e)
		loading.value = false
	})
})

</script>

<style scoped>
.error {
	margin: 30px auto;
	text-align: center;
	font-size: 2em;
	background-color: darkred;
	opacity: .8;
	color: white;
	font-weight: bold;
	width: 10em;
	height: 5em;
}
</style>