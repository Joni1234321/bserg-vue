<template>
	<div v-if="loading" class="v-spinner">
		<div class="v-clip" v-bind:style="spinnerStyle">
		</div>
	</div>
</template>

<script lang="ts" setup>
import {computed, defineProps, onMounted} from "vue";

const props = defineProps<{
	loading?: boolean,
	color?: string,
	size?: string,
	radius?: string,
}>()

const spinnerStyle = computed(() => ({
	height: props.size ?? "35px",
	width: props.size  ?? "35px",
	borderWidth: '4px',
	borderStyle: 'solid',
	borderColor: (props.color ?? "#5dc596") + ' ' + (props.color ?? "#5dc596") + ' transparent',
	borderRadius: props.radius ?? "100%",
	background: 'transparent'
}))
</script>

<style scoped>
.v-spinner
{
	text-align: center;
}
.v-spinner .v-clip
{
	animation: v-clipDelay 1.3s 0s infinite linear;
	animation-fill-mode: both;

	display: inline-block;
}

@keyframes v-clipDelay
{
	0%
	{
		transform: rotate(0deg);
	}
	50%
	{
		transform: rotate(180deg);
	}
	100%
	{
		transform: rotate(360deg);
	}
}
</style>
