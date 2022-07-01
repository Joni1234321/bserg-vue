<template>
	<fieldset :disabled="disabled">
		<form @submit="emits('submit', project)" onsubmit="return false">
			<CoolInput :value="defaultProject?.title"
			           @input="(e) => project.title = e"
			           label="title" required/>
			<CoolInput :value="defaultProject?.description"
			           @input="(e) => project.description = e"
			           label="description" textarea/>
			<CoolInput :value="defaultProject?.url"
			           @input="(e) => project.url = e"
			           label="url name" pattern="^(\w|\d)*$"/>
			<CoolInput :value="defaultProject?.date"
			           @input="(e) => project.date = e"
			           label="date"/>

			<input style=""
			       type="submit" :value="submitText ?? 'submit'">
		</form>
	</fieldset>
</template>

<script lang="ts" setup>
import CoolInput from "@/components/CoolInput.vue";
import {ref} from "vue";

const props = defineProps<{
	defaultProject?: Project,
	disabled?: boolean,
	submitText?: string,
}>()
const emits = defineEmits<{
	(name: "submit", project: Project) : void
}>()

const project = ref({...props.defaultProject} as Project)

</script>

<style scoped>
form {
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 10px;
}

fieldset {
	border: none;
}


input[type=submit] {
	margin-top: 10px;
	font-size: 1.5em;
	color:white;
	background-color: #C70039;
	border: none;
	border-radius: 10px;
	width: 5em;
}
</style>