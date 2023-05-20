<template>
	<div :class="['big-link', {'has-url': urlName}]"
	     @click="$router.push({name: urlName})">
		<div class="title">
			<p>{{ title }}</p>
		</div>
	</div>
</template>

<script lang="ts" setup>

import {defineProps} from "vue";

defineProps<{
	title: string,
	urlName?: string,
}>()

</script>

<style scoped>

.big-link {
	padding: 2em 2em;
	border-width: 2px;
	border-style: solid hidden;
	border-color: transparent;
}

.big-link:nth-child(even) {
	background-color: #FFF;
}

.big-link:nth-child(odd) {
	background-color: #EEE;
}

.has-url:hover {
	cursor: pointer;
	border-color: black;
}

.title {
	position: relative;
	text-align: center;
	color: black;
	font-size: 2.5em;
}

.title > p {
	border-radius: 3px;
	color: black;
	background-color: #FFBA08;

	display: inline-block;

	font-weight: bold;

	padding: 0.05em .7em;

}

</style>