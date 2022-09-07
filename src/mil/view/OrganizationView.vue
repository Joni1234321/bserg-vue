<template>
	<div class="org-view" >
		<div ref="tabs" class="view-selector">
			<a v-for="(name, i) in tabList" @click="onTabClick(i)">{{name}}</a>
		</div>
		<div v-if="activeChild === 0" class="organization-view">
			<OrgList :detailed="detailed" :organization="organization"/>
		</div>
		<div v-if="activeChild === 1">
			<EquipmentList :organization="organization" :detailed="detailed"/>
		</div>
		<div v-if="activeChild === 2" class="company-view">
			<div v-for="[name, n] in totalCompanies">
				<p class="number">{{n}}</p>
				<OrgIcon :type-tags="nameToTags(name).tags" :size-string="nameToTags(name).sizeString"/>
				<p>{{name}}</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import OrgList from "@/mil/components/OrgList.vue";
import {computed, onMounted, onUnmounted, ref} from "vue";
import type {Ref} from "vue";
import {compareSizeFunc, getSizeString, nameToTags} from "@/mil/shared";
import OrgIcon from "@/mil/components/OrgIcon.vue";
import EquipmentList from "@/mil/components/EquipmentList.vue";

const props = defineProps<{
	organization: any | undefined,
	detailed: boolean
}>()

const activeChild = ref(0)
const tabs: Ref<null | HTMLHtmlElement> = ref(null)
const tabList = ['table', 'equipment', 'companies']

onMounted(() => {
	onTabClick(0);
	addEventListener("keyup", keyHandle)
})
onUnmounted(() =>	removeEventListener("keyup", keyHandle))

function keyHandle (event : any) {
	if (event.keyCode === 39) nextTab(1)
	else if (event.keyCode === 37) nextTab(-1)
}
const nextTab = (direction?: number) => onTabClick((tabList.length + activeChild.value + (direction ?? 1)) % tabList.length)
function onTabClick (child : number) {
	tabs.value?.children[activeChild.value].classList.remove("active")
	tabs.value?.children[child].classList.add("active")
	activeChild.value = child
}



const totalCompanies = computed(() => {
	const companies : {[name: string]: [string, number]} = {}

	// bfs add all

	let queue : [any, number][] = [[props.organization, 1]]

	while (queue.length != 0) {
		const [child, n] = queue.pop() as [any, number]

		// Skip hq
		if (child.type.split(" ").includes("headquarters")) {
			queue = queue.concat(child.children?.map((c: any) => [c, n * (c.n || 1)]) ?? [])
			continue
		}

		// Sort by size as well
		const childIndex = child.type + " " + child.size

		// Leafs or company
		if ((!child.children && props.detailed) || getSizeString(child.size) === getSizeString("company")) {
			companies[childIndex] ||= [child.size, 0]
			companies[childIndex][1] += n;
			continue
		}

		queue = queue.concat(child.children?.map((c: any) => [c, n * (c.n || 1)]) ?? [])
	}

	// Sort equipment and convet them into list
	const compList : [string, [string, number]][] = []
	for (const key in companies)
		compList.push( [ key, companies[key] ] );
	compList.sort(([aName,a],[bName,b]) => {
		const isHQ = (title: string) => title.split(" ").includes("headquarters")

		// Split into hq and not, and then biggest size first, then by n
		return (+isHQ(aName) - +isHQ(bName)) || compareSizeFunc(a[0], b[0]) || b[1] - a[1]
	})
	return compList.map(([key, [,n]]) => [key, n])
})

</script>

<style scoped>

.company-view{
	font-size: 1em;
}
.company-view>* {
	display: grid;
	grid-template-columns: 1.5em 4em auto;
	height: 3em;
	place-items: center;
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
	transition: 0.1s;
}
.view-selector>*:hover {
	background-color: #ddd;
}

.org-view {
	background-color: rgba(0, 0, 0, 0.01);
}
</style>