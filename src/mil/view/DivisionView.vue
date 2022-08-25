<template>
	<div v-if="rootOrganization">
		<div class="root-desc" >
			<p class="hover-fade" @click="$router.push(parents[0].bsergURL)">
				{{rootOrganization.name}}
				{{rootOrganization.year}}
				{{rootOrganization.country?.toUpperCase()}}
			</p>
		</div>
		<div>
			<div>
				<label for="detailed-input"> DETAILED </label>
				<input v-model="detailed" name="detailed-input" type="checkbox">
			</div>
			<div>
				<label for="equipment-input"> EQUIPMENT </label>
				<input v-model="equipmentInput" name="equipment-input" type="checkbox">
			</div>
			<div v-if="equipmentInput">
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
			<div class="description">
				<div class="division-description">
					<p class="parent-desc hover-fade"
						@click="$router.push(parents[parents.length - 2]?.bsergURL || router.currentRoute.value.path)">
						{{parentOrganization?.type + " " + parentOrganization?.size}}
					</p>
					<p class="current-desc">
						{{currentOrganization?.type + " " + currentOrganization?.size}}
					</p>
				</div>

				<OrgIcon
					v-if="currentOrganization"
					:size-string="getSizeString(currentOrganization.size)"
					:type-tags="getTypeTags(currentOrganization.type)"
				/>
			</div>
			<div class="overview">
				<table>
					<tr v-for="(summary, i) in parents"
					    @click="$router.push(summary.bsergURL)"
					    :class="{current: i === parents.length - 1}">
						<td>{{getSizeString(summary.size)}}</td>
						<td v-if="detailed"><OrgIcon :type-tags="getTypeTags(summary.type)"/></td>
						<td v-if="detailed" style="padding: 0 .5em;text-align: left">{{summary.n ?? 1}} ( {{summary.total}} )</td>
					</tr>
				</table>
			</div>
		</div>
		<RouterView v-if="currentOrganization" :organization="currentOrganization" :detailed="detailed"/>
	</div>
</template>

<script lang="ts" setup>
import {compareSizeFunc, getSizeString, getTypeTags} from "@/mil/shared";
import type {Ref} from "vue"
import {computed, ref, watchEffect} from "vue";
import backend from "@/backend";
import router from "@/index";
import OrgIcon from "@/mil/components/OrgIcon.vue";

const detailed = ref(false)
const equipmentInput = ref(false)

const rootOrganization: Ref = ref(undefined)
const parentOrganization: Ref = ref(undefined)
const currentOrganization: Ref = ref(undefined)
const parents = ref([] as any[])
const loading: Ref<boolean> = ref(false)


watchEffect(() => {
	const newID = router.currentRoute.value.params.organization_id as string
	if (rootOrganization.value?._id.$oid !== newID) {
		loading.value = true
		backend.getOrganization(newID).then(r => {
			console.log("RELOADING ORGANIZATION")

			rootOrganization.value = r
			currentOrganization.value = r

			loading.value = false
			// TODO: THIS HERE IS GETTING CALLED TWICE FOR SOME REASEON
			setOrganizationFromURL()
		})
	}
	else setOrganizationFromURL()
})


function setOrganizationFromURL() {
	const childRoute : string[] = (router.currentRoute.value.params.child_route || []) as string[]

	// Set organization of parent, current and root
	let current = rootOrganization.value
	let parent = rootOrganization.value
	let pInfo = [current]
	for (let i = 0; i < childRoute.length; i++) {
		parent = current
		current = current.children[parseInt(childRoute[i])]
		pInfo.push(current)
		// Only add until out of children
		if (!current.children) break
	}

	// Load URLS
	pInfo[pInfo.length - 1].bsergURL = router.currentRoute.value.path
	for (let i = pInfo.length - 2; i >= 0; i--) {
		const path = pInfo[i + 1].bsergURL
		const split = path.split("/")
		split.pop()
		pInfo[i].bsergURL = split.join("/")
	}

	// Load total
	for (let i = 0; i < pInfo.length; i++)
		pInfo[i].total = (pInfo[i - 1]?.total ?? 1) * (pInfo[i]?.n ?? 1)


	// Set refs
	parentOrganization.value = parent
	currentOrganization.value = current
	parents.value = pInfo
}

const sumCurrent = computed(() => {
	let totalMen = 0
	const unknownMen = []
	const equipment : {[name: string]: number} = {}

	// bfs add all
	let queue : [any, number][] = [[currentOrganization.value, 1]]
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
.description {
	display: grid;
	place-items: center;
}

.description > svg {
	width: 200px;
}

.description > p {
	font-size: 1.5em;
	text-align: center;
}

.overview {
	position: absolute;
	top: 1em;
	right: 0;
}
.overview table {
	text-align: center;
	border-collapse: collapse;
}
.overview tr {
	font-size: 1.5em;
	border: 1px solid transparent;
	border-bottom-color: black;
	transition: border .3s linear;
}
.overview td:nth-child(1) {
	width: 3em;
}
.overview td svg {
	height: 1.5em;
}
.overview tr:hover {
	border-color: black;
	cursor: pointer;
	opacity: .7;
}

.overview .current {
	border-color: transparent;
}
.overview .current>* {
	font-weight: bold;
}


.division-description {
	display: flex;
	flex-direction: column;
	margin-top: 1em;
	text-align: center;
}

.root-desc {
	text-align: center;
	font-size: 1.5em;
	font-style: italic;
}
.root-desc p {
	padding: 0 .4em;
	display: inline;
	border: 3px solid darkgreen;
}
.parent-desc {
	margin: 0 auto -.5em auto;
	font-size: .8em;
	border: 2px solid rgba(0,0,0,.2);
	border-bottom-color: transparent;
	border-top-color: transparent;
	color: #444;
	padding: .15em .6em;
}

.current-desc {
	font-size: 1.5em;
	vertical-align: bottom;
	border-bottom: 2px solid black;
	padding: 0 2em;
}


</style>