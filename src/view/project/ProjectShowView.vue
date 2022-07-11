<template>
	<div class="show">
		<div>
			<AppTitle
				:header="project.title"
				:sub-header="project.description"
				class="app-title"
			/>
		</div>
		<div class="main">
			<div class="section" v-for="(section,i) in project.sections">
				<p class="section-title">{{ section.title }}</p>
				<div class="section-field" v-for="field in section.fields" :style="{borderLeftColor: getBorderColor(field.type)}">
					<p> {{ field.value }}</p>
				</div>
				<div class="section-field" v-if="edit">
					<input class="add-field" @keyup.esc="edit = false" @keyup.enter="submit(i)"/>
				</div>
				<button @click="edit = true"> + </button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import AppTitle from "@/components/AppTitle.vue";
import type {Ref} from "vue";
import {ref} from "vue";

defineProps<{
	project: Project,
}>()

const edit : Ref<boolean> = ref(false)

function submit (i : number) {

	console.log("submit");
}

function getBorderColor (fieldType: string) {
	if (fieldType === "text")
		return "red";
	return "white"
}

</script>

<style scoped>

.section-title {
	font-size: 2.5em;
	color: var(--color-text);
	text-align: center;
	font-weight: bold;
}
.section-field>* {
	width: 100%;

	background-color: black;
	color: white;
	padding: .1em .8em;
	font-size: 1.4em;

	border-left-style: solid;
	border-left-width: .8em;
	border-left-color: darkred;
}

.section>button {
	visibility: hidden;
	font-size: 1.3em;
	border-width: 1px;
	border-radius: 2px;
	width: 1.5em;
	height: 1.2em;
	padding: 0;
	top: -10px;
	left: calc(50%);
	transform: translate(-50%);
	cursor: pointer;
}
.section:hover>button {
	visibility: visible;
}


</style>