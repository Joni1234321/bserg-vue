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
			<div class="modify">
				<div @click="detailed = !detailed">
					<input v-model="detailed" name="detailed-input" type="checkbox">
					<label for="detailed-input"> detailed </label>
				</div>
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
	border: 3px solid var(--c-red);
	border-top-color: transparent;
	border-radius: 5px;
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

.modify {
	display: inline-grid;
	grid-template-columns: 1fr;
	background-color: black;
	grid-gap:1px;
	padding: 1px;
}
.modify>* {
	background-color: white;
	padding: .3em .5em .3em 1em;
}
.modify>*:hover {
	background-color: #ddd;
	transition: background-color .4s;
}
</style>