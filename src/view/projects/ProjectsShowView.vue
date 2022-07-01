<template>
	<div>
		<category title="Ongoing">
			<ProjectList class="projects" :projects="projects"/>
		</category>
		<category title="Finished">

		</category>
		<category title="Archived">
			<div class="projects">
			</div>
		</category>
	</div>
</template>

<script lang="ts" setup>
import Category from "@/components/Category.vue";
import ProjectList from "@/components/Projects/ProjectList.vue";

defineProps<{
	projects: Project[],
}>()
</script>

<style scoped>

.projects {
	display: grid;
	justify-content: space-around;
	grid-template-columns: repeat(auto-fit, 300px);
	gap: 30px;
}
</style>