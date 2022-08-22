<template>
	<div v-if="rootOrganization">
		<div class="org-desc">
			<p>
				{{ rootOrganization.name }}
				{{ rootOrganization.country }}
				{{ rootOrganization.year }}
				{{ rootOrganization.type }}
			</p>
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
import {ref, watchEffect} from "vue";
import backend from "@/backend";
import router from "@/index";
import OrgIcon from "@/mil/components/OrgIcon.vue";


const rootOrganization: Ref = ref(undefined)
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
			currentOrganization.value = getOrganizationFromURL()
		})
	} else
		currentOrganization.value = getOrganizationFromURL()


})

function getOrganizationFromURL() {
	const childRoute = router.currentRoute.value.params.child_route
	let re = rootOrganization.value

	for (let i = 0; i < childRoute.length; i++) {
		re = re.children[childRoute[i]]
		if (!re.children) return undefined
	}

	return re
}


</script>

<style scoped>
.org-desc {
	display: grid;
	place-items: center;
}

.org-desc > svg {
	width: 200px;
}

.org-desc > p {
	font-size: 1.5em;
	text-align: center;
}

</style>