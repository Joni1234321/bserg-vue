<template>
	<div>
		<label> {{ label }} </label>
		<component :is="textarea ? 'textarea' : 'input'"
		           class="input"
		           :value="value"
		           :pattern="pattern"
		           :required="required"
		           @input="handleInput"
		           autocomplete="off"></component>
		<span> {{ error }} </span>
	</div>
</template>

<script lang="ts" setup>

const emits = defineEmits<{
	(name: "input", e : any) : void
}>()
defineProps<{
	label : string,
	value?: string,
	pattern? : string,
	error? : string,
	textarea?: boolean,
	required?: boolean,
}>()
const handleInput = (e : any) => emits("input", e.target.value)
</script>

<style scoped>
div {
	font-size:1.2em;
	width: 20em;
}
input, label {
	text-align: center;
}
input {
	font-size: inherit;
}
textarea {
	resize: vertical;
	font-size: .7em;
	height: 6em;
}

.input {
	font-family: inherit;
	padding: .3em .6em;
	width: 100%;
	border-radius: 3px;
}

label {
	font-style: italic;
	font-size: .9em;
	display: block;
}
span {
	position: absolute;
	bottom: -1.4em;
	left:1em;
	color: red;
	font-size: 0.7em;
}
</style>