<template>
	<div>
		<div>
			<h1>What is this website?</h1>
			<p>This is a website that shows the table of Organization for WWII units</p>
			<p>source for tables: <a target="_blank" href="http://niehorster.org/012_ussr/44_organ/div_rifle/44_rd.htm">[niehorster.org]</a></p>
		</div>
		<br>
		<div>
			<h1>Navigation</h1>
			<p>You can click on these icons (they have a shadow) to navigate through the table and see their sub-units</p>
			<OrgIcon :type-tags="['infantry']" link/>
			<p>But not on these (they don't have a shadow), because they don't have any sub-units noted</p>
			<OrgIcon :type-tags="['infantry']"/>
		</div>
		<br>
		<div>
			<h1>Icons</h1>
			<p>The icons shown are inspired by the <a target="_blank" href="https://upload.wikimedia.org/wikipedia/commons/9/99/Military_Symbology_Guide.svg">[NATO Joint Symbology]</a> and <a target="_blank" href="http://niehorster.org/">[niehorster.org]</a></p>
			<p>all icons are rectangles</p>
			<OrgIcon :type-tags="[]"/>
			<p>inside the rectangles are symbols that designate their type <a target="_blank" href="http://niehorster.org/000_admin/009_symbols.html">[symbols meaning]</a></p>
			<br>
			<div class="icon-showcase">
				<div v-for="t in [['infantry'], ['armor'], ['artillery'], ['motorized','artillery']]">
					<p>{{t.join(" ")}}</p>
					<div>
						<OrgIcon :type-tags="t"/>
					</div>
				</div>
			</div>
			<br>
			<p>on top of the rectangles are symbols that designate their size</p>
			<br>
			<div class="icon-showcase">
				<div v-for="size in ['division','regiment','company', 'squad']">
					<p>{{size}}</p>
					<div>
						<OrgIcon :type-tags="[]" :size-string="getSizeString(size)"/>
					</div>
				</div>
			</div>
		</div>
		<br>
		<div>
			<h1>Why did i do this?</h1>
			<p>I was looking at websites like niehorster and wanted to make a more interactive table of organization</p>
			<p>It was also hard to grasp the magnitude of these tables since they often only indicated each units and their subunits, making it difficult to understand how many squads of infantry there is in a division</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
import OrgIcon from "@/mil/components/OrgIcon.vue";
import {getSizeString} from "@/mil/shared";
</script>

<style scoped>
svg {
	width: 100px;
}
div {
	text-align: center;
}
.icon-showcase {
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
}
.icon-showcase svg {
	margin-top: -5px;
}
.icon-showcase p {
	font-style: italic;
}

a {
	color: var(--c-red)
}

</style>