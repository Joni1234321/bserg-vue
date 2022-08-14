<template>
	<div class="mil-object">
		<h2>{{ org.country }}</h2>
		<h2>{{ org.year }}</h2>
		<h2>{{ org.name }}</h2>
	</div>
</template>

<script lang="ts" setup>

const props = defineProps<{
	org: object
}>()

</script>

<style scoped>
.mil-object {
	background-color: #ecf0f3;
	border-radius: 10px;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
}

</style>