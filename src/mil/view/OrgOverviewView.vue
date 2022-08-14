<template>
	<div class="main">
		<div class="mil-view">
			<MilObject
				v-for="org in orgs"
				:org="org"
				@click="router.push('/mil/i/' + org._id.$oid)"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import MilObject from "@/mil/components/MilObject.vue";
import backend from "@/backend";
import {onMounted, provide, ref} from "vue";
import type {Ref} from "vue";
import router from "@/index";


const orgs : Ref<any[]> = ref([])
const loading : Ref<boolean> = ref(false)
provide("loading-orgs", loading)
onMounted(() => loadOrgsObjects())

function loadOrgsObjects() {
	loading.value = true
	backend.getOrgs().then(r => {
		orgs.value = r
		loading.value = false
	})
}

</script>

<style scoped>

.mil-view>* {
	font-size: 1em;
	padding: 1em 2em;
	margin: 10px 0;
	cursor: pointer;
}
</style>