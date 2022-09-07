<template>
	<div class="org-view" >
		<div ref="tabs" class="view-selector">
			<a v-for="(name, i) in tabList" @click="onTabClick(i)">{{name}}</a>
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
function test () {console.log("hej med dig")}
const nextTab = (direction?: number) => onTabClick((tabList.length + activeChild.value + (direction ?? 1)) % tabList.length)

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
	if (props.organization.children)
		queue = props.organization.children.map((child: any) => [child, child.n || 1])

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

.organization-view {
	min-height: 100vh;
}

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