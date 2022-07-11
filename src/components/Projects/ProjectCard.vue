<template>
	<div :class="['card',{'reduced': reduced}]">
		<p v-if="false" class="date"> {{ project.date }}</p>
		<h1 class="title">{{ project.title }}</h1>
		<p v-if="!reduced" class="description"> {{ project.description }}</p>
	</div>
</template>

<script lang="ts" setup>

defineProps<{
	project: Project,
	reduced?: boolean,
}>()

</script>

<style scoped>
.title {
	font-size: 1.5em;
	font-weight: bold;
	text-align: center;
	border-bottom: 7px solid hsl(100, 100%, 30%);
}

.card.reduced > .title {
	font-weight: normal;
	font-size: 1em;
	text-align: start;
	border-bottom-width: 3px;
}

.card {
	padding: 0 1em 1em 1em;
	border-radius: 4px;
	border: 3px solid black;
}

.card.reduced {
	border-radius: 2px;
	border-width: 1px;
	overflow: hidden;
}

.card:hover {
	cursor: pointer;
	box-shadow: 2px 2px hsla(0, 0%, 0%, 0.2);
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