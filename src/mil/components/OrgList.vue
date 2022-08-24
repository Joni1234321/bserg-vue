<template>
	<div class="organization-list">
		<div v-for="child in getChildren(organization)">
			<div class="organization-child">
				<OrgIcon
					:link="canClick(child)"
					:size-string="getSizeString(child.size)"
					:type-tags="getTypeTags(child.type)"
					@click="canClick(child) ? $router.push($router.currentRoute.value.path + '/' + child.i) : ''"
				/>
			</div>

			<div v-for="subChild in getChildren(child)" v-if="child.children && detailed"
			     class="organization-sub-child">
				<OrgIcon
					:link="canClick(subChild)"
					:size-string="getSizeString(subChild.size)"
					:type-tags="getTypeTags(subChild.type)"
					@click="canClick(subChild) ? $router.push($router.currentRoute.value.path  + '/' + child.i + '/' + subChild.i) : ''"
				/>
			</div>
		</div>

	</div>
</template>

<script lang="ts" setup>
import OrgIcon from "@/mil/components/OrgIcon.vue";
import {getChildren, getSizeString, getTypeTags} from "@/mil/shared";
import {defineProps} from "vue";


defineProps<{
	organization: object | undefined,
	detailed?: boolean,
}>()


const canClick = (organization: any): boolean => organization.children !== undefined

</script>

<style scoped>

.organization-list {
	display: grid;
	grid-gap: 16px;
	padding: 16px;
	grid-template-columns: repeat(auto-fit, 100px);
	grid-auto-flow: column;
	grid-auto-columns: 100px;
	overflow-x: auto;
	justify-content: safe center;

}

.organization-list, .organization-list > * {
	transform: rotateX(180deg);
}

.organization-sub-child {
	height: 3.5em;
}
</style>