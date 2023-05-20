
<template>
	<div class="equipment-table">
		<table>
			<thead>
			<tr>
				<th v-for="name in headValues"
					{{ name }}
				</th>
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

<style scoped>
</style>

<script setup lang="ts">

import router from "@/index";
import {getSizeString, getTypeTags} from "@/mil/shared";

const props = defineProps<{
	equipment: any[],
}>()

const headValues : string[] = ["Name", "Year","Image"]

</script>
