<template>
	<div class="main" v-if="org !== undefined">
		<!--<h2>{{org.name}}</h2>
		<h2>{{org.country}}</h2>
		<h2>{{org.year}}</h2>
		<h2>{{org.type}}</h2>-->
		<OrgList :orgs="children" class="org-list"/>
	</div>
</template>

<script lang="ts" setup>
import backend from "@/backend";
import {computed, onMounted, provide, ref} from "vue";
import type {Ref} from "vue";
import router from "@/index";
import OrgList from "@/mil/components/OrgList.vue";

const org : Ref<object | undefined> = ref(undefined)
const loading : Ref<boolean> = ref(false)
provide("loading-org", loading)
onMounted(() => loadOrgObject())

function loadOrgObject() {
	loading.value = true
	backend.getOrg(router.currentRoute.value.params.url as string).then(r => {
		org.value = r
		loading.value = false
	})
}

const children = computed(() =>
	org.value?.children.map((child: any) => Array(child.n ?? 1).fill(child)).flatMap((child: any) => child))


</script>

<style scoped>
.org-list {
}
</style>