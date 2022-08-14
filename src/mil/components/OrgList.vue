<template>
	<div class="org-view">
		<div v-for="org in orgs">
			<svg width="100px" height="100px">
				<OrgIcon
					:type-tags="getTypeTags(org.type)"
					:size-string="getSizeString(org.size)"/>
			</svg>
			<div v-if="org.children" v-for="child in getChildren(org)" class="org-view-children">
				<svg width="100%" height="100%">
					<OrgIcon :type-tags="getTypeTags(child.type)" :size-string="getSizeString(child.size)"/>
				</svg>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import OrgIcon from "@/mil/components/OrgIcon.vue";

import {computed, defineProps, onMounted} from "vue";


const props = defineProps<{
	orgs: any[]
}>()

function getTypeTags (typeString: string) {
	const ar =  typeString.split(" ")
	const word = "gun"
	while (ar.indexOf(word) !== -1) {
		const idx = ar.indexOf(word)
		ar[idx - 1] += " " + ar[idx]
		ar.splice(idx, 1)
	}
	return ar
}

function getChildren (org: any) {
	return org?.children
		.map((child: any) => Array(child.n ?? 1).fill(child))
		.flatMap((child: any) => child)
		.sort((a: any, b: any) => sizeDict[b.size.toLowerCase()] - sizeDict[a.size.toLowerCase()]) ?? []
}

// Calculate sizes once, then its faster
const sizesNames = ['undefined', 'team', 'squad', 'platoon', 'column', 'company', 'battalion', 'regiment', 'brigade', 'division', 'corps', 'army', 'army group']
const sizeDict :  {[key: string]: number} = {"battery": 5}
for (let i = 0; i < sizesNames.length; i++)
	sizeDict[sizesNames[i]] = i

const sizeTable = ["ø","o", "oo", "ooo", "oooo", "l", "ll", "lll", "x", "xx", "xxx", "xxxx", "xxxxx"]

const getSizeString = (size: string) : string  =>  sizeTable[sizeDict[size.toLowerCase()] ?? 0]

</script>

<style scoped>

.org-view {
	display: flex;
	overflow: auto;
	gap: 10px;
}
.org-view-children {
	height: 50px;
}
</style>