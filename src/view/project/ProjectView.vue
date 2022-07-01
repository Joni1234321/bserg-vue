<template>
	<Spinner v-if="loading" loading/>
	<RouterView v-else
		:project="project"
	/>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
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