<template>
	<fieldset :disabled="disabled">
		<form onsubmit="return false" @submit="emits('submit', username, password)">
			<CoolInput label="username"
			           required @input="(e) => username = e"/>
			<CoolInput label="password"
			           type="password"
			           required @input="(e) => password = e"/>

			<input :value="submitText ?? 'submit'"
			       style="" type="submit">
		</form>
	</fieldset>
</template>

<script lang="ts" setup>

import CoolInput from "@/components/CoolInput.vue";
import {ref} from "vue";

const props = defineProps<{
	disabled?: boolean,
	submitText?: string,
}>()
const emits = defineEmits<{
	(name: "submit", username: String, password: String): void
}>()

const username = ref("");
const password = ref("");

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