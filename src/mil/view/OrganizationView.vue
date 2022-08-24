<template>
	<div v-if="organization" class="organization-view" style="">
		<OrgList :detailed="detailed" :organization="organization" class="organization-list"/>
	</div>
</template>

<script lang="ts" setup>
import OrgList from "@/mil/components/OrgList.vue";
import {ref} from "vue";

defineProps<{
	organization: any | undefined,
	detailed: boolean
}>()

</script>

<style scoped>

input {
	width: 1em;
	height: 1em;
}

label {
	writing-mode: vertical-rl;
	text-align: center;
}


</style>