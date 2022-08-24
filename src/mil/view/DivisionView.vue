<template>
	<div v-if="rootOrganization">
		<div>
			<div class="description">
				<div class="division-description">
					<p class="root-desc">
						{{rootOrganization.name}}
						{{rootOrganization.year}}
						{{rootOrganization.country?.toUpperCase()}}
					</p>
					<p class="parent-desc hover-fade"
						@click="router.push(parents[parents.length - 2]?.bsergURL || router.currentRoute.value.path)">
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
				<ul>
					<li v-for="(summary, i) in parents"
					    @click="$router.push(summary.bsergURL)"
					    :class="{current: i === parents.length - 1}">
						<div>{{getSizeString(summary.size)}}</div>
					</li>
				</ul>
			</div>
		</div>
		<RouterView v-if="currentOrganization" :organization="currentOrganization"/>
	</div>
</template>

<script lang="ts" setup>
import {getSizeString, getTypeTags} from "@/mil/shared";
import type {Ref} from "vue"
import {computed, ref, watchEffect} from "vue";
import backend from "@/backend";
import router from "@/index";
import OrgIcon from "@/mil/components/OrgIcon.vue";


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
	top: 10%;
	right: 0;
}
.overview ul {
	font-size: 1em;
	list-style: none;
	padding: 0.2em 1em;
	text-align: center;
	width: 7em;
}
.overview ul li {
	padding: 0 1em;
	border: 1px solid transparent;
	border-bottom-color: black;

	box-sizing: content-box;
	transition: border .3s linear;
}
.overview ul li:hover {
	border-color: black;
	cursor: pointer;
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

.parent-desc {
	margin: 0 auto .6em auto;
	font-size: 1em;
	background-color: rgba(0,0,0,.2);
	color: #444;
	padding: .15em 1em;
	box-shadow: 5px 5px 5px rgba(0,0,0,0.5);
}

.current-desc {
	font-size: 1.5em;
	vertical-align: bottom;
	border-bottom: 3px solid black;
	padding: 0 2em;
}


</style>