<template>
	<div v-if="rootOrganization">
		<div class="desc">
			<div class="div-desc">
				<p class="root-desc">
					{{rootOrganization.name}}
					{{rootOrganization.year}}
					{{rootOrganization.country?.toUpperCase()}}
				</p>
				<p class="parent-desc hover-fade"
					@click="router.push(getParentURL())">
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
			setOrganizationFromURL()
		})
	} else
		setOrganizationFromURL()
})


function setOrganizationFromURL() {
	const childRoute = router.currentRoute.value.params.child_route
	let re = rootOrganization.value
	let parent = rootOrganization.value
	for (let i = 0; i < childRoute.length; i++) {
		parent = re
		re = re.children[childRoute[i]]
		if (!re.children) {
			parentOrganization.value = parent
			currentOrganization.value = undefined
			return
		}
	}
	parentOrganization.value = parent
	currentOrganization.value = re
}

function getParentURL () {
	const path = router.currentRoute.value.path
	if (parentOrganization.value === currentOrganization.value)
		return path

	const url_split = path.split("/")
	url_split.pop()
	return url_split.join("/")
}



</script>

<style scoped>
.desc {
	display: grid;
	place-items: center;
}

.desc > svg {
	width: 200px;
}

.desc > p {
	font-size: 1.5em;
	text-align: center;
}

.div-desc {
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