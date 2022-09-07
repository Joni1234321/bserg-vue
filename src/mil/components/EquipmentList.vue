<template>
	<div class="equipment-list">
		<table>
			<tr v-for="([name, n], i) in ([['men',sumCurrent.men]]).concat(sumCurrent.equipment)">
				<td v-if="detailed || i < 8">{{name}}</td>
				<td v-if="detailed || i < 8"  style="direction: rtl">{{n}}</td>
			</tr>
			<tr v-if="detailed">
				<th>Unknown</th>
				<th>n</th>
			</tr>
			<tr v-if="detailed" v-for="[size, n] in sumCurrent.unknownCountBySize">
				<td>{{(size)}}</td>
				<td style="direction: rtl">{{n}}</td>
			</tr>
		</table>
		<div class="selected">
			<h1>men</h1>
		</div>
	</div>
</template>

<script lang="ts" setup>
import {computed} from "vue";
import {compareSizeFunc} from "@/mil/shared";

const props = defineProps<{
	organization: any,
	detailed: boolean
}>()

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
</script>

<style scoped>

table {
	position: sticky;
	top: 1em;
	flex: none;
	border-collapse: collapse;
}
td {
	padding: 0 .5em;
}
tr:hover, .active{
	cursor: pointer;
	background-color: #eee;
	color: var(--c-red)
}
.selected {
	width: 100%;
	text-align: center;
}
.selected img {
	max-width: 10em;
	max-height: 20em;
}
.equipment-list{
	display: flex;
	align-items: start;
}
</style>