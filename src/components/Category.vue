<template>
	<div :class="['category', {'has-url': urlName}]"
	     @click="$router.push({name: urlName})">
		<div class="title">
			<p>{{ title }}</p>
		</div>
		<div class="main">
			<slot/>
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
.category {
	padding-bottom: 2em;
	border-width: 2px;
	border-style: solid hidden;
	border-color: transparent;
}

.category:nth-child(even) {
	background-color: #FFF;
}

.category:nth-child(odd) {
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
	top: -1em;
	border-radius: 3px;
	color: black;
	background-color: #FFBA08;

	display: inline-block;

	font-weight: bold;

	padding: 0.05em .7em;

}

.main {
	top: -1.5em;
}
</style>