<template>
	<div class="org-view">
		<div ref="tabs" class="view-selector">
			<a v-for="(name, i) in ['table', 'equipment', 'companies']" @click="onTabClick(i)">{{name}}</a>
		</div>
		<div v-if="activeChild === 0" class="organization-view">
			<OrgList :detailed="detailed" :organization="organization"/>
		</div>
		<div v-if="activeChild === 1">
			<table>
				<tr>
					<th>name</th>
					<th>n</th>
				</tr>
				<tr v-for="([name, n], i) in ([['men',sumCurrent.men]]).concat(sumCurrent.equipment)">
					<td v-if="i < 8">{{name}}</td>
					<td v-if="i < 8"  style="direction: rtl">{{n}}</td>
				</tr>
				<br>
				<tr v-if="detailed">
					<th>Unknown</th>
					<th>n</th>
				</tr>
				<tr v-if="detailed" v-for="[size, n] in sumCurrent.unknownCountBySize">
					<td>{{(size)}}</td>
					<td style="direction: rtl">{{n}}</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script lang="ts" setup>
import OrgList from "@/mil/components/OrgList.vue";
import {computed, onMounted, ref} from "vue";
import type {Ref} from "vue";
import {compareSizeFunc} from "@/mil/shared";

const props = defineProps<{
	organization: any | undefined,
	detailed: boolean
}>()

const activeChild = ref(0)
const tabs: Ref<null | HTMLHtmlElement> = ref(null)
onMounted(() => onTabClick(0))

function onTabClick (child : number) {
	tabs.value?.children[activeChild.value].classList.remove("active")
	tabs.value?.children[child].classList.add("active")
	activeChild.value = child
}


const sumCurrent = computed(() => {
	let totalMen = 0
	const unknownMen = []
	const equipment : {[name: string]: number} = {}

	// bfs add all
	let queue : [any, number][] = [[props.organization, 1]]
	while (queue.length != 0) {
		const [child, n] = queue.pop() as [any, number]
		// Not leafs
		if (child.children)
			queue = queue.concat(child.children?.map((c: any) => [c, n * (c.n || 1)]) ?? [])
		// Leafs
		else if (!(parseInt(child.men) > 0))
			unknownMen.push(child)

		// Add all men
		totalMen += (parseInt(child.men) || 0) * n

		// Add equipment
		child.equipment?.forEach((eq : any) => {equipment[eq.name] ||= 0; equipment[eq.name] += eq.n * n})
	}

	// Sort equipment and convet them into list
	const equipmentList : [string, number][] = []
	for (const key in equipment)
		equipmentList.push( [ key, equipment[key] ] );
	equipmentList.sort(([,a],[,b]) => b-a)

	// Sort the unknown and convert them into list
	const unknownMenBySize : {[name: string]: number} = {}
	unknownMen.forEach((org: any) => { unknownMenBySize[org.size] ||= 0; unknownMenBySize[org.size] += parseInt(org.n) || 1})
	const unknownMenBySizeList : [string, number][] = []
	for (const key in unknownMenBySize)
		unknownMenBySizeList.push( [ key, unknownMenBySize[key] ] );
	unknownMenBySizeList.sort(([a,],[b,]) => compareSizeFunc(a, b))


	return {men: totalMen === 0 ? "Ø" : totalMen, unknownCountBySize: unknownMenBySizeList, equipment: equipmentList}
})



</script>

<style scoped>

.organization-view {
	min-height: 100vh;
}

.view-selector {
	background-color: rgba(0, 0, 0, 0.05);
}
.view-selector .active {
	border-color: grey;
	border-bottom-color: transparent;
	color: var(--c-red);
}

.view-selector>* {
	cursor: pointer;
	display: inline;
	padding: 0 1em;
	border: 1px solid transparent;
	border-bottom-color: grey;
}

.org-view {
	background-color: rgba(0, 0, 0, 0.01);
}
</style>