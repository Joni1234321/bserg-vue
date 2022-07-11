<template>
	<component :is="textComponent"
	           :value="text"
	           @keyup.enter="emits('submit')"
	           @keyup.esc="emits('cancel')"
	>{{ text }}</component>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";

const props = defineProps<{
	text?: string,
	edit?: boolean,
}>()

const emits = defineEmits<{
	(name: "submit"): void,
	(name: "cancel"): void,
}>()

const textComponent = computed(() => props.edit ? "input" : "p")

</script>

<style scoped>

</style>