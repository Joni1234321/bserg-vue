<template>
	<div class="project-adder">
		<form v-if="showForm" @submit="submit()" onsubmit="return false">
			<CoolInput @input="(e) => project.title = e"
			           label="title" required/>
			<CoolInput @input="(e) => project.description = e"
			           label="description" textarea/>
			<CoolInput @input="(e) => project.url = e"
			           label="url name" pattern="^(\w|\d)*$"/>
			<CoolInput @input="(e) => project.date = e"
			           label="date"/>

			<br><br>
			<input style="width: 10em;" type="submit" value="submit">
			<h2>{{ created_title }} - {{ response_date }} - {{ response }}</h2>
		</form>
	</div>
</template>

<script lang="ts" setup>
import CoolInput from "@/components/CoolInput.vue";
import {nextTick, ref} from "vue";
import backend from "@/backend";

const project = ref({} as Project)

// Feedback
const response = ref("")
const response_date = ref("")
const created_title = ref("")
const showForm = ref(true)

const emits = defineEmits<{
	(name: "refresh") : void
}>()

function submit () {
	// TODO: IMPLEMENT SUCCESS AND FAILURE FEEDBACK
	backend.createProject(project.value).then(async r => {
		response.value = r
		response_date.value = new Date().toLocaleTimeString()
		created_title.value = project.value.title
		emits("refresh")
		showForm.value = false
		await nextTick()
		showForm.value = true
	})
}

</script>

<style scoped>
.project-adder {
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 10px;
}


</style>