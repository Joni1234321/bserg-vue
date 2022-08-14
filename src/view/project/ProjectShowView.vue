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
			<div class="section" v-for="(section,i) in project.details.sections">
				<p class="section-title">{{ section.title }}</p>
				<div class="section-field" v-for="(field, fieldIndex) in section.fields" :style="{borderLeftColor: getBorderColor(field.type)}">
          <button class="remove-button" @click="removeField(i, fieldIndex)"> x </button>
					<p> {{ field.value }}</p>
				</div>
				<div class="section-field" v-if="edit[i]">
					<input class="add-field" @keyup.esc="edit[i] = false"  v-model="editFields[i]" @keyup.enter="submit(i)"/>
				</div>
        <button class="add-button" @click="edit[i] = true"> + </button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import AppTitle from "@/components/AppTitle.vue";
import {computed, ref, watchEffect} from "vue";
import backend from "@/backend";

const props = defineProps<{
	project: Project,
}>()

const edit = ref([] as boolean[])
const editFields  = ref([] as string[])

const nSections = computed(() => props.project.details?.sections?.length ?? 0)

watchEffect(() => {
  edit.value = new Array(nSections.value).fill(false)
  editFields.value = new Array(nSections.value).fill("")
})

function submit (sectionIndex : number) {
  const section : Section | undefined = props.project.details?.sections?.[sectionIndex]
  // If undefined should not happen
  if (props.project.details?.sections?.[sectionIndex] === undefined) {
    console.error("Editing in a section that doesn't exists, THIS SHOULD NOT HAPPEN")
    return
  }

  // Create the section and send request to server
  section?.fields.push({type: "text", value: editFields.value?.[sectionIndex]})

  backend.createSection(props.project._id?.$oid ?? "", sectionIndex, section as Section)
      .then(r => console.log(r))

  editFields.value[sectionIndex] = ""
}

function removeField(sectionIndex : number, fieldIndex : number) {

}


function getBorderColor (fieldType: string) {
	if (fieldType === "text")
		return "red";
	return "white"
}

</script>

<style scoped>

.section {
  padding-bottom: 1em;
}
.section-title {
	font-size: 2.5em;
	color: var(--color-text);
	text-align: center;
	font-weight: bold;
}
.section-field>p, .section-field>input{
  width: 100%;
	background-color: black;
	color: white;
	padding: .1em .8em;
	font-size: 1.4em;

	border-left-style: solid;
	border-left-width: .8em;
	border-left-color: darkred;
}
.section button {
  visibility: hidden;
  position: absolute;
  display: inline;

  font-size: 1.3em;
  border-width: 1px;
  border-radius: 2px;
  width: 1.5em;
  height: 1.2em;
  padding: 0;
  cursor: pointer;
  transform: translate(-50%);
}
.section:hover>.add-button, .section-field:hover>.remove-button {
  visibility: visible;
}

.section>.add-button {
  bottom: .25em;
	left: calc(50%);
}
.section-field>.remove-button {
  z-index: 1;
  top: 25%;
  right: -1.5em;
}


</style>