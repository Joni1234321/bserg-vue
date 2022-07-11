<template>
	<div class="app-title">
		<p class="header">{{ header }}</p>
		<p class="sub-header"> {{ subHeader }}</p>
	</div>
</template>

<script lang="ts" setup>
defineProps<{
	header: string,
	subHeader?: string,
}>()


/*
* 		<TextEdit v-for="[cls, txt] in [['header', header],['sub-header', subHeader]]"
		          :class="cls"
		          :text="txt"
		          :edit="edit"
		          @submit="emits('submit')"
		          @cancel="emits('cancel')"
		/>
		*
const emits = defineEmits<{
	(name: "submit"): void,
	(name: "cancel"): void,
}>()
* 	edit?: boolean,

		* */
</script>

<style scoped>
.app-title {
	padding-left: 5em;
	font-size: 1em;
	margin-bottom: 3em;
}

.app-title > .header {
	font-weight: bold;
	font-size: 6em;
}

.app-title > .sub-header {
	display: inline;
	font-style: italic;
	position: relative;
	top: -1.5em;
	left: 6em;
	width: 70em;
}
</style>