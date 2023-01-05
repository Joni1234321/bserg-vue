<template>
	<AppTitle header="Login [NOT IMPLEMENTED]"/>
	<LoginForm v-if="showForm" :disabled="fetching" @submit="p => submit(p)"/>
</template>

<script lang="ts" setup>

import AppTitle from "@/components/AppTitle.vue";
import LoginForm from "@/components/LoginForm.vue";
import {nextTick, ref} from "vue";
import backend from "@/backend";

defineProps<{
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

</style>