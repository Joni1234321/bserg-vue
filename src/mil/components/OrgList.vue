<template>
	<div class="organization-list">
		<div v-for="child in getChildren(organization)">
			<div class="organization-child tooltip">
				<OrgIcon
					:link="canClick(child)"
					:size-string="getSizeString(child.size)"
					:type-tags="getTypeTags(child.type)"
					@click="canClick(child) ? $router.push($router.currentRoute.value.path + '/' + child.i) : ''"
				/>
				<p class="tooltiptext"> {{child.type + " " + child.size}} </p>
			</div>

			<div v-if="child.children && detailed"
			     v-for="subChild in getChildren(child)"
			     class="organization-sub-child">
				<OrgIcon
					:link="canClick(subChild)"
					:size-string="getSizeString(subChild.size)"
					:type-tags="getTypeTags(subChild.type)"
					@click="canClick(subChild) ? $router.push($router.currentRoute.value.path  + '/' + child.i + '/' + subChild.i) : ''"
				/>
			</div>
			<div v-else-if="detailed" class="equipment">
				<p style="text-align: center; font-size: .6em">[ {{child.men}} ]</p>
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
	min-height: 20em;
}

.organization-list, .organization-list > * {
	transform: rotateX(180deg);
}

.organization-child>svg{
	height: 7em;
}
.organization-sub-child {
	height: 3.5em;
}

.equipment table {
	font-size: .5em;
	background-color: #ccc;
}
.equipment tr {
	border-bottom: 10px solid black;
}
.tooltip .tooltiptext{
	pointer-events: none;

	font-size: .8em;
	text-align: center;
	border: 1px solid black;
	opacity: 0;
	border-radius: 5px;
	background-color: white;

	padding: .1em .25em;

	/* Position the tooltip */
	position: absolute;
	width: 100%;
	margin-top: -1em;
	left: 50%;
	transform: translate(-50%, 0);
	z-index: 1;
	transition: all .2s linear;
}
.tooltip:hover .tooltiptext {
	opacity: 1;
}
</style>