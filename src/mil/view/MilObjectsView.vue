<template>
	<div>
		<div class="filters">
			<div class="filter">
				<div @click="showCountry('all')">country</div>
				<div v-for="country in ['ussr', 'usa', 'germany']"
				     :style="{backgroundColor: getCountryColor(country)}"
					@click="showCountry(country)"
				>
					{{ country?.toUpperCase() }}
				</div>
			</div>

		</div>
		<table>
			<thead>
				<tr>
					<th v-for="[name, getProperty] in sorts"
						@click="sortBy(name, getProperty)"> {{ name }}
						{{ currentSort === name ? (sortAscending ? "▼" : "▲") : "" }}</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="org in organizationsFiltered"
					@click="router.push('/mil/' + org._id.$oid)"
					:style="{backgroundColor: getCountryColor(org.country)}"
				>
					<td>{{ org.country?.toUpperCase() }}</td>
					<td> <OrgIcon :type-tags="getTypeTags(org.type)" :size-string="getSizeString(org.size)"/></td>
					<td>{{ org.year }}</td>
					<td>{{ org.name}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts" setup>
import backend from "@/backend";
import type {Ref} from "vue";
import {onMounted, ref} from "vue";
import router from "@/index";
import OrgIcon from "@/mil/components/OrgIcon.vue";
import {getTypeTags, getSizeString} from "@/mil/shared";


const allOrganizations = ref([] as any[])
const organizationsFiltered = ref([] as any[])
const loading = ref(false as boolean)

onMounted(() => loadOrganizations())

function loadOrganizations() {
	loading.value = true
	backend.getOrganizations().then(r => {
		allOrganizations.value = r
		organizationsFiltered.value = r
		loading.value = false
	})
}

function showCountry (country: string) {
	if (country === "all") organizationsFiltered.value = allOrganizations.value
	else organizationsFiltered.value = allOrganizations.value.filter((org: any) => org.country === country)
}

function getCountryColor (country: string) {
	switch(country) {
		case "ussr":
			return "rgba(192,30,30,0.90)"
		case "usa":
			return "rgba(30,100,190,0.9)"
		case "germany":
			return "rgba(215,215,215,0.9)"
		default:
			return "green"
	}
}

const sorts = [['country', org => org.country], ['icon', org => org.name], ['year', org => org.year], ['name', org => org.name]]
const sortAscending = ref(true as boolean)
const currentSort = ref("")
function sortBy (sortCategory: string, getProperty: (any) => any) {
	if (currentSort.value === sortCategory) {
		sortAscending.value = !sortAscending.value
		organizationsFiltered.value.reverse()
	}
	else {
		sortAscending.value = true
		organizationsFiltered.value.sort((a,b) =>
		{
			if (getProperty(b) === undefined) return 1
			if (getProperty(a) === undefined) return -1
			return getProperty(b) > getProperty(a) ? 1 : -1
		})
	}
	currentSort.value = sortCategory
}

</script>

<style scoped>
.filter {
	border-bottom: 2px solid black;
}
.filter>* {
	font-size: 1.5em;
	display: inline;
}
.filter>div {
	padding: 0 1em;
	border-radius: 10px;
	margin: 0 .5em;
}

table {
	margin-top: 10px;
	width: 100%;
	font-size: 2em;
	text-align: center;
	border-collapse: collapse;
}
th {
	font-size: .8em;
	background-color: rgba(44, 62, 80, 0.3);
}
th, td{
	border: 1px solid rgb(0, 0, 0);
}
tbody tr:hover, th:hover, .filter>div:hover{
	opacity: .8;
	cursor: pointer;
}
td {
	height: 3em;
}

</style>