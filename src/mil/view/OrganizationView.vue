<template>
	<div v-if="organization" class="organization-view">
		<OrgList :detailed="detailed" :organization="organization"/>
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

.organization-view {
	min-height: 100vh;
}

</style>