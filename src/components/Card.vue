<template>
	<div class="card">
		<p v-if="false" class="date"> {{ date }}</p>
		<h1 class="title">{{ title }}</h1>
		<p class="description"> {{ description }}</p>
	</div>
</template>

<script lang="ts" setup>

defineProps<{
	title: string,
	description?: string,
	date?: string,
}>()

</script>

<style scoped>
.title {
	font-size: 1.5em;
	font-weight: bold;
	color: black;
	text-align: center;
	border-bottom: 7px solid hsl(100, 100%, 30%);
}

.card {
	padding: 0 1em 1em 1em;
	border-radius: 4px;
	border: 3px solid black;
}

.card:hover {
	cursor: pointer;
	box-shadow: 2px 2px hsla(0,0%,0%,0.2);
}

.date {
	font-size: .8em;
	font-style: italic;
	position: absolute;

	opacity: .3;
	bottom: 0;
	right: 10px;
}
</style>