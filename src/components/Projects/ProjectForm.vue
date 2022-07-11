<template>
	<fieldset :disabled="disabled">
		<form onsubmit="return false" @submit="emits('submit', project)">
			<CoolInput :value="defaultProject?.title"
			           label="title"
			           required @input="(e) => project.title = e"/>
			<CoolInput :value="defaultProject?.description"
			           label="description"
			           textarea @input="(e) => project.description = e"/>
			<CoolInput :value="defaultProject?.url"
			           label="url name"
			           pattern="^(\w|\d)*$" @input="(e) => project.url = e"/>
			<CoolInput :value="defaultProject?.date"
			           label="date"
			           @input="(e) => project.date = e"/>

			<input :value="submitText ?? 'submit'"
			       style="" type="submit">
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
	(name: "submit", project: Project): void
}>()

const project = ref({...props.defaultProject} as Project)
project.value.schema_version = 1

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
	color: white;
	background-color: #C70039;
	border: none;
	border-radius: 10px;
	width: 5em;
}
</style>