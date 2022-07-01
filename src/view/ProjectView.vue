<template>
	<Spinner :loading="loading"/>
	<AppTitle :header="project.title ?? ''"/>
	<h2> {{ project.description }}</h2>
</template>

<script lang="ts" setup>
import AppTitle from "@/components/AppTitle.vue";
import {computed, onMounted, ref} from "vue";
import router from "@/index";
import backend from "@/backend";
import Spinner from "@/components/Spinner.vue";

const project = ref({})
const loading = ref(false)

onMounted(() => {
	loading.value = true
	backend.getProject(router.currentRoute.value.params.url as string).then(p => {
		project.value = p
		loading.value = false
	})
})

</script>

<style scoped>

</style>